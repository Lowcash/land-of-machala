import { cn } from '@/lib/utils'
import type { LucideIcon } from 'lucide-react'
import type { ButtonHTMLAttributes } from 'react'

interface GameButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost' | 'outline'
  size?: 'sm' | 'md' | 'lg' | 'icon'
  icon?: LucideIcon
  isLoading?: boolean
}

export function GameButton({
  className,
  variant = 'primary',
  size = 'md',
  icon: Icon,
  isLoading,
  children,
  ...props
}: GameButtonProps) {
  const variants = {
    primary:
      'border-[#8b6f47] bg-black/60 text-[#f5e6d3] hover:bg-[#8b6f47]/20 hover:text-[#ffd700] hover:border-[#ffd700]',
    secondary:
      'border-slate-600 bg-slate-900/60 text-slate-300 hover:bg-slate-800 hover:text-white',
    danger:
      'border-red-900/50 bg-red-950/30 text-red-200 hover:bg-red-900/50 hover:border-red-500 hover:text-red-100',
    ghost:
      'border-transparent bg-transparent text-[#8b7355] hover:text-[#ffd700] hover:bg-black/20',
    outline: 'bg-transparent hover:bg-white/5',
  }

  const sizes = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base',
    icon: 'p-2',
  }

  return (
    <button
      className={cn(
        'relative flex items-center justify-center gap-2 rounded border transition-all duration-200',
        'font-bold tracking-wide uppercase disabled:cursor-not-allowed disabled:opacity-50',
        variants[variant],
        sizes[size],
        className
      )}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading ? (
        <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
      ) : Icon ? (
        <Icon className={cn('h-4 w-4', size === 'lg' && 'h-5 w-5')} />
      ) : null}
      {children}
    </button>
  )
}
