'use client'

import { Activity, Brain, Droplet, Heart, Sword, Wind } from 'lucide-react'
import { useTranslations } from 'next-intl'

import { Card } from '@/components/ui/core/card'
import { ScrollArea } from '@/components/ui/core/scroll-area'
import { Stack, VStack } from '@/components/ui/core/stack'
import { Description, Label } from '@/components/ui/prefabs/typography/shared'
import { Divider } from '@/components/ui/shared/divider'

import { StatRow } from './stat-row'

interface SelectionDetailsProps {
  item: any
  type: 'race' | 'class'
}

export function SelectionDetails({ item, type }: SelectionDetailsProps) {
  const t = useTranslations('Game')
  const ot = useTranslations('Auth.Origins.creation')

  const translationKey = type === 'race' ? 'Races' : 'Classes'
  const bonusLabel = type === 'race' ? ot('raceBonuses') : ot('classBonuses')

  return (
    <Card p="none" flex="1" minHeight="zero">
      <ScrollArea>
        <VStack gap="xs" p="md">
          <Description variant="detail">
            {t(`${translationKey}.${item.id}.description`)}
          </Description>

          <Divider variant="solid" />

          <VStack gap="xs">
            <Label align="left" variant="tiny">
              {bonusLabel}
            </Label>

            <Stack display="grid" cols="2" gap="sm">
              {type === 'race' ? (
                <>
                  <StatRow
                    compact
                    icon={Heart}
                    label={t('Stats.hp')}
                    value={item.stats.hp}
                    color="hp"
                  />
                  <StatRow
                    compact
                    icon={Droplet}
                    label={t('Stats.mana')}
                    value={item.stats.mana}
                    color="mana"
                  />
                  <StatRow
                    compact
                    icon={Sword}
                    label={t('Stats.strength')}
                    value={item.stats.strength}
                    color="strength"
                  />
                  <StatRow
                    compact
                    icon={Brain}
                    label={t('Stats.intelligence')}
                    value={item.stats.intelligence}
                    color="intelligence"
                  />
                  <StatRow
                    compact
                    icon={Wind}
                    label={t('Stats.agility')}
                    value={item.stats.agility}
                    color="agility"
                  />
                  <StatRow
                    compact
                    icon={Activity}
                    label={t('Stats.stamina')}
                    value={item.stats.stamina}
                    color="stamina"
                  />
                </>
              ) : (
                Object.entries(item.statMod).map(([stat, val]: [string, any]) => {
                  if (val === 0) return null
                  const isPositive = val > 0

                  // Map stat mod names to appropriate icons
                  const statIcons: Record<string, any> = {
                    strength: Sword,
                    intelligence: Brain,
                    agility: Wind,
                    stamina: Activity,
                    hp: Heart,
                    mana: Droplet,
                  }
                  const Icon = statIcons[stat] || Activity

                  return (
                    <StatRow
                      key={stat}
                      compact
                      icon={Icon}
                      label={t(`Stats.${stat}`)}
                      value={`${isPositive ? '+' : ''}${val}`}
                      color="gold"
                    />
                  )
                })
              )}
            </Stack>

            <Description variant="bonus">{t(`${translationKey}.${item.id}.bonuses`)}</Description>
          </VStack>
        </VStack>
      </ScrollArea>
    </Card>
  )
}
