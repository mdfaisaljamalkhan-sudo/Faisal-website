import { SectionWrapper } from '@/components/ui/SectionWrapper'
import { AVATAR_BASE64 } from '@/lib/avatar'

export function About() {
  return (
    <SectionWrapper id="about">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-6">My Story</h2>
          <div className="space-y-4 text-[#6B6375] leading-relaxed">
            <p>
              I started with Political Science to understand how systems work—across governments and organizations.
            </p>
            <p>
              This led me to ORMAS and Teach for India, working on policy and real-world problem-solving.
            </p>
            <p>
              At Amazon, I worked as a Machine Learning Data Associate and Risk & Compliance Senior Associate, gaining exposure to data-driven systems.
            </p>
            <p>
              Currently pursuing a PGPM at Great Lakes Institute of Management, Gurgaon, I'm learning to simplify business problems and design scalable solutions.
            </p>
          </div>
        </div>

        <div className="flex items-center justify-center">
          <img
            src={`data:image/jpeg;base64,${AVATAR_BASE64}`}
            alt="Faisal"
            className="w-72 h-72 rounded-2xl object-cover shadow-lg"
          />
        </div>
      </div>
    </SectionWrapper>
  )
}
