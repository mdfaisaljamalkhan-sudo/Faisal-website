import { useState, useCallback } from 'react'
import type { ChatMessage, ChatState } from '@/types/chat'
import { sendChatMessage } from '@/lib/chatApi'

const WELCOME_MESSAGE: ChatMessage = {
  id: 'welcome',
  role: 'assistant',
  content: "Hi! I'm Faisal's AI assistant. Ask me anything about his background, projects, or skills.",
  timestamp: new Date(),
}

export function useChatbot() {
  const [state, setState] = useState<ChatState>({
    messages: [WELCOME_MESSAGE],
    isLoading: false,
    error: null,
  })

  const sendMessage = useCallback(
    async (text: string) => {
      const userMsg: ChatMessage = {
        id: crypto.randomUUID(),
        role: 'user',
        content: text,
        timestamp: new Date(),
      }

      setState(prev => ({
        ...prev,
        messages: [...prev.messages, userMsg],
        isLoading: true,
        error: null,
      }))

      try {
        const reply = await sendChatMessage(text, state.messages)
        const assistantMsg: ChatMessage = {
          id: crypto.randomUUID(),
          role: 'assistant',
          content: reply,
          timestamp: new Date(),
        }
        setState(prev => ({
          ...prev,
          messages: [...prev.messages, assistantMsg],
          isLoading: false,
        }))
      } catch (err) {
        setState(prev => ({
          ...prev,
          isLoading: false,
          error: err instanceof Error ? err.message : 'Something went wrong.',
        }))
      }
    },
    [state.messages]
  )

  const clearMessages = useCallback(() => {
    setState({ messages: [WELCOME_MESSAGE], isLoading: false, error: null })
  }, [])

  return { ...state, sendMessage, clearMessages }
}
