# Faisal's Portfolio

Personal portfolio website with an AI chatbot that answers recruiter questions using RAG.

**Live:** https://faisal-website.mdfaisaljamalkhan.workers.dev

## Stack

- **Frontend:** React 19, TypeScript, Vite, Tailwind CSS, Framer Motion
- **Backend:** FastAPI, ChromaDB, sentence-transformers, Claude API
- **Hosting:** Cloudflare Pages (frontend) + Hugging Face Spaces (backend)

## Local Development

```bash
# Frontend
npm install
npm run dev

# Backend
cd backend
python -m venv venv && source venv/Scripts/activate
pip install -r requirements.txt
python -m uvicorn main:app --reload --port 7860
```
