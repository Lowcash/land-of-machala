'use client'

import {
  Activity,
  Brain,
  Droplet,
  Heart,
  Shield,
  Sparkles,
  Sword,
  Swords,
  Target,
  User,
  Wand2,
  Wind,
  Zap,
} from 'lucide-react'
import { useTranslations } from 'next-intl'

import { Card } from '@/components/ui/core/card'
import { Stack } from '@/components/ui/core/stack'

import { SelectionDetails } from './selection-details'
import { SelectionItem } from './selection-item'

const ICON_MAP = {
  User,
  Shield,
  Zap,
  Swords,
  Target,
  Sparkles,
  Sword,
  Wand2,
  Heart,
  Droplet,
  Wind,
  Brain,
  Activity,
} as const

interface SelectionBoxProps {
  title: string
  items: any[]
  selectedId: string | null
  onSelect: (id: string) => void
  type: 'race' | 'class'
}

export function SelectionBox({ title, items, selectedId, onSelect, type }: SelectionBoxProps) {
  const t = useTranslations('Game')
  const selectedItem = items.find((i) => i.id === selectedId)
  const translationKey = type === 'race' ? 'Races' : 'Classes'

  return (
    <Card variant="primary" p="none" direction="col" fullHeight>
      <Card.Header align="center" justify="center" p="md">
        <Card.Title align="center">{title}</Card.Title>
      </Card.Header>

      <Card.Content p="md" gap="md" display="flex" direction="col">
        <Stack display="grid" cols="3" gap="xs" md={{ gap: 'sm' }}>
          {items.map((item) => {
            const Icon = (ICON_MAP as any)[item.icon] || User
            const isSelected = selectedId === item.id

            return (
              <SelectionItem
                key={item.id}
                name={t(`${translationKey}.${item.id}.name`)}
                icon={Icon}
                isSelected={isSelected}
                onClick={() => onSelect(item.id)}
              />
            )
          })}
        </Stack>

        {selectedItem && <SelectionDetails item={selectedItem} type={type} />}
      </Card.Content>
    </Card>
  )
}
