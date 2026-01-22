import type { LucideIcon } from 'lucide-react'
import { Loader2 } from 'lucide-react'
import type { ButtonHTMLAttributes, ReactNode } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  isLoading?: boolean
  variant?: 'primary' | 'secondary' | 'ghost'
  icon?: LucideIcon
}

export function Button({
  children,
  isLoading,
  className = '',
  disabled,
  variant = 'primary',
  icon: Icon,
  ...props
}: ButtonProps) {
  const baseStyles =
    'w-full font-bold py-3 px-6 rounded transition-all flex items-center justify-center gap-2 relative overflow-hidden'

  const variants = {
    primary:
      'bg-gradient-to-r from-game-gold-muted to-game-gold text-game-wood-dark hover:brightness-110 active:scale-[0.98] shadow-lg shadow-black/20',
    secondary:
      'bg-game-wood-light/20 border border-game-gold/30 text-game-gold hover:bg-game-wood-light/30 active:scale-[0.98]',
    ghost: 'bg-transparent text-game-gold/70 hover:text-game-gold hover:bg-game-gold/5',
  }

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${isLoading || disabled ? 'cursor-not-allowed opacity-70' : ''} ${className}`}
      disabled={isLoading || disabled}
      {...props}
    >
      {isLoading && <Loader2 className="h-5 w-5 animate-spin" />}
      {children}
    </button>
  )
}
