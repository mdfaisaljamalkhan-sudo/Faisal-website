import type { ChatMessage } from '@/types/chat'

export const API_BASE_URL = import.meta.env.DEV
  ? ''
  : 'https://Anal-ist-Faisal-website-backend.hf.space'

async function attemptSend(
  userMessage: string,
  apiHistory: { role: string; content: string }[],
  attempt: number
): Promise<string> {
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), 60_000)

  try {
    const res = await fetch(`${API_BASE_URL}/api/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: userMessage, history: apiHistory }),
      signal: controller.signal,
    })

    if (!res.ok) {
      const error = await res.json().catch(() => ({}))
      throw new Error(error.detail || 'Failed to get a response. Please try again.')
    }

    const data = await res.json()
    if (!data.reply) throw new Error('Failed to get a response. Please try again.')
    return data.reply
  } catch (err) {
    if (err instanceof DOMException && err.name === 'AbortError') {
      if (attempt === 0) {
        // Cold-start: wait 5s and retry once
        await new Promise(r => setTimeout(r, 5000))
        return attemptSend(userMessage, apiHistory, 1)
      }
      throw new Error('The chatbot is taking longer than usual to wake up. Please try again in a moment.')
    }
    throw err
  } finally {
    clearTimeout(timeout)
  }
}

export async function sendChatMessage(
  userMessage: string,
  history: ChatMessage[]
): Promise<string> {
  const apiHistory = history.map(m => ({ role: m.role, content: m.content }))
  return attemptSend(userMessage, apiHistory, 0)
}
