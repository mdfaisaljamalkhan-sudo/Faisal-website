export type ProjectStatus = 'live' | 'wip' | 'coming-soon' | 'research'

export interface Project {
  id: string
  title: string
  description: string
  stack: string[]
  status: ProjectStatus
  repoUrl?: string
  liveUrl?: string
  featured?: boolean
}

export const projects: Project[] = [
  {
    id: 'subadash',
    title: 'SubaDash',
    description:
      'Full-stack document management and analytics dashboard with AI-powered insights, subscription billing, and real-time data visualization. Built for users who need to manage documents, visualize data, and leverage AI for intelligent analysis.',
    stack: [
      'React 19',
      'TypeScript',
      'FastAPI',
      'Tailwind CSS',
      'Zustand',
      'TanStack Query',
      'Recharts',
      'Framer Motion',
      'SQLAlchemy',
      'Stripe',
      'Anthropic API',
    ],
    status: 'live',
    repoUrl: 'https://github.com/yourusername/subadash',
    liveUrl: 'https://subadash.example.com',
    featured: true,
  },
  {
    id: 'ddu-gky',
    title: 'Scaling Rural Skill Development',
    description:
      'Strategic analysis and operational optimization of India\'s DDU-GKY (Deen Dayal Upadhyaya Grameen Kaushalya Yojana) program. Research-driven insights on rural skill development, program performance analytics, and policy recommendations for scaling employment-linked training initiatives.',
    stack: [
      'Policy Research',
      'Data Analysis',
      'Field Research',
      'Strategic Planning',
      'Program Evaluation',
      'Government Relations',
    ],
    status: 'research',
    featured: false,
  },
]
