import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, X } from 'lucide-react'
import { ChatMessage } from './ChatMessage'
import type { ChatMessage as ChatMessageType } from '@/types/chat'

interface ChatPanelProps {
  isOpen: boolean
  onClose: () => void
  messages: ChatMessageType[]
  isLoading: boolean
  error: string | null
  onSendMessage: (text: string) => void
}

const TypingIndicator = () => (
  <div className="flex gap-1">
    <div className="w-2 h-2 rounded-full bg-[#2D6BE4] animate-bounce" style={{ animationDelay: '0ms' }} />
    <div className="w-2 h-2 rounded-full bg-[#2D6BE4] animate-bounce" style={{ animationDelay: '150ms' }} />
    <div className="w-2 h-2 rounded-full bg-[#2D6BE4] animate-bounce" style={{ animationDelay: '300ms' }} />
  </div>
)

export function ChatPanel({
  isOpen,
  onClose,
  messages,
  isLoading,
  error,
  onSendMessage,
}: ChatPanelProps) {
  const [inputValue, setInputValue] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, isLoading])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!inputValue.trim() || isLoading) return
    onSendMessage(inputValue)
    setInputValue('')
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-24 right-6 z-50 w-96 max-w-[calc(100vw-3rem)] h-[520px]
                     bg-white rounded-2xl shadow-2xl border border-[#E8E5E0] flex flex-col"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-[#E8E5E0] flex-shrink-0">
            <span className="font-semibold text-[#1A1A1A]">Ask about Faisal</span>
            <button
              onClick={onClose}
              className="p-1 hover:bg-[#F2F0EB] rounded-lg transition-colors text-[#6B6375]"
              aria-label="Close chat"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Message List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map(msg => (
              <ChatMessage key={msg.id} message={msg} />
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-[#F2F0EB] px-4 py-3 rounded-2xl rounded-bl-sm">
                  <TypingIndicator />
                </div>
              </div>
            )}
            {error && (
              <div className="flex justify-start">
                <div className="bg-red-50 text-red-700 px-4 py-2 rounded-2xl rounded-bl-sm text-sm">
                  {error}
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Form */}
          <form onSubmit={handleSubmit} className="p-4 border-t border-[#E8E5E0] flex gap-2 flex-shrink-0">
            <input
              type="text"
              value={inputValue}
              onChange={e => setInputValue(e.target.value)}
              placeholder="Ask me anything..."
              disabled={isLoading}
              className="flex-1 px-3 py-2 rounded-lg border border-[#E8E5E0] focus:border-[#2D6BE4]
                         focus:outline-none focus:ring-1 focus:ring-[#2D6BE4] disabled:opacity-50
                         text-[#1A1A1A] placeholder-[#A09AAB] transition-colors"
            />
            <button
              type="submit"
              disabled={isLoading || !inputValue.trim()}
              className="p-2 bg-[#2D6BE4] text-white rounded-lg hover:bg-[#2560cc] disabled:opacity-50
                         disabled:cursor-not-allowed transition-colors flex items-center justify-center"
              aria-label="Send message"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
