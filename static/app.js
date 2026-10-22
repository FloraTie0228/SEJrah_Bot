/* ── SejarahBot – frontend logic ────────────────────────────────
   Sends the full conversation history to POST /chat
   and renders replies in a WhatsApp-style bubble list.
─────────────────────────────────────────────────────────────── */

"use strict";

// ── State ────────────────────────────────────────────────────
/** @type {{ role: "user"|"assistant", content: string }[]} */
const history = [];

// ── DOM refs ─────────────────────────────────────────────────
const messageList = document.getElementById("messageList");
const userInput   = document.getElementById("userInput");
const sendBtn     = document.getElementById("sendBtn");

// ── Helpers ──────────────────────────────────────────────────

/** Returns HH:MM time string. */
function nowTime() {
  return new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

/**
 * Naive Markdown → HTML:
 * Handles **bold**, *italic*, bullet lists (- / *), numbered lists, and line breaks.
 * Keeps it lightweight — no external library needed.
 */
function markdownToHtml(text) {
  // Escape raw HTML
  let html = text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  // Linkify WhatsApp numbers: +60XXXXXXXXX → wa.me link
  html = html.replace(
    /(\+60\d{9,10})/g,
    '<a href="https://wa.me/$1" target="_blank" rel="noopener" style="color:#128c7e;font-weight:600;">$1</a>'
  );

  // Bold  (**text** or __text__)
  html = html.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
  html = html.replace(/__(.+?)__/g,     "<strong>$1</strong>");

  // Italic (*text* or _text_)
  html = html.replace(/\*([^*\n]+)\*/g, "<em>$1</em>");
  html = html.replace(/_([^_\n]+)_/g,   "<em>$1</em>");

  // Split into lines for list parsing
  const lines = html.split("\n");
  const result = [];
  let inUl = false, inOl = false;

  lines.forEach(line => {
    const ulMatch = line.match(/^[\s]*[-*]\s+(.+)/);
    const olMatch = line.match(/^[\s]*\d+\.\s+(.+)/);

    if (ulMatch) {
      if (!inUl) { result.push("<ul>"); inUl = true; }
      if (inOl)  { result.push("</ol>"); inOl = false; }
      result.push(`<li>${ulMatch[1]}</li>`);
    } else if (olMatch) {
      if (!inOl) { result.push("<ol>"); inOl = true; }
      if (inUl)  { result.push("</ul>"); inUl = false; }
      result.push(`<li>${olMatch[1]}</li>`);
    } else {
      if (inUl) { result.push("</ul>"); inUl = false; }
      if (inOl) { result.push("</ol>"); inOl = false; }
      result.push(line === "" ? "" : `<p>${line}</p>`);
    }
  });

  if (inUl) result.push("</ul>");
  if (inOl) result.push("</ol>");

  return result.join("\n");
}

/**
 * Appends a chat bubble to the message list.
 * @param {"incoming"|"outgoing"} direction
 * @param {string} text  Raw text (Markdown supported for incoming)
 * @returns {HTMLElement} The bubble element (for later removal if needed)
 */
function appendBubble(direction, text) {
  const row = document.createElement("div");
  row.className = `bubble-row ${direction}`;

  const bubble = document.createElement("div");
  bubble.className = "bubble";

  if (direction === "incoming") {
    bubble.innerHTML = markdownToHtml(text);
  } else {
    // Outgoing: plain text, escaping HTML
    bubble.textContent = text;
  }

  const time = document.createElement("div");
  time.className = "bubble-time";
  time.textContent = nowTime();

  bubble.appendChild(time);
  row.appendChild(bubble);
  messageList.appendChild(row);
  scrollToBottom();
  return row;
}

/** Shows the animated typing indicator. */
function showTyping() {
  const row = document.createElement("div");
  row.className = "bubble-row incoming";
  row.id = "typingRow";

  const indicator = document.createElement("div");
  indicator.className = "typing-indicator";
  indicator.innerHTML = "<span></span><span></span><span></span>";

  row.appendChild(indicator);
  messageList.appendChild(row);
  scrollToBottom();
}

/** Removes the typing indicator. */
function hideTyping() {
  const el = document.getElementById("typingRow");
  if (el) el.remove();
}

function scrollToBottom() {
  messageList.scrollTop = messageList.scrollHeight;
}

// ── Core send / receive ───────────────────────────────────────

async function sendMessage() {
  const text = userInput.value.trim();
  if (!text) return;

  // Render outgoing bubble
  appendBubble("outgoing", text);
  history.push({ role: "user", content: text });

  // Reset textarea
  userInput.value = "";
  userInput.style.height = "auto";
  sendBtn.disabled = true;

  // Show typing
  showTyping();

  try {
    const res = await fetch("/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages: history }),
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({ detail: res.statusText }));
      throw new Error(err.detail || "Server error");
    }

    const data = await res.json();
    const reply = data.reply || "";

    history.push({ role: "assistant", content: reply });
    hideTyping();
    appendBubble("incoming", reply);
  } catch (err) {
    hideTyping();
    appendBubble("incoming", `⚠️ Error: ${err.message}`);
  } finally {
    sendBtn.disabled = false;
    userInput.focus();
  }
}

// ── Event listeners ───────────────────────────────────────────

sendBtn.addEventListener("click", sendMessage);

userInput.addEventListener("keydown", e => {
  // Send on Enter (not Shift+Enter)
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault();
    sendMessage();
  }
});

// Auto-grow textarea
userInput.addEventListener("input", () => {
  userInput.style.height = "auto";
  userInput.style.height = Math.min(userInput.scrollHeight, 120) + "px";
});

// ── Initial welcome message ───────────────────────────────────

(function init() {
  const welcome = [
    "👋 Selamat datang ke **SejarahBot – Rakan Sejarah Anda**!",
    "",
    "Saya boleh membantu anda:",
    "- 📖 Menjawab soalan sejarah Malaysia",
    "- 📅 Memaparkan garis masa peristiwa penting",
    "- 🧑‍🤝‍🧑 Memperkenalkan tokoh-tokoh sejarah",
    "- 🧠 Kuiz sejarah interaktif",
    "- ✨ Fakta menarik tentang sejarah Malaysia",
    "",
    "Taip soalan anda untuk bermula! 🇲🇾",
  ].join("\n");

  appendBubble("incoming", welcome);
})();
