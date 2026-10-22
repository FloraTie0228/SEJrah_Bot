# SejarahBot – Rakan Sejarah Anda 🇲🇾

An interactive Malaysian history learning assistant with three separate deployable versions:

| Version | Technology | Deployment | API keys needed? |
|---|---|---|---|
| **Static (GitHub Pages)** | HTML + CSS + Vanilla JS | GitHub Pages (free) | ❌ None |
| **Telegram Bot (KB edition)** | Python + python-telegram-bot | Any server or local PC | ✅ Telegram token only |
| **FastAPI Web Server** | Python + FastAPI + OpenAI | Any server (VPS, Railway, Render) | ✅ OpenAI + Telegram |

---

## Project Structure

```
sejarahbot/
│
├── docs/                        ← GitHub Pages static site (no backend needed)
│   ├── index.html               ← Chat UI entry point
│   ├── style.css                ← WhatsApp-style responsive CSS
│   ├── app.js                   ← Knowledge-base chatbot engine
│   └── quiz.js                  ← Interactive quiz engine (scoring, explanations)
│
├── sejarah_data.json            ← Shared knowledge base (22 topics + 30 quiz questions)
├── telegram_bot.py              ← Telegram bot — knowledge-base edition (no OpenAI needed)
├── main.py                      ← FastAPI backend (OpenAI-powered, optional)
├── requirements.txt             ← Python dependencies
├── templates/
│   └── index.html               ← FastAPI chat UI shell
├── static/
│   ├── style.css                ← FastAPI UI styles
│   └── app.js                   ← FastAPI UI frontend
│
├── .env                         ← Your secrets (git-ignored — NEVER commit)
├── .env.example                 ← Safe template — copy to .env and fill in
├── .gitignore
└── README.md
```

---

## ⚡ Option A — Static Site (GitHub Pages, Free, No API Key)

### What it does
- Full WhatsApp-style chat interface
- Rule-based Malaysian history knowledge base (15+ major topics)
- Keyword recognition and contextual responses in Bahasa Melayu
- Interactive quizzes (Mudah / Sederhana / Sukar) with scoring and explanations
- Responsive — works on mobile and desktop
- **No backend, no API key, no billing required**
- Clearly identifies itself as a knowledge-base chatbot, not a generative AI

### Topics covered
- Kemerdekaan Malaysia (31 Ogos 1957)
- Pembentukan Malaysia (16 September 1963)
- Sabah & Sarawak history
- Pemisahan Singapura (1965)
- Peristiwa 13 Mei 1969
- Darurat Malaya (1948–1960)
- Pendudukan Jepun (PDII)
- Kesultanan Melayu Melaka
- Malayan Union (1946)
- Penjajahan British
- Perlembagaan Persekutuan
- Rukun Negara
- Dasar Ekonomi Baru (DEB)
- Wawasan 2020
- Tokoh-tokoh sejarah (Tunku, Razak, Mahathir, dan lain-lain)
- Garis masa kronologi
- Fakta menarik

### Deploy to GitHub Pages

1. **Push this repository to GitHub** (see Git setup below)

2. **Enable GitHub Pages:**
   - Open your repository on GitHub
   - Click **Settings** → **Pages** (left sidebar)
   - Under **Source**, select **Deploy from a branch**
   - Branch: `main` | Folder: `/docs`
   - Click **Save**

3. **Wait ~1–2 minutes**, then your site is live at:
   ```
   https://<your-username>.github.io/<repository-name>/
   ```

4. **Test it** — open the URL in a browser (and on mobile)

> ⚠️ All asset paths in `docs/` use relative paths (`style.css`, `app.js`, `quiz.js`) — they work correctly under any GitHub Pages subpath.

---

## 📱 Option B — Telegram Bot (Knowledge-Base Edition, Free)

> **No OpenAI API key required.** Uses `sejarah_data.json` — the same knowledge base as the GitHub Pages site.

### Features
- `/start` — Welcome + reset session
- `/help` — Command list
- `/topik` — Browse all 22 history topics
- `/kuiz` — Interactive quiz with inline keyboard buttons (Mudah/Sederhana/Sukar)
- `/reset` — Clear conversation state
- Free-text — Keyword-based topic matching (Bahasa Melayu + English)
- Scoring, per-question explanations, final result with remarks
- Separate state per user/chat — no data shared between users

### ⚠️ Security — Revoke Your Previous Token First

If you have used or shared your Telegram bot token before, **revoke it now**:

1. Open Telegram → search `@BotFather`
2. Send `/mybots` → select your bot
3. Tap **API Token** → **Revoke current token**
4. BotFather will generate a new token — copy it immediately
5. Update your `.env` with the new token

> Never re-use an exposed token. Treat a revealed token as compromised.

### Windows Setup (step-by-step)

**Step 1 — Install Python** (if not already installed)
```
https://www.python.org/downloads/
```
During install, tick ✅ **"Add Python to PATH"**

**Step 2 — Open Command Prompt in the project folder**
```
Win + R → cmd → Enter
cd C:\Users\User\.bob\playground\sejarahbot
```
Or right-click the folder → **Open in Terminal**

**Step 3 — Create a virtual environment (recommended)**
```cmd
python -m venv venv
venv\Scripts\activate
```

**Step 4 — Install dependencies**
```cmd
pip install python-telegram-bot==21.3 python-dotenv==1.0.1
```

**Step 5 — Configure your token**
```cmd
copy .env.example .env
notepad .env
```
Edit the file and set:
```
TELEGRAM_BOT_TOKEN=your-real-token-from-botfather
```
Leave `OPENAI_API_KEY` blank or remove it — the Telegram bot no longer needs it.

**Step 6 — Run the bot**
```cmd
python telegram_bot.py
```

You should see:
```
INFO  SejarahBot (knowledge-base edition) is running — no OpenAI key required.
```

**Step 7 — Test it**
Open Telegram, find your bot, and send `/start`

**Stop the bot:** Press `Ctrl+C` in the terminal.

### Bot Commands Reference

| Command | Description |
|---|---|
| `/start` | Welcome message + reset session |
| `/help` | Show all commands |
| `/topik` | List all 22 history topics |
| `/kuiz` | Start interactive quiz (choose difficulty) |
| `/reset` | Clear conversation and quiz state |
| _(any text)_ | Keyword-based history response |

### 🌐 Local vs. 24/7 Cloud Hosting

| | Local PC | Cloud Hosting |
|---|---|---|
| **Cost** | Free | Free tier available |
| **Available 24/7** | ❌ Only when PC is on | ✅ Always on |
| **Setup difficulty** | Easy | Moderate |
| **Good for** | Development, testing | Public deployment |

**Free cloud hosting options:**

| Platform | Free Tier | Notes |
|---|---|---|
| [Railway](https://railway.app) | 500 hours/month | Easiest — connect GitHub repo, auto-deploy |
| [Render](https://render.com) | 750 hours/month | Supports background workers |
| [Fly.io](https://fly.io) | 3 shared VMs | Slightly more complex setup |

**Railway deployment (easiest):**
1. Push your code to GitHub (already done ✅)
2. Go to [railway.app](https://railway.app) → New Project → Deploy from GitHub
3. Select your `SEJrah_Bot` repo
4. Add environment variable: `TELEGRAM_BOT_TOKEN` = your token
5. Set start command: `python telegram_bot.py`
6. Deploy — bot runs 24/7

---

## 🐍 Option C — Python FastAPI (OpenAI-powered)

### Requirements
- Python 3.10+
- An OpenAI API key (paid account with credits)

### Setup

```bash
# 1. Install dependencies
pip install -r requirements.txt

# 2. Configure API keys
cp .env.example .env
# Edit .env and fill in your real OPENAI_API_KEY
```

### Run the web server

```bash
uvicorn main:app --reload
```

Open `http://127.0.0.1:8000` in your browser.

### API endpoints

| Method | Path | Description |
|---|---|---|
| `GET` | `/` | Serves the chat UI |
| `POST` | `/chat` | Accepts `{ messages: [...] }`, returns `{ reply: "..." }` |

---

## 📱 Option D — Telegram Bot (OpenAI-powered, Legacy)

> **Note:** The Telegram bot uses long-polling and requires a **continuously running server**. It cannot run on GitHub Pages.

### Requirements
- Python 3.10+
- OpenAI API key
- Telegram Bot Token (from [@BotFather](https://t.me/BotFather))

### Setup

```bash
cp .env.example .env
# Edit .env — fill in both OPENAI_API_KEY and TELEGRAM_BOT_TOKEN
```

### Run

```bash
python telegram_bot.py
```

### Bot commands

| Command | Description |
|---|---|
| `/start` | Welcome message + reset history |
| `/reset` | Clear conversation history |
| _(any text)_ | Chat with SejarahBot |

### Hosting the Telegram bot
For continuous availability, host on:
- **Railway** ([railway.app](https://railway.app)) — free tier available
- **Render** ([render.com](https://render.com)) — free tier available  
- **VPS** (DigitalOcean, Vultr, Linode)

---

## 🔐 Security

- **`.env` is git-ignored** — your API keys will never be committed
- **No API keys in browser JS** — the static site uses zero external APIs
- **Exception details sanitized** — the FastAPI backend returns generic error messages to clients
- **Fake contact numbers removed** — no placeholder WhatsApp numbers in production

### Setting up `.env`

```bash
cp .env.example .env
```

Edit `.env`:
```env
OPENAI_API_KEY=sk-proj-your-real-key-here
TELEGRAM_BOT_TOKEN=1234567890:AAHyour-real-token-here
```

---

## 🚀 Git Setup (First Time)

```bash
git init
git add .
git commit -m "Initial commit: SejarahBot static + Python versions"
git branch -M main
git remote add origin https://github.com/<your-username>/<repo-name>.git
git push -u origin main
```

> ✅ Before your first push, verify `.env` is listed in `.gitignore` (it already is). Run `git status` and confirm `.env` is **not** in the staged files.

---

## 🧪 Testing Checklist

- [ ] `docs/index.html` opens in browser without errors
- [ ] Chat interface loads with welcome message
- [ ] Keyword responses work (try: "kemerdekaan", "Tunku", "13 Mei")
- [ ] English mode works (try: "in english")
- [ ] Quick-reply chips work
- [ ] Reset button clears chat
- [ ] Kuiz Mudah starts and score counts correctly
- [ ] Kuiz Sederhana and Sukar work with 10 questions
- [ ] Mobile layout is correct (test at 375px width)
- [ ] No console errors in browser DevTools
- [ ] GitHub Pages URL loads correctly

---

## Features

| Feature | Static (docs/) | FastAPI | Telegram |
|---|---|---|---|
| Malaysian History Q&A | ✅ Knowledge base | ✅ AI (GPT) | ✅ AI (GPT) |
| Interactive Quiz | ✅ Scored | ❌ | ❌ |
| Timeline | ✅ | ✅ | ✅ |
| Historical Figures | ✅ | ✅ | ✅ |
| Bahasa Melayu | ✅ Primary | ✅ | ✅ |
| English | ✅ On request | ✅ | ✅ |
| Free to deploy | ✅ GitHub Pages | ❌ Needs OpenAI | ❌ Needs OpenAI |
| Requires server | ❌ | ✅ | ✅ |

---

## Customising

- **Knowledge base:** Edit the `KB` object in [`docs/app.js`](docs/app.js) to add topics
- **Quiz questions:** Edit `QUESTIONS` in [`docs/quiz.js`](docs/quiz.js)
- **Bot personality:** Edit `SYSTEM_PROMPT` in [`main.py`](main.py) or [`telegram_bot.py`](telegram_bot.py)
- **OpenAI model:** Change `MODEL = "gpt-4o-mini"` in `main.py` to `"gpt-4o"` for better quality
