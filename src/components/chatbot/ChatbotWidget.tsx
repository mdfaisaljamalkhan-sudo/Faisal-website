import { useState, useEffect } from 'react'
import { ChatBubble } from './ChatBubble'
import { ChatPanel } from './ChatPanel'
import { useChatbot } from '@/hooks/useChatbot'
import { API_BASE_URL } from '@/lib/chatApi'

export function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const { messages, isLoading, error, sendMessage } = useChatbot()

  // Warm up the HF Space as soon as the page loads so it's ready when needed
  useEffect(() => {
    fetch(`${API_BASE_URL}/api/health`).catch(() => {})
  }, [])

  return (
    <>
      <ChatPanel
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        messages={messages}
        isLoading={isLoading}
        error={error}
        onSendMessage={sendMessage}
      />
      <ChatBubble isOpen={isOpen} onToggle={() => setIsOpen(prev => !prev)} />
    </>
  )
}
