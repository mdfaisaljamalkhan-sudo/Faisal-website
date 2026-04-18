import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, X } from 'lucide-react'

interface ChatBubbleProps {
  isOpen: boolean
  onToggle: () => void
}

export function ChatBubble({ isOpen, onToggle }: ChatBubbleProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onToggle}
      className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-[#2D6BE4] text-white
                 rounded-full shadow-lg flex items-center justify-center
                 hover:bg-[#2560cc] transition-colors"
      aria-label={isOpen ? 'Close chat' : 'Open chat with Faisal\'s AI'}
    >
      <AnimatePresence mode="wait">
        {isOpen ? (
          <motion.div key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
            <X className="w-6 h-6" />
          </motion.div>
        ) : (
          <motion.div key="msg" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
            <MessageCircle className="w-6 h-6" />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  )
}
