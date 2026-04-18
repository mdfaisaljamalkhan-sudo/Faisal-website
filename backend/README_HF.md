---
title: Faisal's Portfolio Chatbot
emoji: 🤖
colorFrom: blue
colorTo: indigo
sdk: docker
app_port: 7860
---

# Faisal's Portfolio Chatbot Backend

This is the backend for Faisal's portfolio website chatbot. It uses FastAPI with a RAG (Retrieval-Augmented Generation) pipeline powered by Claude AI and ChromaDB.

## Features

- **RAG Pipeline**: Semantic search over Faisal's personality profile and Q&A training data using ChromaDB and sentence-transformers
- **Claude API Integration**: Uses Anthropic's Claude Haiku model for efficient, cost-effective responses
- **Persistent Vector Store**: ChromaDB stores embeddings locally in `/data/chroma_data` (HF Spaces persistent volume)
- **CORS-Protected**: Only allows requests from the deployed frontend URL

## Environment Variables

- `ANTHROPIC_API_KEY`: Your Anthropic API key (required)
- `CHROMA_DATA_DIR`: Path to ChromaDB data directory (defaults to `/data/chroma_data`)
- `FRONTEND_ORIGIN`: Frontend URL for CORS allowlist (defaults to `http://localhost:5173`)

## API Endpoints

- `POST /api/chat`: Chat with the AI assistant
  - Request: `{ "message": "string", "history": [ { "role": "user|assistant", "content": "string" } ] }`
  - Response: `{ "reply": "string" }`
- `GET /api/health`: Health check endpoint

## Deployment

This Space is deployed on Hugging Face with Docker. The container:
1. Builds the Python environment with FastAPI and dependencies
2. Sets up ChromaDB with persistent storage at `/data/chroma_data`
3. Initializes the knowledge base on first run from `knowledge.py`
4. Exposes the API on port 7860

## Local Development

```bash
pip install -r requirements.txt
export CHROMA_DATA_DIR=./chroma_data
export FRONTEND_ORIGIN=http://localhost:5173
python -m uvicorn main:app --port 7860 --reload
```

Then test with: `curl http://localhost:7860/api/health`
