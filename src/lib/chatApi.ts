import type { ChatMessage } from '@/types/chat'

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

  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), 30_000)

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
    return data.reply
  } catch (err) {
    if (err instanceof DOMException && err.name === 'AbortError') {
      throw new Error('Request timed out. Please try again.')
    }
    throw err
  } finally {
    clearTimeout(timeout)
  }
}
