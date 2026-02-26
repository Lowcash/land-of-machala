import { NarrativeCard } from '@/components/ui/prefabs/narrative/narrative-card'

import { CharacterNameInput } from './character-name-input'

interface CharacterNameCardProps {
  name: string
  label: string
  placeholder: string
  onChange: (name: string) => void
}

export function CharacterNameCard({ name, label, placeholder, onChange }: CharacterNameCardProps) {
  return (
    <NarrativeCard variant="subtle">
      <NarrativeCard.Header align="center" justify="center">
        <NarrativeCard.Title align="center" variant="large">
          {label}
        </NarrativeCard.Title>
      </NarrativeCard.Header>

      <NarrativeCard.Content>
        <CharacterNameInput name={name} placeholder={placeholder} onChange={onChange} />
      </NarrativeCard.Content>
    </NarrativeCard>
  )
}
