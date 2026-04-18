import { useState } from 'react'
import { ChatBubble } from './ChatBubble'
import { ChatPanel } from './ChatPanel'
import { useChatbot } from '@/hooks/useChatbot'

export function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const { messages, isLoading, error, sendMessage } = useChatbot()

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
