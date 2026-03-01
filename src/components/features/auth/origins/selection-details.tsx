import { type TranslatedClassInfo, type TranslatedRaceInfo } from '@/lib/game/data/shared'
import { getStatIcon } from '@/lib/game/origins/utils'

import { FadeInPanel } from '@/components/ui/prefabs/animations/fade-in-panel'
import { FeatureSection } from '@/components/ui/prefabs/structure'
import { FeatureGrid } from '@/components/ui/prefabs/structure/feature-grid'
import { Description, Label } from '@/components/ui/prefabs/typography/shared'
import { Divider } from '@/components/ui/shared/divider'

import { StatRow } from './stat-row'
import type { SelectionUiLabels } from './types'

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
    <FadeInPanel animationKey={item.id} flex={flex} variant="secondary" p="md" gap="md">
      <Description align="left" variant="detail">
        {item.description}
      </Description>

      <Divider variant="solid" />

      <FeatureSection>
        <Label align="center" variant="tiny">
          {type === 'race' ? uiLabels.raceBonuses : uiLabels.classBonuses}
        </Label>

        <FeatureGrid variant="dense">
          {/* ... stats ... */}
          {type === 'race' ? (
            <>
              <StatRow
                variant="compact"
                icon={getStatIcon('hp')}
                label={statLabels.hp}
                value={(item as TranslatedRaceInfo).stats.hp}
                color="hp"
              />
              <StatRow
                variant="compact"
                icon={getStatIcon('mana')}
                label={statLabels.mana}
                value={(item as TranslatedRaceInfo).stats.mana}
                color="mana"
              />
              <StatRow
                variant="compact"
                icon={getStatIcon('strength')}
                label={statLabels.strength}
                value={(item as TranslatedRaceInfo).stats.strength}
                color="strength"
              />
              <StatRow
                variant="compact"
                icon={getStatIcon('intelligence')}
                label={statLabels.intelligence}
                value={(item as TranslatedRaceInfo).stats.intelligence}
                color="intelligence"
              />
              <StatRow
                variant="compact"
                icon={getStatIcon('agility')}
                label={statLabels.agility}
                value={(item as TranslatedRaceInfo).stats.agility}
                color="agility"
              />
              <StatRow
                variant="compact"
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
                  variant="compact"
                  icon={Icon}
                  label={statLabels[stat]}
                  value={`${isPositive ? '+' : ''}${numericVal}`}
                  color="gold"
                />
              )
            })
          )}
        </FeatureGrid>

        <Description align="left" variant="bonus">
          {item.bonuses}
        </Description>
      </FeatureSection>
    </FadeInPanel>
  )
}
