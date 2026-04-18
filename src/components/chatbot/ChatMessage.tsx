import { cn } from '@/lib/utils'
import type { ChatMessage as ChatMessageType } from '@/types/chat'

interface ChatMessageProps {
  message: ChatMessageType
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === 'user'

  return (
    <div className={cn('flex', isUser ? 'justify-end' : 'justify-start')}>
      <div
        className={cn(
          'max-w-[80%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed break-words',
          isUser
            ? 'bg-[#2D6BE4] text-white rounded-br-sm'
            : 'bg-[#F2F0EB] text-[#1A1A1A] rounded-bl-sm'
        )}
      >
        {message.content}
      </div>
    </div>
  )
}
