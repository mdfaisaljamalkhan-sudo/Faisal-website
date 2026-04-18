# Free-Tier Deployment Plan (Handoff to Claude Code)

> **Context for Claude Code in VS Code:** This plan was drafted in Cowork after a conversation with Faisal. The goal is to deploy this portfolio site + RAG chatbot **at zero recurring cost** so recruiters can visit a URL, interact with the site, and chat with the bot. Faisal already has $5 in Anthropic credits — LLM cost is handled. Only hosting needs to be free.

---

## 1. What we're deploying (discovered from repo scan)

**Frontend:** Vite + React 19 + TypeScript + TailwindCSS. Static build lives in `dist/`.

**Backend:** FastAPI (`backend/main.py`) with RAG pipeline (`backend/rag.py`), personality knowledge base (`backend/knowledge.py`), ChromaDB for vector search, `sentence-transformers` for embeddings, Anthropic SDK for LLM calls.

**Vector store:** ChromaDB is already persisted locally at `backend/chroma_data/` (contains `chroma.sqlite3` + UUID directory). This is important — no external vector DB is needed.

**Container:** `backend/Dockerfile` already exists (Python 3.11-slim, port 8000, `/api/health` healthcheck). `docker-compose.yml` references Ollama, but we're not using Ollama in production — ignore it for deployment.

**Frontend → Backend connection:** `src/lib/chatApi.ts` — the backend URL will need to become configurable via a Vite env var.

---

## 2. Chosen architecture (final recommendation)

**Frontend:** Cloudflare Pages (or Vercel — either works).
**Backend + ChromaDB:** Hugging Face Spaces, Docker SDK.

### Why this combo

1. **HF Spaces Docker SDK** accepts the existing `backend/Dockerfile` almost as-is, gives us persistent disk (so Chroma's SQLite + embedding index survive restarts), has no cold-start paywall, and handles HTTPS. Port must be exposed on **7860**, not 8000 — only change needed in the Dockerfile.
2. ChromaDB stays **bundled inside the Space** in `/data/chroma_data` (HF's persistent volume mount). Zero external vector DB cost.
3. **Cloudflare Pages** (or Vercel) hosts the static Vite build. Both are generous free tiers, always-on, global CDN.
4. Anthropic API key lives as a **Space secret** (never committed).
5. Faisal's $5 Anthropic budget only pays for actual chat tokens — everything else is free.

### Backup option (if HF Spaces doesn't work out)

**Render free web service** running the same Docker container. Downside: spins down after 15 min idle (~30 s cold start on first recruiter visit). Can be mitigated with a free `cron-job.org` pinger hitting `/api/health` every 10 min. HF Spaces is preferred because it doesn't have this issue.

---

## 3. Required code changes (concrete, scoped)

### 3.1 `backend/Dockerfile`
- Change `EXPOSE 8000` to `EXPOSE 7860`.
- Change the uvicorn CMD to bind port **7860**.
- Add `ENV CHROMA_DATA_DIR=/data/chroma_data` so Chroma writes to HF's persistent volume.
- Keep the healthcheck but update the port to 7860.

### 3.2 `backend/main.py` / `backend/rag.py`
- Read `CHROMA_DATA_DIR` env var (fallback to `./chroma_data`) and pass it to `chromadb.PersistentClient(path=...)`.
- Harden **CORS** — restrict `allow_origins` to the deployed frontend URL(s) via an env var (`FRONTEND_ORIGIN`), with a localhost fallback for dev. Do not leave `allow_origins=["*"]` in prod.
- Add a `/api/health` lightweight endpoint if not already present (Dockerfile references it).

### 3.3 First-run ChromaDB bootstrap
- The Space's persistent volume starts empty. Add a small startup routine in `main.py` (or a `startup.py`) that, on boot, checks whether the collection is populated; if not, ingests from `knowledge.py` into Chroma at `CHROMA_DATA_DIR`. This makes the deploy idempotent — no manual ingestion step on HF.

### 3.4 Frontend — `src/lib/chatApi.ts`
- Replace any hardcoded `http://localhost:8000` with `import.meta.env.VITE_API_BASE_URL`.
- Add `.env.example` at repo root with `VITE_API_BASE_URL=https://<your-space>.hf.space`.

### 3.5 Secrets & ignores
- Ensure `.env`, `backend/.env`, and `backend/venv/` are in `.gitignore` (they should be already — verify).
- **Do NOT commit `backend/chroma_data/`** — the Space will rebuild it from `knowledge.py` on first boot.

### 3.6 New file: `backend/README_HF.md`
- Short Hugging Face Spaces README with the required YAML front-matter (`sdk: docker`, `app_port: 7860`, title, emoji). HF requires this at the Space root.

---

## 4. Deployment steps (in order)

### Phase A — Prep the code (local, in VS Code)
1. Make the changes listed in §3.
2. Run backend locally with the new env vars to confirm Chroma still works (`CHROMA_DATA_DIR=./chroma_data python -m uvicorn main:app --port 7860`).
3. Run frontend locally pointed at `VITE_API_BASE_URL=http://localhost:7860` and test the chatbot end-to-end.
4. Commit.

### Phase B — Deploy backend to Hugging Face Spaces
1. Create a free HF account if Faisal doesn't have one.
2. Create a new Space: SDK = **Docker**, visibility = **Public** (or Private — recruiters don't need the Space URL, only the frontend URL).
3. Push the `backend/` folder contents as the Space repo root (HF Space = its own git repo). Easiest path: add the HF Space as a second remote on a `backend-only` branch, or init a separate repo inside `backend/`.
4. Add Space secrets:
   - `ANTHROPIC_API_KEY` = Faisal's key
   - `FRONTEND_ORIGIN` = the Cloudflare Pages / Vercel URL (can be set after Phase C and updated)
5. Wait for the Space to build (~3–5 min). Hit `https://<user>-<space>.hf.space/api/health` to confirm it's alive.

### Phase C — Deploy frontend to Cloudflare Pages
1. Push the whole repo to GitHub (if not already).
2. In Cloudflare Pages, connect the GitHub repo.
3. Build config:
   - Framework: Vite
   - Build command: `npm run build`
   - Output directory: `dist`
4. Environment variable: `VITE_API_BASE_URL` = the HF Space URL from Phase B.
5. Deploy. Copy the Pages URL.

### Phase D — Close the CORS loop
1. Go back to the HF Space settings → update the `FRONTEND_ORIGIN` secret to the Cloudflare Pages URL.
2. Restart the Space (or it auto-restarts on secret change).
3. Test the deployed site end-to-end from a fresh browser: load site → open chat → send a message → verify response.

---

## 5. Cost ceiling

- Hugging Face Spaces (CPU basic): **$0/mo**
- Cloudflare Pages: **$0/mo**
- ChromaDB (bundled, persistent): **$0/mo**
- Anthropic API: pay-per-use against Faisal's existing $5 credit. For a portfolio demo, this should last a long time if we use Haiku or a cheap model for cost-sensitive paths.

**Optional optimization:** in `rag.py`, default to a cheaper Anthropic model (e.g. Claude Haiku) for chat completions to stretch the $5 credit further. Only escalate to Sonnet if Haiku quality is insufficient.

---

## 6. Open questions for Faisal (Claude Code should confirm before executing)

1. Is the GitHub repo for this project already created? If not, that needs to happen before Cloudflare Pages.
2. Does Faisal want HF Space set to Public or Private?
3. Which Anthropic model should the chatbot default to for recruiter-facing traffic? (Recommend Haiku for cost.)
4. Should the Cloudflare Pages domain use a custom subdomain or the default `*.pages.dev`?

---

## 7. Files Claude Code is expected to create/modify

Create:
- `backend/README_HF.md` (HF Space front-matter)
- `.env.example` (repo root, frontend env template)
- `backend/.env.example` (update to include `CHROMA_DATA_DIR`, `FRONTEND_ORIGIN`)

Modify:
- `backend/Dockerfile` (port 7860, CHROMA_DATA_DIR)
- `backend/main.py` (CORS allowlist via env, healthcheck, startup ingestion)
- `backend/rag.py` (use CHROMA_DATA_DIR)
- `src/lib/chatApi.ts` (read `VITE_API_BASE_URL`)
- `.gitignore` (ensure `chroma_data/`, `.env`, `venv/` are excluded)

Leave alone:
- `docker-compose.yml` (local dev only — no prod impact)
- Frontend components (`src/components/**`) — no changes needed for deployment
- `backend/knowledge.py` — data source, used by startup ingestion

---

*End of plan. Claude Code: please confirm the open questions in §6 with Faisal, then execute phases A → D in order.*
