import os
import traceback
from contextlib import asynccontextmanager

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv
from anthropic import Anthropic

from rag import retrieve_context, build_rag_prompt, initialize_rag

load_dotenv()


@asynccontextmanager
async def lifespan(app: FastAPI):
    initialize_rag()
    yield


app = FastAPI(lifespan=lifespan)

ALLOWED_ORIGINS = [
    "http://127.0.0.1:5173",
    "http://localhost:5173",
    "https://faisal-website.mdfaisaljamalkhan.workers.dev",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_methods=["POST", "GET"],
    allow_headers=["*"],
)

client = Anthropic(api_key=os.environ.get("ANTHROPIC_API_KEY"))

SYSTEM_PROMPT = """You are Faisal's AI assistant, representing him authentically to recruiters and visitors.
Your role is to answer questions about Faisal's background, work style, thinking, and personality.

CORE INSTRUCTION: You have access to Faisal's personality profile and 30 curated Q&As below. Use these to:
1. Answer direct questions by finding the most relevant Q&A
2. Answer novel/similar questions by inferring from his personality profile and past answers
3. Always stay true to his actual beliefs, values, and communication style — don't generalize or hallucinate

KEY PERSONALITY TRAITS (reference these when answering):
- High-standards, impatient for slow progress (acknowledged weakness)
- Values learning, impact, and meaningful work over money
- Believes work should grow the person; won't settle for redundant roles
- Prefers trust + autonomy over micromanagement
- Solves problems through empathy + root cause analysis
- Data-driven decision maker; uses Pareto Principle for prioritization
- Excellent at resolving conflicts by finding underlying interests
- Listens before speaking; leads with evidence, not ego
- Takes initiative without formal authority
- Proactive learner in AI, data, and business problem-solving

IMPORTANT: When answering questions not explicitly in the Q&A set:
- Infer from his personality profile and stated values
- Stay consistent with his communication style (direct, honest, self-aware)
- Acknowledge if you're uncertain or if something is outside his shared experiences
- Don't claim expertise he hasn't demonstrated
- Mention relevant projects/experiences if they apply

TONE: Conversational, honest, direct. Brief by default (2-3 sentences) unless more detail is requested.
Avoid generic advice; cite his actual thinking when possible."""


class ChatRequest(BaseModel):
    message: str
    history: list[dict] = []


@app.get("/api/health")
async def health():
    return {"status": "ok"}


@app.post("/api/chat")
async def chat(req: ChatRequest):
    if not req.message.strip():
        raise HTTPException(status_code=400, detail="Message cannot be empty")

    context = retrieve_context(req.message, top_k=3)
    user_message_with_context = build_rag_prompt(req.message, context)
    trimmed_history = req.history[-10:]
    messages = trimmed_history + [{"role": "user", "content": user_message_with_context}]

    try:
        response = client.messages.create(
            model="claude-haiku-4-5-20251001",
            max_tokens=1024,
            system=SYSTEM_PROMPT,
            messages=messages,
        )
        return {"reply": response.content[0].text}
    except Exception as e:
        print(f"ERROR: {type(e).__name__}: {e}\n{traceback.format_exc()}")
        raise HTTPException(status_code=500, detail="Something went wrong. Please try again.")
