# Faisal's Personal RAG Chatbot Backend

A **Retrieval-Augmented Generation (RAG)** pipeline built with FastAPI, Chromadb, and Ollama. The chatbot answers recruiter questions about Faisal's background, projects, and availability using semantic search over his personal knowledge base.

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     Recruiter's Browser                      │
│                    (React Frontend on 5173)                  │
└──────────────────────────┬──────────────────────────────────┘
                           │
                     POST /api/chat
                           │
                           ▼
┌─────────────────────────────────────────────────────────────┐
│                   FastAPI Backend (8000)                     │
│  ┌──────────────────────────────────────────────────────┐   │
│  │ 1. Receive user message                              │   │
│  │ 2. Retrieve relevant context via RAG                 │   │
│  │    └─> Query Chroma vector DB                        │   │
│  │    └─> Return top-3 relevant knowledge chunks        │   │
│  │ 3. Inject retrieved context into prompt              │   │
│  │ 4. Send to Ollama with retrieved context             │   │
│  │ 5. Return AI-generated response                      │   │
│  └──────────────────────────────────────────────────────┘   │
│                           │                                  │
│                           ▼                                  │
│  ┌──────────────────────────────────────────────────────┐   │
│  │       Chroma Vector Database (Local Storage)        │   │
│  │  - Stores embeddings of knowledge chunks             │   │
│  │  - ~30 chunks from knowledge.py                      │   │
│  │  - Built on startup from knowledge.py               │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────┬──────────────────────────────┘
                              │
                              ▼
         ┌────────────────────────────────────┐
         │   Ollama (Local or Remote)         │
         │   - Model: llama3.2:3b             │
         │   - Generates responses using      │
         │     retrieved context              │
         └────────────────────────────────────┘
```

## How RAG Works

Traditional chatbot: `User Question → LLM → (generic answer, hallucination risk)`

RAG Pipeline: 
1. **User asks**: "What projects has Faisal built?"
2. **Retrieve**: Search Chroma for relevant knowledge chunks
   - Query embedding: "projects Faisal built"
   - Matches: SubaDash section, DDU-GKY section
3. **Augment**: Inject retrieved chunks into the prompt:
   ```
   Based on the following information about Faisal:
   
   [RETRIEVED CHUNKS HERE]
   
   ---
   Answer this question: What projects has Faisal built?
   ```
4. **Generate**: Ollama reads context and answers accurately

**Benefits**:
- ✅ Grounded answers (uses actual knowledge, not hallucinations)
- ✅ Easy updates (edit `knowledge.py`, changes apply instantly)
- ✅ Cost-effective (small model on local hardware)
- ✅ Portfolio-worthy architecture (shows RAG understanding)

## Files

```
backend/
├── main.py              # FastAPI app + /api/chat endpoint
├── rag.py              # RAG pipeline (chunking, retrieval, embedding)
├── knowledge.py        # Faisal's personal knowledge base
├── requirements.txt    # Python dependencies
├── .env                # Environment variables (OLLAMA_MODEL, OLLAMA_URL)
├── Dockerfile          # Container config for deployment
├── docker-compose.yml  # Local development (Ollama + Backend)
└── chroma_data/        # Vector DB storage (auto-created on startup)
```

## Setup

### Local Development

**Prerequisites**:
- Python 3.11+
- Ollama installed locally (`ollama pull llama3.2:3b`)

**Option 1: Traditional (current setup)**
```bash
# Terminal 1: Start Ollama daemon
ollama serve

# Terminal 2: Start backend
cd backend
source venv/Scripts/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
python -m uvicorn main:app --reload --port 8000
```

**Option 2: Docker Compose (cleaner)**
```bash
cd backend
docker-compose up
# Both Ollama and backend start automatically
# Ollama pulls llama3.2:3b on first run (takes ~5 min)
```

### Testing

```bash
# Health check
curl http://localhost:8000/api/health

# Ask a question
curl -X POST http://localhost:8000/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "What projects has Faisal built?", "history": []}'
```

## Deployment

### Railway (Production)

1. Create account at [railway.app](https://railway.app)
2. Connect GitHub repo or upload this folder
3. Add environment variables:
   ```
   OLLAMA_URL=http://ollama-service:11434/api/chat
   OLLAMA_MODEL=llama3.2:3b
   PORT=8000
   ```
4. Deploy

**Note**: For 24/7 uptime, Ollama must also run on Railway. This requires:
- Docker container with pre-downloaded model (2GB), OR
- Separate Ollama service on Railway

Alternatively, use a lightweight model like `phi3` (1.4GB, faster).

### Environment Variables

| Variable | Default | Purpose |
|---|---|---|
| `OLLAMA_URL` | `http://localhost:11434/api/chat` | Ollama API endpoint |
| `OLLAMA_MODEL` | `llama3.2:3b` | Model name (must match installed model) |
| `PORT` | `8000` | Backend port |

## Key Dependencies

- **fastapi**: Web framework
- **chromadb**: Vector database
- **sentence-transformers**: Embedding model (all-MiniLM-L6-v2)
- **httpx**: Async HTTP client for Ollama
- **python-dotenv**: Environment config

## RAG Performance Notes

- **First response**: ~5-15 seconds (model loads into RAM)
- **Subsequent responses**: ~2-5 seconds (model cached)
- **Embedding search**: <100ms (Chroma is fast locally)
- **Context window**: Last 10 chat turns stored (multi-turn conversations)

## Customization

### Adding New Knowledge

Edit `knowledge.py` — any changes auto-reload on startup:
```python
# Add new section
=== NEW SECTION ===
Key information here...
```

RAG will automatically:
1. Chunk new content
2. Generate embeddings
3. Index in Chroma
4. Include in retrieval

### Tuning RAG

In `rag.py`:
- **`top_k=3`** in `retrieve_context()` — how many chunks to retrieve (increase for more context, decrease for focused answers)
- **Embedding model** — change `all-MiniLM-L6-v2` to larger model for better accuracy (tradeoff: slower)
- **Chunking strategy** — modify `chunk_knowledge()` for different section sizes

### Using Different Models

Swap Ollama model:
```bash
ollama pull phi3         # 1.4GB, faster
# or
ollama pull mistral      # 4.1GB, better reasoning
```

Update `.env`:
```
OLLAMA_MODEL=phi3
```

## Debugging

**Q: RAG not retrieving relevant chunks?**
- Check `chroma_data/` exists (delete to rebuild)
- Try rephrasing question (embeddings are semantic, not exact match)
- Increase `top_k` in `rag.py` to see more results

**Q: Ollama not connecting?**
- Verify `ollama serve` is running
- Check `OLLAMA_URL` environment variable
- Test: `curl http://localhost:11434/api/tags`

**Q: Model answers are generic despite RAG?**
- Increase `top_k` to pass more context
- Use larger Ollama model (mistral, neural-chat)
- Check if knowledge.py section exists and is formatted correctly

## Future Improvements

- [ ] Streaming responses (WebSocket support)
- [ ] Chat history persistence (database)
- [ ] Multi-turn context ranking
- [ ] Fine-tuned model variant via LoRA
- [ ] Hybrid RAG + web search for real-time info
- [ ] Analytics (track popular questions)

## License

MIT — use this architecture as a template for your own projects!
