# Faisal's RAG Chatbot Backend

A **Retrieval-Augmented Generation (RAG)** chatbot built with FastAPI, ChromaDB, and Claude API. Answers recruiter questions about Faisal using semantic search over his personal knowledge base.

## Architecture

```
Browser (React on Cloudflare Pages)
    │  POST /api/chat  { message, history }
    ▼
FastAPI (HF Spaces, port 7860)
    │  1. Embed query → search ChromaDB → top-3 chunks
    │  2. Inject chunks into prompt
    │  3. Call Claude Haiku API
    ▼
Response → Browser
```

## Files

```
backend/
├── main.py           # FastAPI app, /api/chat + /api/health
├── rag.py            # RAG pipeline (chunking, embedding, retrieval)
├── knowledge.py      # Faisal's personality profile + 30 Q&As
├── requirements.txt  # Python dependencies
├── Dockerfile        # HF Spaces deployment (port 7860)
└── .env              # ANTHROPIC_API_KEY (local dev only)
```

## Local Development

```bash
cd backend
python -m venv venv && source venv/Scripts/activate
pip install -r requirements.txt
python -m uvicorn main:app --reload --port 7860
```

## Environment Variables

| Variable | Required | Purpose |
|---|---|---|
| `ANTHROPIC_API_KEY` | Yes | Claude API key |
| `CHROMA_DATA_DIR` | No | ChromaDB storage path (default: `./chroma_data`) |

## Deployment

Deployed on **Hugging Face Spaces** (Docker SDK, CPU basic, free tier).
ChromaDB persists to `/data/chroma_data` on HF's persistent volume.
