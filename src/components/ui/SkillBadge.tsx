import { cn } from '@/lib/utils'

interface SkillBadgeProps {
  text: string
  className?: string
}

export function SkillBadge({ text, className }: SkillBadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex px-3 py-1.5 bg-[#EEF3FD] text-[#2D6BE4] rounded-full text-sm font-medium transition-colors hover:bg-[#2D6BE4] hover:text-white',
        className
      )}
    >
      {text}
    </span>
  )
}
