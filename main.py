"""
SejarahBot – Rakan Sejarah Anda
FastAPI backend with OpenAI Chat Completions
"""

from __future__ import annotations

import logging
import os
from typing import List

from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from openai import OpenAI
from pydantic import BaseModel

# ---------------------------------------------------------------------------
# Configuration
# ---------------------------------------------------------------------------

logger = logging.getLogger(__name__)
logging.basicConfig(format="%(asctime)s [%(levelname)s] %(name)s – %(message)s", level=logging.INFO)

load_dotenv()

OPENAI_API_KEY = os.getenv("OPENAI_API_KEY", "")
if not OPENAI_API_KEY:
    raise RuntimeError("OPENAI_API_KEY is not set. Add it to .env")

client = OpenAI(api_key=OPENAI_API_KEY)
MODEL = "gpt-4o-mini"  # swap to "gpt-4o" for better quality if desired

# ---------------------------------------------------------------------------
# SejarahBot system prompt (all rules from the spec)
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
# Pydantic schemas
# ---------------------------------------------------------------------------


class Message(BaseModel):
    role: str          # "user" | "assistant"
    content: str


class ChatRequest(BaseModel):
    messages: List[Message]   # full conversation history from the client


class ChatResponse(BaseModel):
    reply: str


# ---------------------------------------------------------------------------
# FastAPI app
# ---------------------------------------------------------------------------

app = FastAPI(title="SejarahBot API")

# Serve static assets (CSS, JS, images)
app.mount("/static", StaticFiles(directory="static"), name="static")


@app.get("/", response_class=HTMLResponse)
async def root():
    """Serve the chat UI."""
    with open("templates/index.html", encoding="utf-8") as f:
        return f.read()


@app.post("/chat", response_model=ChatResponse)
async def chat(request: ChatRequest):
    """
    Accepts the full conversation history and returns the next assistant reply.
    The system prompt is always prepended server-side so the client never needs
    to handle it.
    """
    messages = [{"role": "system", "content": SYSTEM_PROMPT}]
    for msg in request.messages:
        if msg.role not in ("user", "assistant"):
            raise HTTPException(status_code=400, detail=f"Invalid role: {msg.role}")
        messages.append({"role": msg.role, "content": msg.content})

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
        raise HTTPException(status_code=502, detail="Upstream AI service error. Please try again later.") from exc

    return ChatResponse(reply=reply)
