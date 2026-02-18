'use client'

import { useTranslations } from 'next-intl'

import type { ClassInfo } from '@/lib/game/data/classes'
import type { RaceInfo } from '@/lib/game/data/races'
import { getStatIcon } from '@/lib/game/origins/utils'

import { Card } from '@/components/ui/core/card'
import { ScrollArea } from '@/components/ui/core/scroll-area'
import { Stack, VStack } from '@/components/ui/core/stack'
import { Description, Label } from '@/components/ui/prefabs/typography/shared'
import { Divider } from '@/components/ui/shared/divider'

import { StatRow } from './stat-row'

interface SelectionDetailsProps {
  item: RaceInfo | ClassInfo
  type: 'race' | 'class'
  maxHeight?: string | number
  flex?: string | boolean | number
}

export function SelectionDetails({ item, type, maxHeight, flex = '1' }: SelectionDetailsProps) {
  const t = useTranslations('Game')
  const ot = useTranslations('Auth.Origins.creation')

  const translationKey = type === 'race' ? 'Races' : 'Classes'
  const bonusLabel = type === 'race' ? ot('raceBonuses') : ot('classBonuses')

  return (
    <Card
      p="none"
      flex={flex as any}
      rounded="base"
      /** Prevent flex-shrink overflow in parent scroll area */
      minHeight="zero"
    >
      <ScrollArea
        flex="1"
      >
        <VStack gap="sm" p="md">
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
                    icon={getStatIcon('hp')}
                    label={t('Stats.hp')}
                    value={(item as RaceInfo).stats.hp}
                    color="hp"
                  />
                  <StatRow
                    compact
                    icon={getStatIcon('mana')}
                    label={t('Stats.mana')}
                    value={(item as RaceInfo).stats.mana}
                    color="mana"
                  />
                  <StatRow
                    compact
                    icon={getStatIcon('strength')}
                    label={t('Stats.strength')}
                    value={(item as RaceInfo).stats.strength}
                    color="strength"
                  />
                  <StatRow
                    compact
                    icon={getStatIcon('intelligence')}
                    label={t('Stats.intelligence')}
                    value={(item as RaceInfo).stats.intelligence}
                    color="intelligence"
                  />
                  <StatRow
                    compact
                    icon={getStatIcon('agility')}
                    label={t('Stats.agility')}
                    value={(item as RaceInfo).stats.agility}
                    color="agility"
                  />
                  <StatRow
                    compact
                    icon={getStatIcon('stamina')}
                    label={t('Stats.stamina')}
                    value={(item as RaceInfo).stats.stamina}
                    color="stamina"
                  />
                </>
              ) : (
                Object.entries((item as ClassInfo).statMod).map(([stat, val]: [string, number]) => {
                  if (val === 0) return null
                  const isPositive = val > 0
                  const Icon = getStatIcon(stat)

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
