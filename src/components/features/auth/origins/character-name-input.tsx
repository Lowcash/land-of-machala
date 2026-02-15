'use client'

import { Input } from '@/components/ui/forms/input'

interface CharacterNameInputProps {
  name: string
  placeholder: string
  onChange: (name: string) => void
}

/**
 * Client-side input for character name in the creation flow.
 */
export function CharacterNameInput({ name, placeholder, onChange }: CharacterNameInputProps) {
  return (
    <Input
      value={name}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
      align="center"
    />
  )
}
