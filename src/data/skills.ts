export interface SkillCard {
  title: string
  items: string[]
}

export const skillCards: SkillCard[] = [
  {
    title: 'AI & Automation',
    items: ['Prompting', 'Generative AI', 'Data Annotation', 'Workflow Automation'],
  },
  {
    title: 'Execution & Stakeholders',
    items: ['Communication', 'Problem-Solving', 'Community & User Handling'],
  },
  {
    title: 'Tools',
    items: ['VS Code', 'Claude', 'LangGraph (RAG)', 'Excel', 'SQL', 'Google Analytics'],
  },
]
