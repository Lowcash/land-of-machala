import { type TranslatedClassInfo, type TranslatedRaceInfo } from '@/lib/game/data/shared'
import { getStatIcon } from '@/lib/game/origins/utils'

import type { SelectionUiLabels } from './types'

import { FadeInPanel } from '@/components/ui/prefabs/animations/fade-in-panel'
import { FeatureSection } from '@/components/ui/prefabs/structure'
import { FeatureGrid } from '@/components/ui/prefabs/structure/feature-grid'
import { Description, Label } from '@/components/ui/prefabs/typography/shared'
import { Divider } from '@/components/ui/shared/divider'

import { StatRow } from './stat-row'

interface SelectionDetailsProps {
  item: TranslatedRaceInfo | TranslatedClassInfo | null
  type: 'race' | 'class'
  flex?: string | boolean | number
  statLabels: Record<string, string>
  uiLabels: SelectionUiLabels
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
    <FadeInPanel animationKey={item.id} flex={flex as any} variant="secondary" p="md" gap="md">
      <Description variant="detail">{item.description}</Description>

      <Divider variant="solid" />

      <FeatureSection>
        <Label align="left" variant="tiny">
          {type === 'race' ? uiLabels.raceBonuses : uiLabels.classBonuses}
        </Label>

        <FeatureGrid variant="dense">
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
        </FeatureGrid>

        <Description variant="bonus">{item.bonuses}</Description>
      </FeatureSection>
    </FadeInPanel>
  )
}
