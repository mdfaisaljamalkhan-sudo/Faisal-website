import type { ChatMessage } from '@/types/chat'

export async function sendChatMessage(
  userMessage: string,
  history: ChatMessage[]
): Promise<string> {
  const apiHistory = history.map(m => ({
    role: m.role,
    content: m.content,
  }))

  const res = await fetch('/api/chat', {
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
