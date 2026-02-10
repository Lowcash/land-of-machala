import { Scroll, User, Users, Sparkles } from 'lucide-react'

/**
 * Icon prefabs with fixed styling to ensure design consistency.
 * These do not accept className as per project rules.
 */

export function UserIcon() {
  return <User className="h-4 w-4 text-(--color-gold)" />
}

export function UsersIcon() {
  return <Users className="h-5 w-5 text-(--color-gold)" />
}

export function ScrollIcon() {
  return <Scroll className="h-5 w-5 text-(--color-gold)" />
}

export function SparklesIcon() {
  return <Sparkles className="h-3 w-3 text-(--color-secondary)" />
}
