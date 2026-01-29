import { type ComponentProps } from 'react'

import type { LucideIcon } from 'lucide-react'

import { cn } from '@/lib/utils'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

interface AuthInputProps extends ComponentProps<'input'> {
  id: string
  label: string
  icon: LucideIcon
  error?: string
  ref?: React.Ref<HTMLInputElement>
}

export function AuthInput({
  id,
  label,
  icon: Icon,
  error,
  className,
  ref,
  ...props
}: AuthInputProps) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between">
        <Label htmlFor={id} className="text-game-gold/80">
          {label}
        </Label>
        {error && <span className="text-xs text-red-500">{error}</span>}
      </div>
      <div className="group relative">
        <div className="text-game-gold/50 group-focus-within:text-game-gold absolute top-1/2 left-3 -translate-y-1/2 transition-colors">
          <Icon className="h-4 w-4" />
        </div>
        <Input
          id={id}
          ref={ref}
          {...props}
          className={cn(
            'font-fantasy bg-game-wood-dark/50 border-game-gold/30 text-game-gold placeholder:text-game-gold/30 focus-visible:border-game-gold pl-10 focus-visible:ring-0',
            error && 'border-red-500/50 focus-visible:border-red-500',
            className
          )}
        />
      </div>
    </div>
  )
}
