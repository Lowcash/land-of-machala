import type { LucideIcon } from 'lucide-react'
import type { InputHTMLAttributes } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  icon?: LucideIcon
  error?: string
}

export function Input({ label, icon: Icon, error, className = '', id, ...props }: InputProps) {
  const inputId = id || props.name || label.toLowerCase().replace(/\s+/g, '-')

  return (
    <div className="space-y-2">
      <label htmlFor={inputId} className="text-game-gold/80 block text-sm font-medium">
        {label}
      </label>
      <div className="group relative">
        {Icon && (
          <div className="text-game-gold/50 group-focus-within:text-game-gold absolute top-1/2 left-3 -translate-y-1/2 transition-colors">
            <Icon className="h-5 w-5" />
          </div>
        )}
        <input
          id={inputId}
          className={`bg-game-wood-dark/50 text-game-gold placeholder:text-game-gold/30 focus:border-game-gold w-full rounded border px-4 py-3 transition-colors focus:outline-none ${Icon ? 'pl-10' : ''} ${error ? 'border-game-danger' : 'border-game-gold/30'} ${className} `}
          {...props}
        />
      </div>
      {error && (
        <p className="text-game-danger animate-in slide-in-from-top-1 fade-in text-sm">{error}</p>
      )}
    </div>
  )
}
