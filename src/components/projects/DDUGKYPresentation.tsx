import { motion } from 'framer-motion'
import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

const performanceData = [
  { month: 'FY 2016-17', training_rate: 65, placement_rate: 52 },
  { month: 'FY 2017-18', training_rate: 73, placement_rate: 70 },
]

const targetData = [
  { category: 'Training', target: 3000, achievement: 2558 },
  { category: 'Placement', target: 2100, achievement: 1450 },
]

const strategicRecs = [
  { title: 'Capacity Building', impact: 'Very High', description: 'Enhanced skill assessment and trainer training programs' },
  { title: 'Market Linkage', impact: 'High', description: 'Stronger partnership ecosystem with industry players' },
  { title: 'Digital Integration', impact: 'High', description: 'Real-time monitoring and placement tracking systems' },
  { title: 'Community Engagement', impact: 'Medium', description: 'Sustainable livelihood development beyond training' },
]

const slideVariants = {
  hidden: { opacity: 0, x: 20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.4 } },
  exit: { opacity: 0, x: -20, transition: { duration: 0.4 } },
}

export function DDUGKYPresentation() {
  const [currentSlide, setCurrentSlide] = useState(0)

  const slides = [
    // Slide 1: Title
    (
      <motion.div key="slide-1" variants={slideVariants} initial="hidden" animate="visible" exit="exit" className="min-h-screen bg-white p-12 flex flex-col justify-center">
        <div className="max-w-2xl">
          <h1 className="text-5xl font-bold text-[#1A1A1A] mb-6">Scaling Rural Skill Development</h1>
          <h2 className="text-2xl text-[#2D6BE4] font-semibold mb-8">Strategic Analysis of DDU-GKY Program Optimization</h2>
          <div className="space-y-3 text-[#6B6375]">
            <p><span className="font-semibold">Research Institution:</span> Department of Panchayati Raj, Government of Odisha</p>
            <p><span className="font-semibold">Focus Area:</span> Rural livelihood programs and government initiatives</p>
            <p><span className="font-semibold">Objective:</span> Analysis and operational recommendations for skill development programs</p>
          </div>
        </div>
      </motion.div>
    ),

    // Slide 2: Executive Summary
    (
      <motion.div key="slide-2" variants={slideVariants} initial="hidden" animate="visible" exit="exit" className="min-h-screen bg-gradient-to-b from-[#F2F0EB] to-[#EEF3FD] p-12 flex flex-col justify-center">
        <h1 className="text-4xl font-bold text-[#2D6BE4] mb-12">Executive Summary</h1>
        <div className="grid grid-cols-3 gap-6 mb-12">
          <div className="bg-gradient-to-br from-[#EEF3FD] to-[#F2F0EB] p-8 rounded-xl border border-[#E8E5E0]">
            <div className="text-4xl font-bold text-[#2D6BE4] mb-2">2,558</div>
            <p className="text-[#6B6375] font-medium">Total Trained</p>
          </div>
          <div className="bg-gradient-to-br from-[#EEF3FD] to-[#F2F0EB] p-8 rounded-xl border border-[#E8E5E0]">
            <div className="text-4xl font-bold text-[#2560cc] mb-2">1,450</div>
            <p className="text-[#6B6375] font-medium">Total Placed</p>
          </div>
          <div className="bg-gradient-to-br from-[#EEF3FD] to-[#F2F0EB] p-8 rounded-xl border border-[#E8E5E0]">
            <div className="text-4xl font-bold text-[#2D6BE4] mb-2">70.5%</div>
            <p className="text-[#6B6375] font-medium">Avg Placement Rate</p>
          </div>
        </div>
        <div className="space-y-4 text-[#2D6BE4]/80 leading-relaxed">
          <p>The DDU-GKY program demonstrates significant potential in addressing rural unemployment through skill development and placement assistance. Analysis of field research across multiple program sites reveals opportunities for operational optimization and enhanced impact.</p>
        </div>
      </motion.div>
    ),

    // Slide 3: Methodology & Program Overview
    (
      <motion.div key="slide-3" variants={slideVariants} initial="hidden" animate="visible" exit="exit" className="min-h-screen bg-gradient-to-b from-[#F2F0EB] to-[#EEF3FD] p-12 flex flex-col justify-center">
        <h1 className="text-4xl font-bold text-[#2D6BE4] mb-12">Methodology & Program Flow</h1>

        {/* Program Flow */}
        <div className="mb-12">
          <h3 className="text-lg font-semibold text-[#2D6BE4] mb-6">7-Step Skill Development Pipeline</h3>
          <div className="flex gap-2 justify-between items-stretch">
            {['Enrollment', 'Assessment', 'Training', 'Certification', 'Job Prep', 'Placement', 'Retention'].map((step, i) => (
              <div key={step} className="flex-1">
                <div className="bg-gradient-to-r from-[#2D6BE4] to-[#2560cc] text-[#FAF9F6] p-4 rounded-lg text-center font-bold h-20 flex items-center justify-center text-sm">
                  {step}
                </div>
                {i < 6 && <div className="text-2xl text-[#2D6BE4] text-center font-light">→</div>}
              </div>
            ))}
          </div>
        </div>

        {/* Research Highlights */}
        <div>
          <h3 className="text-lg font-semibold text-[#2560cc] mb-6">Field Research Conducted</h3>
          <div className="grid grid-cols-2 gap-4">
            {['Nemalo Camp', 'Garudagaon Camp', 'PIA Ozone Pharmaceuticals', 'PIA ASMACS'].map((site) => (
              <div key={site} className="bg-[#F2F0EB] p-6 rounded-lg border border-[#2D6BE4]/30">
                <div className="w-8 h-8 bg-gradient-to-r from-[#2D6BE4] to-[#2560cc] rounded-lg mb-3 flex items-center justify-center text-white font-bold text-sm">✓</div>
                <p className="text-[#2D6BE4] font-medium">{site}</p>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    ),

    // Slide 4: Performance Analytics
    (
      <motion.div key="slide-4" variants={slideVariants} initial="hidden" animate="visible" exit="exit" className="min-h-screen bg-gradient-to-b from-[#F2F0EB] to-[#EEF3FD] p-12 flex flex-col justify-center">
        <h1 className="text-4xl font-bold text-[#2D6BE4] mb-12">Performance Analytics</h1>

        <div className="grid grid-cols-2 gap-8">
          {/* Achievement Trend */}
          <div className="bg-[#F2F0EB]/50 p-8 rounded-xl border border-[#2D6BE4]/20">
            <h3 className="text-lg font-semibold text-[#2D6BE4] mb-6">Achievement Rate Trend</h3>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#2D6BE430" />
                <XAxis dataKey="month" stroke="#2D6BE4" />
                <YAxis stroke="#2D6BE4" />
                <Tooltip contentStyle={{ backgroundColor: '#F2F0EB', border: '1px solid #2D6BE4', color: '#2D6BE4' }} />
                <Legend />
                <Line type="monotone" dataKey="training_rate" stroke="#2D6BE4" strokeWidth={2} name="Training Rate %" />
                <Line type="monotone" dataKey="placement_rate" stroke="#2560cc" strokeWidth={2} name="Placement Rate %" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Target vs Achievement */}
          <div className="bg-[#F2F0EB]/50 p-8 rounded-xl border border-[#2D6BE4]/20">
            <h3 className="text-lg font-semibold text-[#2D6BE4] mb-6">Target vs Achievement</h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={targetData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#2D6BE430" />
                <XAxis dataKey="category" stroke="#2D6BE4" />
                <YAxis stroke="#2D6BE4" />
                <Tooltip contentStyle={{ backgroundColor: '#F2F0EB', border: '1px solid #2D6BE4', color: '#2D6BE4' }} />
                <Legend />
                <Bar dataKey="target" fill="#2560cc" name="Target" />
                <Bar dataKey="achievement" fill="#2D6BE4" name="Achievement" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </motion.div>
    ),

    // Slide 5: Key Findings
    (
      <motion.div key="slide-5" variants={slideVariants} initial="hidden" animate="visible" exit="exit" className="min-h-screen bg-gradient-to-b from-[#F2F0EB] to-[#EEF3FD] p-12 flex flex-col justify-center">
        <h1 className="text-4xl font-bold text-[#2D6BE4] mb-12">Key Findings & Insights</h1>

        <div className="space-y-6">
          <div className="bg-[#F2F0EB]/60 p-8 rounded-xl border-l-4 border-[#2D6BE4]">
            <h3 className="text-lg font-bold text-[#2560cc] mb-2">Skill-Market Alignment Gap</h3>
            <p className="text-[#2D6BE4]/80">Training modules require stronger alignment with employer demand and evolving market needs</p>
          </div>

          <div className="bg-[#F2F0EB]/60 p-8 rounded-xl border-l-4 border-[#2560cc]">
            <h3 className="text-lg font-bold text-[#2D6BE4] mb-2">Post-Placement Support Shortage</h3>
            <p className="text-[#2D6BE4]/80">Limited resources for job retention and career advancement services post-placement</p>
          </div>

          <div className="bg-[#F2F0EB]/60 p-8 rounded-xl border-l-4 border-[#2D6BE4]">
            <h3 className="text-lg font-bold text-[#2560cc] mb-2">Data Infrastructure Constraints</h3>
            <p className="text-[#2D6BE4]/80">Manual tracking systems limit real-time visibility and evidence-based program adjustments</p>
          </div>

          <div className="bg-[#F2F0EB]/60 p-8 rounded-xl border-l-4 border-[#2560cc]">
            <h3 className="text-lg font-bold text-[#2D6BE4] mb-2">Strong Community Foundation</h3>
            <p className="text-[#2D6BE4]/80">Existing trust and engagement between camps and local communities is a significant asset</p>
          </div>
        </div>
      </motion.div>
    ),

    // Slide 6: Strategic Recommendations
    (
      <motion.div key="slide-6" variants={slideVariants} initial="hidden" animate="visible" exit="exit" className="min-h-screen bg-gradient-to-b from-[#F2F0EB] to-[#EEF3FD] p-12 flex flex-col justify-center">
        <h1 className="text-4xl font-bold text-[#2D6BE4] mb-12">Strategic Recommendations</h1>

        <div className="grid grid-cols-2 gap-6">
          {strategicRecs.map((rec, i) => {
            const impactColor = rec.impact === 'Very High' ? 'bg-gradient-to-r from-[#2D6BE4] to-[#2560cc]' : rec.impact === 'High' ? 'bg-[#2D6BE4]/20 text-[#2D6BE4]' : 'bg-[#F2F0EB] text-[#2560cc]'
            return (
              <div key={i} className="bg-[#F2F0EB]/60 border border-[#2D6BE4]/20 p-6 rounded-xl">
                <div className="flex items-start justify-between mb-3">
                  <h4 className="text-lg font-bold text-[#2D6BE4]">{rec.title}</h4>
                  <span className={`text-xs font-bold px-2 py-1 rounded ${impactColor}`}>{rec.impact}</span>
                </div>
                <p className="text-[#2D6BE4]/70 text-sm leading-relaxed">{rec.description}</p>
              </div>
            )
          })}
        </div>
      </motion.div>
    ),

    // Slide 7: Call to Action
    (
      <motion.div key="slide-7" variants={slideVariants} initial="hidden" animate="visible" exit="exit" className="min-h-screen bg-gradient-to-br from-[#FAF9F6] to-[#F2F0EB] p-12 flex flex-col justify-center">
        <div className="max-w-2xl">
          <h1 className="text-4xl font-bold text-[#2D6BE4] mb-8">Implementation Roadmap</h1>

          <div className="space-y-6 mb-12">
            <div className="flex gap-4">
              <div className="w-12 h-12 bg-gradient-to-r from-[#2D6BE4] to-[#2560cc] text-[#FAF9F6] rounded-lg flex items-center justify-center font-bold flex-shrink-0">1</div>
              <div>
                <h3 className="font-bold text-[#2D6BE4] mb-1">Q1: Foundation</h3>
                <p className="text-[#2D6BE4]/70">Establish steering committee and baseline data collection</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-12 h-12 bg-gradient-to-r from-[#2560cc] to-[#2D6BE4] text-[#FAF9F6] rounded-lg flex items-center justify-center font-bold flex-shrink-0">2</div>
              <div>
                <h3 className="font-bold text-[#2560cc] mb-1">Q2: Build & Deploy</h3>
                <p className="text-[#2D6BE4]/70">Implement digital infrastructure and trainer capacity building</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-12 h-12 bg-gradient-to-r from-[#2D6BE4] to-[#2560cc] text-[#FAF9F6] rounded-lg flex items-center justify-center font-bold flex-shrink-0">3</div>
              <div>
                <h3 className="font-bold text-[#2D6BE4] mb-1">Q3-Q4: Monitor & Optimize</h3>
                <p className="text-[#2D6BE4]/70">Pilot programs, gather feedback, and refine based on learnings</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-[#F2F0EB] to-[#EEF3FD] border-2 border-[#2D6BE4] p-6 rounded-lg">
            <p className="text-[#2D6BE4] font-semibold mb-2">Expected Impact:</p>
            <p className="text-[#2D6BE4]/80">15-20% improvement in placement rates, enhanced career progression, and sustainable livelihood outcomes for rural communities.</p>
          </div>
        </div>
      </motion.div>
    ),
  ]

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length)
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)

  return (
    <div className="w-full bg-gradient-to-b from-[#FAF9F6] to-[#F2F0EB]">
      {/* Slides */}
      <div className="relative">
        {slides[currentSlide]}
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between p-6 border-t border-[#2D6BE4]/20 bg-[#FAF9F6]/80">
        <button
          onClick={prevSlide}
          className="p-3 hover:bg-[#2D6BE4]/10 rounded-lg transition-colors text-[#2D6BE4] disabled:opacity-30"
          disabled={currentSlide === 0}
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <div className="flex items-center gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentSlide(i)}
              className={`w-2 h-2 rounded-full transition-all ${i === currentSlide ? 'bg-[#2D6BE4] w-8' : 'bg-[#2D6BE4]/30'}`}
            />
          ))}
        </div>

        <button
          onClick={nextSlide}
          className="p-3 hover:bg-[#2560cc]/10 rounded-lg transition-colors text-[#2560cc] disabled:opacity-30"
          disabled={currentSlide === slides.length - 1}
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* Slide Counter */}
      <div className="text-center py-4 text-[#2D6BE4]/70 text-sm bg-[#FAF9F6]/80 border-t border-[#2D6BE4]/20">
        Slide {currentSlide + 1} of {slides.length}
      </div>
    </div>
  )
}
