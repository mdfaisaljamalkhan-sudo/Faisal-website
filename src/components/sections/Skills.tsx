import { useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { SectionWrapper } from '@/components/ui/SectionWrapper'
import { skillCards } from '@/data/skills'

const cardVariants = {
  hidden: { opacity: 0, x: 20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.4 } },
  exit: { opacity: 0, x: -20, transition: { duration: 0.4 } },
}

export function Skills() {
  const [currentCard, setCurrentCard] = useState(0)

  const nextCard = () => setCurrentCard((prev) => (prev + 1) % skillCards.length)
  const prevCard = () => setCurrentCard((prev) => (prev - 1 + skillCards.length) % skillCards.length)

  const card = skillCards[currentCard]

  return (
    <SectionWrapper id="skills">
      <div className="mb-8">
        <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-2">Skills & Tools</h2>
        <p className="text-[#6B6375]">What I work with</p>
      </div>

      <div className="w-full bg-gradient-to-b from-[#FAF9F6] to-[#F2F0EB] rounded-lg overflow-hidden">
        {/* Card Display */}
        <div className="relative min-h-96 flex items-center justify-center p-12">
          <motion.div
            key={currentCard}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="w-full max-w-2xl"
          >
            <div className="bg-white border-2 border-[#2D6BE4] rounded-lg p-12">
              <h3 className="text-3xl font-bold text-[#2D6BE4] mb-8">{card.title}</h3>
              <div className="flex flex-wrap gap-3">
                {card.items.map((item) => (
                  <span
                    key={item}
                    className="inline-block bg-[#2D6BE4]/10 text-[#2D6BE4] px-4 py-2 rounded-lg font-medium"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between p-6 border-t border-[#2D6BE4]/20 bg-[#FAF9F6]/80">
          <button
            onClick={prevCard}
            className="p-3 hover:bg-[#2D6BE4]/10 rounded-lg transition-colors text-[#2D6BE4] disabled:opacity-30"
            disabled={currentCard === 0}
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <div className="flex items-center gap-2">
            {skillCards.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentCard(i)}
                className={`w-2 h-2 rounded-full transition-all ${
                  i === currentCard ? 'bg-[#2D6BE4] w-8' : 'bg-[#2D6BE4]/30'
                }`}
              />
            ))}
          </div>

          <button
            onClick={nextCard}
            className="p-3 hover:bg-[#2D6BE4]/10 rounded-lg transition-colors text-[#2D6BE4] disabled:opacity-30"
            disabled={currentCard === skillCards.length - 1}
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        {/* Card Counter */}
        <div className="text-center py-4 text-[#2D6BE4]/70 text-sm bg-[#FAF9F6]/80 border-t border-[#2D6BE4]/20">
          Card {currentCard + 1} of {skillCards.length}
        </div>
      </div>
    </SectionWrapper>
  )
}
