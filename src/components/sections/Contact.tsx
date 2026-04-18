import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { SectionWrapper } from '@/components/ui/SectionWrapper'
import { Copy, Code, Briefcase, Mail, MessageCircle, Phone } from 'lucide-react'

export function Contact() {
  const [copied, setCopied] = useState(false)
  const email = 'mdfaisaljamalkhan@gmail.com'
  const phoneNumber = '7205598181'
  const whatsappNumber = '917205598181'

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <SectionWrapper id="contact">
      <div className="text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-4">Let's Connect</h2>
        <p className="text-[#6B6375] mb-10">
          I'm always interested in hearing about new projects and opportunities.
        </p>

        {/* Email */}
        <div className="mb-6">
          <div className="flex items-center justify-center gap-3 p-4 bg-[#F2F0EB] rounded-lg inline-block">
            <Mail className="w-5 h-5 text-[#2D6BE4]" />
            <a
              href={`mailto:${email}`}
              className="text-[#2D6BE4] font-medium hover:text-[#2560cc] transition-colors"
            >
              {email}
            </a>
            <button
              onClick={handleCopyEmail}
              className="p-1.5 hover:bg-white rounded transition-colors text-[#6B6375]"
              aria-label="Copy email"
            >
              <Copy className="w-4 h-4" />
            </button>
            <AnimatePresence>
              {copied && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-xs text-green-600 font-medium ml-2"
                >
                  Copied!
                </motion.span>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Phone Number */}
        <div className="mb-10">
          <div className="flex items-center justify-center gap-3 p-4 bg-[#F2F0EB] rounded-lg inline-block">
            <Phone className="w-5 h-5 text-[#2D6BE4]" />
            <a
              href={`tel:+91${phoneNumber}`}
              className="text-[#2D6BE4] font-medium hover:text-[#2560cc] transition-colors"
            >
              +91 {phoneNumber}
            </a>
          </div>
        </div>

        {/* Social Links */}
        <div className="flex justify-center gap-6">
          <a
            href="https://github.com/mdfaisaljamalkhan-sudo"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 bg-[#F2F0EB] rounded-lg hover:bg-[#2D6BE4] hover:text-white text-[#1A1A1A] transition-all duration-200"
            aria-label="GitHub"
            title="GitHub"
          >
            <Code className="w-5 h-5" />
          </a>
          <a
            href="https://www.linkedin.com/in/faisal-j-22b6a910a?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 bg-[#F2F0EB] rounded-lg hover:bg-[#2D6BE4] hover:text-white text-[#1A1A1A] transition-all duration-200"
            aria-label="LinkedIn"
            title="LinkedIn"
          >
            <Briefcase className="w-5 h-5" />
          </a>
          <a
            href={`https://wa.me/${whatsappNumber}`}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 bg-[#F2F0EB] rounded-lg hover:bg-[#25D366] hover:text-white text-[#1A1A1A] transition-all duration-200"
            aria-label="WhatsApp"
            title="Message on WhatsApp"
          >
            <MessageCircle className="w-5 h-5" />
          </a>
        </div>
      </div>
    </SectionWrapper>
  )
}
