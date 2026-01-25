'use client'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import type { LucideIcon } from 'lucide-react'

interface AuthInputProps {
  id: string
  label: string
  type: string
  value: string
  onChange: (value: string) => void
  placeholder: string
  icon: LucideIcon
  disabled?: boolean
  required?: boolean
  minLength?: number
  autoComplete?: string
}

export function AuthInput({
  id,
  label,
  type,
  value,
  onChange,
  placeholder,
  icon: Icon,
  disabled,
  required,
  minLength,
  autoComplete,
}: AuthInputProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id} className="text-game-gold/80">
        {label}
      </Label>
      <div className="group relative">
        <div className="text-game-gold/50 group-focus-within:text-game-gold absolute top-1/2 left-3 -translate-y-1/2 transition-colors">
          <Icon className="h-4 w-4" />
        </div>
        <Input
          id={id}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          minLength={minLength}
          autoComplete={autoComplete}
          className="font-fantasy text-game-gold placeholder:text-game-gold/30 border-game-gold/30 bg-game-wood-dark/50 focus-visible:border-game-gold pl-10 focus-visible:ring-0"
        />
      </div>
    </div>
  )
}
