import type { ChatMessage } from '@/types/chat'

// Backend URL: HF Spaces in production, relative path for local dev
const API_BASE_URL = import.meta.env.DEV
  ? ''
  : 'https://Anal-ist-Faisal-website-backend.hf.space'

export async function sendChatMessage(
  userMessage: string,
  history: ChatMessage[]
): Promise<string> {
  const apiHistory = history.map(m => ({
    role: m.role,
    content: m.content,
  }))

  const endpoint = `${API_BASE_URL}/api/chat`

  const res = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message: userMessage, history: apiHistory }),
  })

  if (!res.ok) {
    const error = await res.json().catch(() => ({}))
    throw new Error(error.detail || 'Failed to get a response. Please try again.')
  }

  const data = await res.json()
  return data.reply
}
