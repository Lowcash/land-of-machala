import type { TranslatedClassInfo, TranslatedRaceInfo } from '@/lib/game/data/shared'
import { getStatIcon } from '@/lib/game/origins/utils'

import { Card } from '@/components/ui/core/card'
import { ScrollArea } from '@/components/ui/core/scroll-area'
import { Stack, VStack } from '@/components/ui/core/stack'
import { Description, Label } from '@/components/ui/prefabs/typography/shared'
import { Divider } from '@/components/ui/shared/divider'

import { StatRow } from './stat-row'

interface SelectionDetailsProps {
  item: TranslatedRaceInfo | TranslatedClassInfo
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
  return (
    <Card
      p="none"
      flex={flex as any}
      rounded="base"
      /** Prevent flex-shrink overflow in parent scroll area */
      minHeight="zero"
    >
      <ScrollArea flex="1">
        <VStack gap="sm" p="md">
          <Description variant="detail">{item.description}</Description>

          <Divider variant="solid" />

          <VStack gap="xs">
            <Label align="left" variant="tiny">
              {type === 'race' ? uiLabels.raceBonuses : uiLabels.classBonuses}
            </Label>

            <Stack display="grid" cols="2" gap="sm">
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
                Object.entries((item as TranslatedClassInfo).statMod).map(
                  ([stat, val]: [string, number]) => {
                    if (val === 0) return null
                    const isPositive = val > 0
                    const Icon = getStatIcon(stat)

                    return (
                      <StatRow
                        key={stat}
                        compact
                        icon={Icon}
                        label={statLabels[stat]}
                        value={`${isPositive ? '+' : ''}${val}`}
                        color="gold"
                      />
                    )
                  }
                )
              )}
            </Stack>

            <Description variant="bonus">{item.bonuses}</Description>
          </VStack>
        </VStack>
      </ScrollArea>
    </Card>
  )
}
