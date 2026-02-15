'use client'

import {
  Activity,
  Brain,
  Droplet,
  Heart,
  LucideIcon,
  Shield,
  Skull,
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
import { ScrollArea } from '@/components/ui/core/scroll-area'
import { VStack } from '@/components/ui/core/stack'
import { Text } from '@/components/ui/core/typography'

import { SelectionItem } from './selection-item'
import { StatRow } from './stat-row'

const ICON_MAP: Record<string, LucideIcon> = {
  User,
  Shield,
  Zap,
  Swords,
  Target,
  Sparkles,
  Sword,
  Wand2,
  Skull,
  Heart,
  Droplet,
  Wind,
  Brain,
  Activity,
}

interface SelectionBoxProps {
  title: string
  items: any[]
  selectedId: string | null
  onSelect: (id: string) => void
  type: 'race' | 'class'
}

export function SelectionBox({ title, items, selectedId, onSelect, type }: SelectionBoxProps) {
  const t = useTranslations('Game')
  const ot = useTranslations('Auth.Origins.creation')

  const selectedItem = items.find((i) => i.id === selectedId)

  return (
    <Card variant="primary" p="none" fullHeight display="flex" direction="col">
      <Card.Header align="center" justify="center" p="md">
        <Card.Title align="center">{title}</Card.Title>
      </Card.Header>

      <Card.Content p="md" flex="1" gap="md" display="flex" direction="col" fullHeight>
        <div className="grid shrink-0 grid-cols-3 gap-1.5 sm:gap-2">
          {items.map((item) => {
            const Icon = ICON_MAP[item.icon] || User
            const isSelected = selectedId === item.id

            return (
              <SelectionItem
                key={item.id}
                name={t(`${type === 'race' ? 'Races' : 'Classes'}.${item.id}.name`)}
                icon={Icon}
                isSelected={isSelected}
                onClick={() => onSelect(item.id)}
              />
            )
          })}
        </div>

        {selectedItem && (
          <ScrollArea className="flex-1 rounded border border-(--color-secondary)/40 bg-black/60">
            <Text color="secondary" className="mb-2 text-[10px] leading-relaxed sm:text-xs">
              {t(`${type === 'race' ? 'Races' : 'Classes'}.${selectedItem.id}.description`)}
            </Text>

            <VStack gap="xs">
              <Text font="fantasy" color="gold" className="mb-1 text-[10px] sm:text-xs">
                {type === 'race' ? ot('raceBonuses') : ot('classBonuses')}
              </Text>

              <div className="grid grid-cols-2 gap-x-3 gap-y-1">
                {type === 'race' ? (
                  <>
                    <StatRow
                      compact
                      icon={Heart}
                      label="HP"
                      value={selectedItem.stats.hp}
                      iconColor="var(--color-stat-hp)"
                      labelColor="var(--color-secondary)"
                    />
                    <StatRow
                      compact
                      icon={Droplet}
                      label="MP"
                      value={selectedItem.stats.mana}
                      iconColor="var(--color-stat-mana)"
                      labelColor="var(--color-secondary)"
                    />
                    <StatRow
                      compact
                      icon={Sword}
                      label="Síla"
                      value={selectedItem.stats.strength}
                      iconColor="var(--color-stat-strength)"
                      labelColor="var(--color-secondary)"
                    />
                    <StatRow
                      compact
                      icon={Brain}
                      label="Intel."
                      value={selectedItem.stats.intelligence}
                      iconColor="var(--color-stat-intelligence)"
                      labelColor="var(--color-secondary)"
                    />
                    <StatRow
                      compact
                      icon={Wind}
                      label="Obrat."
                      value={selectedItem.stats.agility}
                      iconColor="var(--color-stat-agility)"
                      labelColor="var(--color-secondary)"
                    />
                    <StatRow
                      compact
                      icon={Activity}
                      label="Výdrž"
                      value={selectedItem.stats.stamina}
                      iconColor="var(--color-stat-stamina)"
                      labelColor="var(--color-secondary)"
                    />
                  </>
                ) : (
                  Object.entries(selectedItem.statMod).map(([stat, val]: [string, any]) => {
                    if (val === 0) return null
                    const Icon = ICON_MAP[stat.charAt(0).toUpperCase() + stat.slice(1)] || Activity
                    const isPositive = val > 0

                    return (
                      <StatRow
                        key={stat}
                        compact
                        icon={Icon}
                        label={stat.charAt(0).toUpperCase() + stat.slice(1)}
                        value={`${isPositive ? '+' : ''}${val}`}
                        iconColor="var(--color-gold)"
                        labelColor="var(--color-secondary)"
                      />
                    )
                  })
                )}
              </div>

              <Text
                variant="muted"
                font="fantasy"
                className="mt-2 text-[9px] italic sm:text-[10px]"
              >
                {t(`${type === 'race' ? 'Races' : 'Classes'}.${selectedItem.id}.bonuses`)}
              </Text>
            </VStack>
          </ScrollArea>
        )}
      </Card.Content>
    </Card>
  )
}
