"""
SejarahBot – Telegram interface
Runs as a standalone long-polling process alongside the FastAPI web server.

Usage:
    python telegram_bot.py

Requires OPENAI_API_KEY and TELEGRAM_BOT_TOKEN in .env
"""

from __future__ import annotations

import logging
import os
from collections import defaultdict
from typing import List

from dotenv import load_dotenv
from openai import OpenAI
from telegram import Update
from telegram.constants import ChatAction, ParseMode
from telegram.ext import (
    Application,
    CommandHandler,
    ContextTypes,
    MessageHandler,
    filters,
)

# ---------------------------------------------------------------------------
# Configuration
# ---------------------------------------------------------------------------

load_dotenv()

OPENAI_API_KEY = os.getenv("OPENAI_API_KEY", "")
TELEGRAM_BOT_TOKEN = os.getenv("TELEGRAM_BOT_TOKEN", "")

if not OPENAI_API_KEY:
    raise RuntimeError("OPENAI_API_KEY is not set. Add it to .env")
if not TELEGRAM_BOT_TOKEN:
    raise RuntimeError("TELEGRAM_BOT_TOKEN is not set. Add it to .env")

client = OpenAI(api_key=OPENAI_API_KEY)
MODEL = "gpt-4o-mini"  # swap to "gpt-4o" for better quality

logging.basicConfig(
    format="%(asctime)s [%(levelname)s] %(name)s – %(message)s",
    level=logging.INFO,
)
logger = logging.getLogger(__name__)

# ---------------------------------------------------------------------------
# System prompt (identical to the FastAPI backend)
# ---------------------------------------------------------------------------

SYSTEM_PROMPT = """
You are **SejarahBot – Rakan Sejarah Anda**, an interactive AI history learning assistant
designed to help users learn about Malaysian history through WhatsApp-style conversations.

## Core Purpose
Help users understand Malaysian history by providing clear, accurate, and easy-to-understand
explanations. You help users explore:
- Historical events
- Famous historical figures
- Important dates and timelines
- Causes and effects of historical events

You also provide interactive history quizzes and share interesting historical facts to make
learning more engaging.

**You guide users in learning. You must NOT complete homework, assignments, or exam questions
on their behalf.**

## Main Features
1. **Historical Q&A** – Answer questions about Malaysian history in clear, simple language.
2. **Historical Timeline** – Display important dates and events in chronological order.
3. **Meet Historical Figures** – Provide information about famous figures and their contributions.
4. **Interactive History Quiz** – Test knowledge through engaging questions with feedback.
5. **Interesting Historical Facts** – Share short, fascinating facts about Malaysian history.

## Entity Extraction & Slot Filling
- Always identify the specific historical event, figure, date, period, or topic
  (`subject_or_topic`) before giving a detailed answer or generating a quiz.
- If the user has not specified a topic, ask:
  "Sure! Which Malaysian history topic would you like to explore?"
- If the user wants to learn but has not specified an activity, ask:
  "Would you like to explore a historical event, view a timeline, learn about a historical
   figure, try a quiz, or discover an interesting historical fact?"

## Fallback Handling
- If you do not understand the user's question, respond with:
  "Sorry, I don't quite understand. Could you tell me which Malaysian history topic you are
   interested in, or try asking in a different way?"
- After **two consecutive failed attempts**, offer to connect the user to a history teacher
  or mentor for further assistance.

## Human Escalation & Guardrails
Politely decline and offer to connect the user to a teacher or mentor when:
1. **Academic Dishonesty** – User asks you to complete homework, assignments, or exam questions.
   Provide learning guidance and encourage the user to develop their own answer.
2. **Non-Academic Requests** – User asks for help unrelated to Malaysian history or education.
   Explain your role and redirect them to a suitable resource.
3. **Uncertain Historical Information** – If you cannot verify a fact or encounter conflicting
   interpretations, acknowledge the uncertainty and recommend consulting a history teacher or a
   reliable historical source.

Whenever you escalate to a human, always include this exact line at the end of your reply:
👨‍🏫 **Sila hubungi guru atau pembimbing sejarah anda untuk bantuan lanjut.**

## Communication Style
- Use friendly, clear, student-friendly language.
- Present information in short paragraphs or bullet points.
- Explain unfamiliar historical terms in simple language.
- Use chronological order for timelines and historical developments.
- Encourage follow-up questions and further exploration.
- Provide accurate information; distinguish established facts from interpretations.
- Make learning interactive, engaging, and suitable for Gen Z users.
""".strip()

# ---------------------------------------------------------------------------
# Per-user conversation history (in-memory)
# Keyed by Telegram user_id → list of {role, content} dicts
# ---------------------------------------------------------------------------

_histories: dict[int, List[dict]] = defaultdict(list)

MAX_HISTORY = 20  # keep last N user+assistant pairs to avoid token bloat


# ---------------------------------------------------------------------------
# Handlers
# ---------------------------------------------------------------------------

async def start(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    """Handle /start — greet the user and reset their history."""
    user_id = update.effective_user.id
    _histories[user_id].clear()

    welcome = (
        "👋 *Selamat datang ke SejarahBot – Rakan Sejarah Anda\\!*\n\n"
        "Saya boleh membantu anda:\n"
        "📖 Menjawab soalan sejarah Malaysia\n"
        "📅 Memaparkan garis masa peristiwa penting\n"
        "🧑‍🤝‍🧑 Memperkenalkan tokoh\\-tokoh sejarah\n"
        "🧠 Kuiz sejarah interaktif\n"
        "✨ Fakta menarik tentang sejarah Malaysia\n\n"
        "Taip soalan anda untuk bermula\\! 🇲🇾"
    )
    await update.message.reply_text(welcome, parse_mode=ParseMode.MARKDOWN_V2)


async def reset(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    """Handle /reset — clear conversation history for this user."""
    _histories[update.effective_user.id].clear()
    await update.message.reply_text(
        "🔄 Perbualan telah diset semula. Mulakan soalan baru anda!"
    )


async def handle_message(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    """Handle every plain text message — send to OpenAI and reply."""
    user_id = update.effective_user.id
    user_text = update.message.text or ""

    if not user_text.strip():
        return

    # Show "typing…" indicator while waiting for OpenAI
    await context.bot.send_chat_action(
        chat_id=update.effective_chat.id, action=ChatAction.TYPING
    )

    # Build message list for this request
    history = _histories[user_id]
    history.append({"role": "user", "content": user_text})

    messages = [{"role": "system", "content": SYSTEM_PROMPT}] + history

    try:
        response = client.chat.completions.create(
            model=MODEL,
            messages=messages,
            temperature=0.7,
            max_tokens=800,
        )
        reply = response.choices[0].message.content or ""
    except Exception as exc:
        logger.error("OpenAI error: %s", exc)
        reply = "⚠️ Maaf, berlaku ralat. Sila cuba lagi sebentar."

    history.append({"role": "assistant", "content": reply})

    # Trim history to avoid unbounded growth
    if len(history) > MAX_HISTORY * 2:
        _histories[user_id] = history[-(MAX_HISTORY * 2):]

    await update.message.reply_text(reply)


# ---------------------------------------------------------------------------
# Entry point
# ---------------------------------------------------------------------------

def main() -> None:
    app = Application.builder().token(TELEGRAM_BOT_TOKEN).build()

    app.add_handler(CommandHandler("start", start))
    app.add_handler(CommandHandler("reset", reset))
    app.add_handler(MessageHandler(filters.TEXT & ~filters.COMMAND, handle_message))

    logger.info("SejarahBot Telegram is running…")
    app.run_polling(allowed_updates=Update.ALL_TYPES)


if __name__ == "__main__":
    main()
