import { motion } from 'framer-motion'
import { Button } from '@/components/ui/Button'

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
    },
  },
}

export function Hero() {
  const handleScroll = (id: string) => {
    const element = document.querySelector(id)
    element?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="home" className="min-h-svh flex items-center justify-center px-6 pt-16 bg-white">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="text-center max-w-3xl"
      >
        <motion.h1 variants={itemVariants} className="text-5xl md:text-6xl font-bold text-[#1A1A1A] mb-3">
          Faisal
        </motion.h1>

        <motion.p variants={itemVariants} className="text-sm md:text-base text-[#6B6375] mb-8 font-medium">
          Trying to understand how things work—and how to make them work better.
        </motion.p>

        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            variant="primary"
            onClick={() => handleScroll('#projects')}
            className="text-base px-8 py-3 rounded-lg"
          >
            View Projects
          </Button>
          <Button
            variant="ghost"
            onClick={() => handleScroll('#contact')}
            className="text-base px-8 py-3 rounded-lg"
          >
            Contact Me
          </Button>
        </motion.div>
      </motion.div>
    </section>
  )
}
