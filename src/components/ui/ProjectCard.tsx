import type { Project } from '@/data/projects'
import { SkillBadge } from './SkillBadge'
import { ExternalLink, Code, Sparkles } from 'lucide-react'

interface ProjectCardProps {
  project: Project
  onClickModal?: () => void
}

export function ProjectCard({ project, onClickModal }: ProjectCardProps) {
  const isLive = project.status === 'live'
  const isComingSoon = project.status === 'coming-soon'
  const isResearch = project.status === 'research'

  if (isResearch) {
    return (
      <button
        onClick={onClickModal}
        className="p-6 border-2 border-[#2D6BE4] rounded-xl bg-gradient-to-br from-[#EEF3FD] to-[#F2F0EB] transition-all hover:-translate-y-1 hover:shadow-lg hover:border-opacity-100 w-full text-left group"
      >
        <div className="mb-3 inline-block">
          <span className="text-xs font-semibold text-[#2D6BE4] bg-white px-3 py-1 rounded-full">
            Research Project
          </span>
        </div>
        <h3 className="text-lg font-semibold text-[#1A1A1A] mb-2 group-hover:text-[#2D6BE4] transition-colors">{project.title}</h3>
        <p className="text-sm text-[#6B6375] mb-4 leading-relaxed">{project.description}</p>

        {project.stack.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {project.stack.map((tech) => (
              <SkillBadge key={tech} text={tech} />
            ))}
          </div>
        )}

        <div className="inline-block mt-4 px-4 py-2 bg-[#2D6BE4] text-white rounded-lg text-sm font-medium group-hover:bg-[#2560cc] transition-colors">
          View Presentation →
        </div>
      </button>
    )
  }

  if (isComingSoon) {
    return (
      <button
        onClick={onClickModal}
        className="p-6 border-2 border-dashed border-[#E8E5E0] rounded-xl opacity-60 transition-all hover:opacity-100 hover:-translate-y-1 hover:shadow-lg w-full text-center flex flex-col items-center justify-center min-h-[400px]"
      >
        <img
          src="/assets/avatar.jpg"
          alt="Coming Soon"
          className="w-32 h-32 rounded-full mb-4 object-cover"
        />
        <h3 className="text-lg font-semibold text-[#1A1A1A] mb-2">{project.title}</h3>
        <p className="text-sm italic text-[#A09AAB] mb-4">{project.description}</p>
        <div className="inline-block">
          <span className="text-xs font-medium text-[#2D6BE4] bg-[#EEF3FD] px-3 py-1 rounded-full">
            Coming Soon
          </span>
        </div>
      </button>
    )
  }

  return (
    <div
      className={`p-6 border rounded-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${
        isLive ? (project.featured ? 'border-[#2D6BE4] ring-2 ring-[#2D6BE4] ring-opacity-30' : 'border-[#E8E5E0]') : 'border-[#E8E5E0]'
      } bg-white`}
    >
      {project.featured && (
        <div className="mb-3 inline-block">
          <span className="text-xs font-semibold text-[#2D6BE4] bg-[#EEF3FD] px-3 py-1 rounded-full">
            Featured
          </span>
        </div>
      )}
      <h3 className="text-xl font-semibold text-[#1A1A1A] mb-3">{project.title}</h3>
      <p className="text-[#6B6375] text-sm mb-4 leading-relaxed">{project.description}</p>

      {project.stack.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {project.stack.map((tech) => (
            <SkillBadge key={tech} text={tech} />
          ))}
        </div>
      )}

      {isLive && (project.repoUrl || project.liveUrl) && (
        <div className="flex gap-3 pt-4 border-t border-[#E8E5E0]">
          {project.repoUrl && (
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg hover:bg-[#F2F0EB] transition-colors text-[#1A1A1A]"
              aria-label="View repository"
            >
              <Code className="w-5 h-5" />
            </a>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg hover:bg-[#F2F0EB] transition-colors text-[#1A1A1A]"
              aria-label="View live site"
            >
              <ExternalLink className="w-5 h-5" />
            </a>
          )}
        </div>
      )}
    </div>
  )
}
