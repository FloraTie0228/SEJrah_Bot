"""
SejarahBot – Telegram Bot (Knowledge-Base Edition)
====================================================
Operates WITHOUT a paid OpenAI API key.
Uses the shared Malaysian history knowledge base from sejarah_data.json.

Features:
  • /start   – Welcome + reset session
  • /help    – Command list
  • /topik   – Browse all available history topics
  • /kuiz    – Start an interactive quiz (Mudah/Sederhana/Sukar)
  • /reset   – Clear conversation state
  • Free-text – Keyword-based topic matching (BM + English)
  • Inline keyboard quiz with scoring and explanations

Security:
  • TELEGRAM_BOT_TOKEN loaded from .env only — never hardcoded
  • No credentials logged or echoed to users
  • Exception details not exposed to users

Run:
  python telegram_bot.py

Requirements:
  pip install python-telegram-bot==21.3 python-dotenv==1.0.1
"""

from __future__ import annotations

import json
import logging
import os
import random
from pathlib import Path
from typing import Any

from dotenv import load_dotenv
from telegram import (
    InlineKeyboardButton,
    InlineKeyboardMarkup,
    Update,
)
from telegram.constants import ChatAction, ParseMode
from telegram.ext import (
    Application,
    CallbackQueryHandler,
    CommandHandler,
    ContextTypes,
    MessageHandler,
    filters,
)

# ── Logging ───────────────────────────────────────────────────────────────────

logging.basicConfig(
    format="%(asctime)s [%(levelname)s] %(name)s – %(message)s",
    level=logging.INFO,
)
logger = logging.getLogger(__name__)

# ── Configuration ─────────────────────────────────────────────────────────────

load_dotenv()

TELEGRAM_BOT_TOKEN = os.getenv("TELEGRAM_BOT_TOKEN", "")
if not TELEGRAM_BOT_TOKEN:
    raise RuntimeError(
        "TELEGRAM_BOT_TOKEN is not set.\n"
        "1. Copy .env.example to .env\n"
        "2. Add your token from @BotFather\n"
        "3. Run: python telegram_bot.py"
    )

# ── Load shared knowledge base ────────────────────────────────────────────────

_DATA_FILE = Path(__file__).parent / "sejarah_data.json"

try:
    with open(_DATA_FILE, encoding="utf-8") as f:
        _DATA: dict[str, Any] = json.load(f)
except FileNotFoundError:
    raise RuntimeError(f"sejarah_data.json not found at {_DATA_FILE}")

KB: dict[str, Any] = _DATA["knowledge_base"]
QUIZ_QUESTIONS: dict[str, list[dict]] = _DATA["quiz_questions"]

# ── Constants ─────────────────────────────────────────────────────────────────

MAX_FALLBACKS = 2           # escalate to teacher message after N misses
QUIZ_COUNT = {"mudah": 5, "sederhana": 10, "sukar": 10}

# Callback data prefixes
CB_QUIZ_DIFF  = "qd:"    # quiz difficulty selection  e.g. qd:mudah
CB_QUIZ_ANS   = "qa:"    # quiz answer               e.g. qa:2
CB_QUIZ_NEXT  = "qnext"  # advance to next question
CB_QUIZ_EXIT  = "qexit"  # exit quiz early

# ── Per-user state helpers ────────────────────────────────────────────────────

def _get_state(context: ContextTypes.DEFAULT_TYPE) -> dict:
    """Return (and lazily initialise) per-user state dict."""
    if "sb" not in context.user_data:
        context.user_data["sb"] = {
            "fallbacks": 0,       # consecutive unrecognised messages
            "quiz": None,         # active quiz state dict or None
        }
    return context.user_data["sb"]


def _reset_state(context: ContextTypes.DEFAULT_TYPE) -> None:
    context.user_data["sb"] = {
        "fallbacks": 0,
        "quiz": None,
    }

# ── Knowledge-base engine ─────────────────────────────────────────────────────

def _find_topic(text: str) -> dict | None:
    """Return the best-matching KB entry for the user's text, or None."""
    q = text.lower().strip()
    best: dict | None = None
    best_score = 0

    for entry in KB.values():
        score = 0
        for kw in entry["keywords"]:
            if kw.lower() in q:
                score += len(kw)          # longer match → higher score
        if score > best_score:
            best_score = score
            best = entry

    return best if best_score > 0 else None


def _format_follow_up(follow_up: list[str]) -> str:
    """Format follow-up suggestions as a footer line."""
    if not follow_up:
        return ""
    tips = " · ".join(f"_{tip}_" for tip in follow_up[:3])
    return f"\n\n💡 Cuba tanya: {tips}"

# ── Quiz helpers ──────────────────────────────────────────────────────────────

def _build_quiz(difficulty: str) -> dict:
    """Build a fresh shuffled quiz state dict."""
    pool = QUIZ_QUESTIONS.get(difficulty, QUIZ_QUESTIONS["mudah"])
    count = QUIZ_COUNT.get(difficulty, 5)
    questions = random.sample(pool, min(count, len(pool)))
    return {
        "difficulty": difficulty,
        "questions": questions,
        "current": 0,
        "score": 0,
        "answered": False,
    }


def _quiz_keyboard(options: list[str], answered: bool) -> InlineKeyboardMarkup:
    """Build A/B/C/D inline keyboard for a quiz question."""
    labels = ["A", "B", "C", "D"]
    buttons = [
        [InlineKeyboardButton(
            f"{labels[i]}. {opt}",
            callback_data=f"{CB_QUIZ_ANS}{i}"
        )]
        for i, opt in enumerate(options)
    ]
    return InlineKeyboardMarkup(buttons)


def _difficulty_keyboard() -> InlineKeyboardMarkup:
    return InlineKeyboardMarkup([
        [InlineKeyboardButton("🟢 Mudah (5 soalan)",     callback_data=f"{CB_QUIZ_DIFF}mudah")],
        [InlineKeyboardButton("🟡 Sederhana (10 soalan)", callback_data=f"{CB_QUIZ_DIFF}sederhana")],
        [InlineKeyboardButton("🔴 Sukar (10 soalan)",     callback_data=f"{CB_QUIZ_DIFF}sukar")],
    ])


async def _send_question(
    update: Update,
    context: ContextTypes.DEFAULT_TYPE,
    quiz: dict,
    edit: bool = False,
) -> None:
    """Send (or edit) the current quiz question."""
    q = quiz["questions"][quiz["current"]]
    num = quiz["current"] + 1
    total = len(quiz["questions"])
    diff_label = quiz["difficulty"].capitalize()
    score = quiz["score"]

    text = (
        f"🧠 *Kuiz {diff_label}* — Soalan {num}/{total}  |  Markah: {score}\n\n"
        f"{q['q']}"
    )
    keyboard = _quiz_keyboard(q["options"], answered=False)

    if edit and update.callback_query:
        await update.callback_query.edit_message_text(
            text, parse_mode=ParseMode.MARKDOWN, reply_markup=keyboard
        )
    else:
        chat_id = update.effective_chat.id
        await context.bot.send_message(
            chat_id, text, parse_mode=ParseMode.MARKDOWN, reply_markup=keyboard
        )


async def _end_quiz(
    update: Update,
    context: ContextTypes.DEFAULT_TYPE,
    quiz: dict,
) -> None:
    """Show final quiz results and clear quiz state."""
    score = quiz["score"]
    total = len(quiz["questions"])
    pct = round(score / total * 100)

    if pct >= 80:
        remark = "🏆 Cemerlang\\! Anda seorang pakar sejarah\\!"
    elif pct >= 60:
        remark = "👍 Bagus\\! Teruskan belajar\\!"
    else:
        remark = "📚 Jangan putus asa — baca semula dan cuba lagi\\!"

    text = (
        f"✅ *Kuiz Tamat\\!*\n\n"
        f"Markah akhir: *{score} / {total}* \\({pct}%\\)\n\n"
        f"{remark}\n\n"
        f"Taip /kuiz untuk bermain semula atau /topik untuk belajar lebih lanjut\\."
    )

    state = _get_state(context)
    state["quiz"] = None

    chat_id = update.effective_chat.id
    if update.callback_query:
        await update.callback_query.edit_message_text(
            text, parse_mode=ParseMode.MARKDOWN_V2
        )
    else:
        await context.bot.send_message(chat_id, text, parse_mode=ParseMode.MARKDOWN_V2)

# ── Command handlers ──────────────────────────────────────────────────────────

async def cmd_start(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    """/start – Welcome message and reset state."""
    _reset_state(context)
    text = (
        "👋 *Selamat datang ke SejarahBot – Rakan Sejarah Anda\\!*\n\n"
        "Saya adalah *chatbot berasaskan pangkalan pengetahuan* sejarah Malaysia\\. "
        "Saya bukan AI generatif — jawapan saya berdasarkan fakta sejarah yang telah diprogramkan\\.\n\n"
        "Saya boleh membantu anda:\n"
        "📖 Menjawab soalan sejarah Malaysia\n"
        "📅 Memaparkan garis masa peristiwa penting\n"
        "🧑‍🤝‍🧑 Memperkenalkan tokoh\\-tokoh sejarah\n"
        "🧠 Kuiz sejarah interaktif dengan pemarkahan\n"
        "✨ Fakta menarik tentang sejarah Malaysia\n\n"
        "Arahan tersedia:\n"
        "/help – Senarai arahan\n"
        "/topik – Senarai semua topik\n"
        "/kuiz – Mula kuiz interaktif\n"
        "/reset – Tetapkan semula sesi\n\n"
        "Taip soalan anda untuk bermula\\! 🇲🇾"
    )
    await update.message.reply_text(text, parse_mode=ParseMode.MARKDOWN_V2)


async def cmd_help(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    """/help – Show all available commands."""
    text = (
        "📚 *Arahan SejarahBot*\n\n"
        "/start – Mesej alu\\-aluan & reset sesi\n"
        "/help – Papar senarai arahan ini\n"
        "/topik – Senarai semua topik sejarah\n"
        "/kuiz – Mula kuiz interaktif \\(pilih tahap\\)\n"
        "/reset – Kosongkan sesi perbualan\n\n"
        "*Cara menggunakan:*\n"
        "Taip sebarang soalan tentang sejarah Malaysia\\. Contoh:\n"
        "• _Ceritakan tentang kemerdekaan 1957_\n"
        "• _Siapakah Tunku Abdul Rahman?_\n"
        "• _Apakah Peristiwa 13 Mei?_\n"
        "• _Tunjukkan garis masa sejarah_\n\n"
        "_Nota: SejarahBot menggunakan pangkalan pengetahuan, bukan AI generatif\\._"
    )
    await update.message.reply_text(text, parse_mode=ParseMode.MARKDOWN_V2)


async def cmd_topik(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    """/topik – List all available topics."""
    topics = [entry["title"] for entry in KB.values()]
    numbered = "\n".join(f"{i+1}\\. {t}" for i, t in enumerate(topics))
    text = (
        f"📖 *Topik Sejarah Malaysia \\({len(topics)} topik\\)*\n\n"
        f"{numbered}\n\n"
        "_Taip mana\\-mana topik di atas atau kata kunci berkaitan untuk maklumat lanjut\\._"
    )
    await update.message.reply_text(text, parse_mode=ParseMode.MARKDOWN_V2)


async def cmd_kuiz(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    """/kuiz – Show difficulty selection for quiz."""
    state = _get_state(context)
    if state["quiz"] is not None:
        await update.message.reply_text(
            "⚠️ Anda sedang dalam kuiz\\. Jawab soalan semasa atau pilih *Keluar Kuiz* \\(hantar /reset\\)\\.",
            parse_mode=ParseMode.MARKDOWN_V2
        )
        return

    text = (
        "🧠 *Kuiz Sejarah Malaysia*\n\n"
        "Uji pengetahuan anda dengan soalan pelbagai pilihan\\!\n"
        "Pilih tahap kesukaran:"
    )
    await update.message.reply_text(
        text,
        parse_mode=ParseMode.MARKDOWN_V2,
        reply_markup=_difficulty_keyboard()
    )


async def cmd_reset(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    """/reset – Clear all session state."""
    _reset_state(context)
    await update.message.reply_text(
        "🔄 Sesi telah diset semula\\. Mulakan soalan baru anda\\!",
        parse_mode=ParseMode.MARKDOWN_V2
    )

# ── Message handler ───────────────────────────────────────────────────────────

async def handle_message(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    """Handle all plain-text messages — route to KB engine."""
    state = _get_state(context)

    # Block free text while a quiz is active
    if state["quiz"] is not None:
        await update.message.reply_text(
            "📝 Sila jawab soalan kuiz semasa, atau hantar /reset untuk keluar\\.",
            parse_mode=ParseMode.MARKDOWN_V2
        )
        return

    user_text = (update.message.text or "").strip()
    if not user_text:
        return

    await context.bot.send_chat_action(
        chat_id=update.effective_chat.id, action=ChatAction.TYPING
    )

    topic = _find_topic(user_text)

    if topic is None:
        state["fallbacks"] += 1
        fallback_msg = (
            "Maaf, saya tidak faham soalan anda\\. "
            "Cuba tanya tentang: _kemerdekaan_, _Tunku_, _13 Mei_, _Darurat_, _Melaka_, atau hantar /topik untuk senarai penuh\\."
        )
        if state["fallbacks"] >= MAX_FALLBACKS:
            fallback_msg += (
                "\n\n👨‍🏫 *Sila hubungi guru atau pembimbing sejarah anda untuk bantuan lanjut\\.*"
            )
        await update.message.reply_text(fallback_msg, parse_mode=ParseMode.MARKDOWN_V2)
        return

    # Matched — reset fallback counter
    state["fallbacks"] = 0

    response_text = topic["response"] + _format_follow_up(topic.get("follow_up", []))

    # Telegram MarkdownV2 requires escaping many chars — use Markdown (v1) for
    # KB responses since they contain natural prose with bold/italic only.
    await update.message.reply_text(response_text, parse_mode=ParseMode.MARKDOWN)

# ── Callback query handler (quiz interactions) ────────────────────────────────

async def handle_callback(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    """Handle all inline keyboard button presses."""
    query = update.callback_query
    await query.answer()          # acknowledge button press immediately

    state = _get_state(context)
    data: str = query.data or ""

    # ── Difficulty selection ──────────────────────────────────────────────────
    if data.startswith(CB_QUIZ_DIFF):
        difficulty = data[len(CB_QUIZ_DIFF):]
        if difficulty not in QUIZ_QUESTIONS:
            difficulty = "mudah"

        quiz = _build_quiz(difficulty)
        state["quiz"] = quiz

        await query.edit_message_text(
            f"✅ Kuiz *{difficulty.capitalize()}* dimulakan\\! Jawab dengan menekan butang\\.",
            parse_mode=ParseMode.MARKDOWN_V2
        )
        await _send_question(update, context, quiz, edit=False)
        return

    # ── Answer selection ──────────────────────────────────────────────────────
    if data.startswith(CB_QUIZ_ANS):
        quiz = state.get("quiz")
        if quiz is None:
            await query.edit_message_text("Tiada kuiz aktif\\. Hantar /kuiz untuk bermula\\.", parse_mode=ParseMode.MARKDOWN_V2)
            return
        if quiz["answered"]:
            return   # ignore duplicate taps

        quiz["answered"] = True
        selected = int(data[len(CB_QUIZ_ANS):])
        q = quiz["questions"][quiz["current"]]
        correct = selected == q["answer"]

        if correct:
            quiz["score"] += 1

        labels = ["A", "B", "C", "D"]
        correct_label = labels[q["answer"]]
        selected_label = labels[selected]

        if correct:
            result_icon = "✅"
            result_word = "Betul\\!"
        else:
            result_icon = "❌"
            result_word = f"Salah\\. Jawapan betul: *{correct_label}\\. {q['options'][q['answer']]}*"

        num = quiz["current"] + 1
        total = len(quiz["questions"])
        explanation = q["explanation"].replace(".", "\\.").replace("!", "\\!").replace("(", "\\(").replace(")", "\\)").replace("-", "\\-")

        is_last = quiz["current"] >= total - 1
        next_button_label = "Lihat Keputusan 🏆" if is_last else "Soalan Seterusnya ▶"

        feedback_text = (
            f"🧠 *Kuiz {quiz['difficulty'].capitalize()}* — Soalan {num}/{total}  |  Markah: {quiz['score']}\n\n"
            f"{q['q']}\n\n"
            f"{result_icon} {result_word}\n\n"
            f"📖 _{explanation}_"
        )

        next_keyboard = InlineKeyboardMarkup([[
            InlineKeyboardButton(next_button_label, callback_data=CB_QUIZ_NEXT)
        ]])

        try:
            await query.edit_message_text(
                feedback_text,
                parse_mode=ParseMode.MARKDOWN_V2,
                reply_markup=next_keyboard
            )
        except Exception:
            # If edit fails (e.g. message too old), send new message
            await context.bot.send_message(
                update.effective_chat.id,
                feedback_text,
                parse_mode=ParseMode.MARKDOWN_V2,
                reply_markup=next_keyboard
            )
        return

    # ── Next question ─────────────────────────────────────────────────────────
    if data == CB_QUIZ_NEXT:
        quiz = state.get("quiz")
        if quiz is None:
            return

        is_last = quiz["current"] >= len(quiz["questions"]) - 1
        if is_last:
            await _end_quiz(update, context, quiz)
        else:
            quiz["current"] += 1
            quiz["answered"] = False
            await _send_question(update, context, quiz, edit=True)
        return

    # ── Exit quiz ─────────────────────────────────────────────────────────────
    if data == CB_QUIZ_EXIT:
        quiz = state.get("quiz")
        if quiz:
            await _end_quiz(update, context, quiz)
        return

# ── Error handler ─────────────────────────────────────────────────────────────

async def error_handler(update: object, context: ContextTypes.DEFAULT_TYPE) -> None:
    """Log errors — never expose internals to the user."""
    logger.error("Unhandled exception: %s", context.error, exc_info=context.error)
    if isinstance(update, Update) and update.effective_message:
        try:
            await update.effective_message.reply_text(
                "⚠️ Maaf, berlaku ralat dalaman\\. Sila cuba lagi\\.",
                parse_mode=ParseMode.MARKDOWN_V2
            )
        except Exception:
            pass

# ── Entry point ───────────────────────────────────────────────────────────────

def main() -> None:
    app = Application.builder().token(TELEGRAM_BOT_TOKEN).build()

    # Commands
    app.add_handler(CommandHandler("start", cmd_start))
    app.add_handler(CommandHandler("help",  cmd_help))
    app.add_handler(CommandHandler("topik", cmd_topik))
    app.add_handler(CommandHandler("kuiz",  cmd_kuiz))
    app.add_handler(CommandHandler("reset", cmd_reset))

    # Inline button callbacks
    app.add_handler(CallbackQueryHandler(handle_callback))

    # Free-text messages
    app.add_handler(MessageHandler(filters.TEXT & ~filters.COMMAND, handle_message))

    # Error handler
    app.add_error_handler(error_handler)

    logger.info("SejarahBot (knowledge-base edition) is running — no OpenAI key required.")
    app.run_polling(allowed_updates=Update.ALL_TYPES)


if __name__ == "__main__":
    main()
