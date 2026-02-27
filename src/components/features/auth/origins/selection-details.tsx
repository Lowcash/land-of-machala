import { type TranslatedClassInfo, type TranslatedRaceInfo } from '@/lib/game/data/shared'
import { getStatIcon } from '@/lib/game/origins/utils'

import { Card } from '@/components/ui/core/card'
import { Stack, VStack } from '@/components/ui/core/stack'
import { MotionScrollArea } from '@/components/ui/prefabs/animations/motion-scroll-area'
import { Description, Label } from '@/components/ui/prefabs/typography/shared'
import { Divider } from '@/components/ui/shared/divider'

import { StatRow } from './stat-row'

interface SelectionDetailsProps {
  item: TranslatedRaceInfo | TranslatedClassInfo | null
  type: 'race' | 'class'
  flex?: string | boolean | number
  statLabels: Record<string, string>
  uiLabels: any
}

export function SelectionDetails({
  item,
  type,
  flex = '1',
  statLabels,
  uiLabels,
}: SelectionDetailsProps) {
  if (!item) return null

  return (
    <MotionScrollArea
      as={Card}
      flex={flex as any}
      gap="md"
      p="md"
      minHeight="zero"
      key={item.id}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
    >
      <VStack gap="md" fullWidth>
        <Description variant="detail">{item.description}</Description>

        <Divider variant="solid" />

        <VStack gap="xs" fullWidth>
          <Label align="left" variant="tiny">
            {type === 'race' ? uiLabels.raceBonuses : uiLabels.classBonuses}
          </Label>

          <Stack display="grid" cols="2" gap="sm" fullWidth>
            {type === 'race' ? (
              <>
                <StatRow
                  compact
                  icon={getStatIcon('hp')}
                  label={statLabels.hp}
                  value={(item as TranslatedRaceInfo).stats.hp}
                  color="hp"
                />
                <StatRow
                  compact
                  icon={getStatIcon('mana')}
                  label={statLabels.mana}
                  value={(item as TranslatedRaceInfo).stats.mana}
                  color="mana"
                />
                <StatRow
                  compact
                  icon={getStatIcon('strength')}
                  label={statLabels.strength}
                  value={(item as TranslatedRaceInfo).stats.strength}
                  color="strength"
                />
                <StatRow
                  compact
                  icon={getStatIcon('intelligence')}
                  label={statLabels.intelligence}
                  value={(item as TranslatedRaceInfo).stats.intelligence}
                  color="intelligence"
                />
                <StatRow
                  compact
                  icon={getStatIcon('agility')}
                  label={statLabels.agility}
                  value={(item as TranslatedRaceInfo).stats.agility}
                  color="agility"
                />
                <StatRow
                  compact
                  icon={getStatIcon('stamina')}
                  label={statLabels.stamina}
                  value={(item as TranslatedRaceInfo).stats.stamina}
                  color="stamina"
                />
              </>
            ) : (
              Object.entries((item as TranslatedClassInfo).statMod).map(([stat, val]) => {
                const numericVal = val as number
                if (numericVal === 0) return null
                const isPositive = numericVal > 0
                const Icon = getStatIcon(stat)

                return (
                  <StatRow
                    key={stat}
                    compact
                    icon={Icon}
                    label={statLabels[stat]}
                    value={`${isPositive ? '+' : ''}${numericVal}`}
                    color="gold"
                  />
                )
              })
            )}
          </Stack>

          <Description variant="bonus">{item.bonuses}</Description>
        </VStack>
      </VStack>
    </MotionScrollArea>
  )
}
