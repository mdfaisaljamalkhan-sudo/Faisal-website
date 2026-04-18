import { cn } from '@/lib/utils'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'ghost'
  size?: 'sm' | 'md'
}

export function Button({ variant = 'primary', size = 'md', className, ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        'font-medium transition-all duration-200',
        size === 'sm' && 'px-3 py-1.5 text-sm',
        size === 'md' && 'px-6 py-2.5 text-base',
        variant === 'primary' &&
          'bg-[#2D6BE4] text-white rounded-lg hover:bg-[#2560cc] active:scale-95',
        variant === 'ghost' &&
          'text-[#2D6BE4] border border-[#E8E5E0] rounded-lg hover:bg-[#EEF3FD] active:scale-95',
        className
      )}
      {...props}
    />
  )
}
