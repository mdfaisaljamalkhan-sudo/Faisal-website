import { useState } from 'react'
import { SectionWrapper } from '@/components/ui/SectionWrapper'
import { ProjectCard } from '@/components/ui/ProjectCard'
import { Modal } from '@/components/ui/Modal'
import { DDUGKYPresentation } from '@/components/projects/DDUGKYPresentation'
import { projects } from '@/data/projects'

export function Projects() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const regularProjects = projects.filter((p) => p.id !== 'ddu-gky')
  const dduGkyProject = projects.find((p) => p.id === 'ddu-gky')

  return (
    <SectionWrapper id="projects">
      <div className="mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-3">Projects</h2>
        <p className="text-[#6B6375]">Showcasing my research and professional work</p>
      </div>

      {/* Main Projects Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {regularProjects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}

        {/* DDU-GKY as Expandable Card */}
        {dduGkyProject && (
          <ProjectCard
            key={dduGkyProject.id}
            project={dduGkyProject}
            onClickModal={() => setIsModalOpen(true)}
          />
        )}
      </div>

      {/* DDU-GKY Presentation Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Scaling Rural Skill Development"
      >
        <DDUGKYPresentation />
      </Modal>
    </SectionWrapper>
  )
}
