import { Activity, Brain, Droplet, Heart, Sword, Wind } from 'lucide-react'

import { races } from '@/lib/game/onboarding'

import { Card } from '@/components/ui/card'
import { DetailRow, StatGrid } from '@/components/ui/display'
import { VStack } from '@/components/ui/stack'
import { Caption, Label } from '@/components/ui/typography'

import { EntitySelector } from './EntitySelector'

interface SelectorProps {
  selectedId: string
  searchParams?: { [key: string]: string | string[] | undefined }
  isMobile?: boolean
}

export function RaceSelector({ selectedId, searchParams, isMobile }: SelectorProps) {
  return (
    <EntitySelector
      items={races}
      selectedId={selectedId}
      paramName="race"
      searchParams={searchParams}
      isMobile={isMobile}
      title="Vyber svou rasu"
      renderDetail={(race) => <RaceInfo race={race} />}
    />
  )
}

function RaceInfo({ race }: { race: (typeof races)[0] }) {
  return (
    <VStack p="sm">
      <Card variant="muted">
        <Card.Content>
          <VStack gap="sm" fullWidth>
            <Caption color="gold-muted">{race.desc}</Caption>

            <VStack mt="sm" border="game-t" pt="sm" gap="sm" fullWidth>
              <Label font="fantasy" color="gold">
                Bonusy rasy:
              </Label>

              <StatGrid columns="2">
                <DetailRow
                  label="HP"
                  value={race.stats.hp}
                  icon={Heart}
                  iconColor="text-game-danger"
                />
                <DetailRow
                  label="Mana"
                  value={race.stats.mana}
                  icon={Droplet}
                  iconColor="text-game-info"
                />
                <DetailRow
                  label="Síla"
                  value={race.stats.strength}
                  icon={Sword}
                  iconColor="text-game-copper"
                />
                <DetailRow
                  label="Intel."
                  value={race.stats.intelligence}
                  icon={Brain}
                  iconColor="text-game-magic"
                />
                <DetailRow
                  label="Obrat."
                  value={race.stats.agility}
                  icon={Wind}
                  iconColor="text-game-gold"
                />
                <DetailRow
                  label="Výdrž"
                  value={race.stats.stamina}
                  icon={Activity}
                  iconColor="text-game-info"
                />
              </StatGrid>

              <Caption color="muted" italic>
                {race.bonuses}
              </Caption>
            </VStack>
          </VStack>
        </Card.Content>
      </Card>
    </VStack>
  )
}
