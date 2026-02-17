import { Card } from '@/components/ui/core/card'

import { CharacterNameInput } from './character-name-input'

interface CharacterNameCardProps {
  name: string
  label: string
  placeholder: string
  onChange: (name: string) => void
}

export function CharacterNameCard({ name, label, placeholder, onChange }: CharacterNameCardProps) {
  return (
    <Card p="md" variant="subtle">
      <Card.Header align="center" justify="center">
        <Card.Title align="center" variant="large">
          {label}
        </Card.Title>
      </Card.Header>

      <Card.Content>
        <CharacterNameInput name={name} placeholder={placeholder} onChange={onChange} />
      </Card.Content>
    </Card>
  )
}
