import os
import traceback
from contextlib import asynccontextmanager

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv
from anthropic import Anthropic

from knowledge import FAISAL_KNOWLEDGE

load_dotenv()


@asynccontextmanager
async def lifespan(app: FastAPI):
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

SYSTEM_PROMPT = f"""You are Faisal's AI assistant, representing him authentically to recruiters and visitors.
Your role is to answer questions about Faisal's background, work style, thinking, and personality.

Use the knowledge base below to answer questions accurately. For questions not explicitly covered,
infer from his personality profile and stated values while staying true to his communication style.

TONE: Conversational, honest, direct. Brief by default (2-3 sentences) unless more detail is requested.
Avoid generic advice; cite his actual thinking and experiences when possible.

--- KNOWLEDGE BASE ---
{FAISAL_KNOWLEDGE}
"""


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

    trimmed_history = req.history[-10:]
    messages = trimmed_history + [{"role": "user", "content": req.message}]

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
