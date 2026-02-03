import { Coins, MapPin } from 'lucide-react'

import { Card } from '@/components/ui/card'
import { DetailRow } from '@/components/ui/display'
import { HStack, VStack } from '@/components/ui/stack'
import { H3, Span } from '@/components/ui/typography'

import { CharacterAvatar } from './CharacterParts/CharacterAvatar'
import { CharacterStats } from './CharacterParts/CharacterStats'
import { CharacterVitals } from './CharacterParts/CharacterVitals'

interface CharacterBoxProps {
  name: string
  level: number
  hp: number
  hpMax: number
  mana: number
  manaMax: number
  stats?: {
    strength: number
    intelligence: number
    agility: number
    stamina: number
  }
  isEnemy: boolean
  xp?: number
  xpMax?: number
  image?: string
  resourceType?: 'mana' | 'energy'
  gold?: number
  locationName?: string
}

export function CharacterBox({
  name,
  level,
  hp,
  hpMax,
  mana,
  manaMax,
  stats,
  isEnemy,
  xp,
  xpMax,
  image,
  resourceType = 'mana',
  gold,
  locationName,
}: CharacterBoxProps) {
  return (
    <Card variant={isEnemy ? 'danger' : 'game'} fullWidth decorated textured>
      <Card.Content>
        <HStack gap="md">
          <CharacterAvatar name={name} level={level} isEnemy={isEnemy} image={image} />

          {/* Info Column */}
          <VStack flex="1" justify="center" minW="0" gap="sm">
            {/* Name & Class */}
            <DetailRow
              label={
                <H3 font="medieval" color={isEnemy ? 'danger' : 'gold'} truncate>
                  {name}
                </H3>
              }
              value={
                !isEnemy && (
                  <Span color="muted" size="xs">
                    Lvl {level}
                  </Span>
                )
              }
              py="none"
            />

            <CharacterVitals
              hp={hp}
              hpMax={hpMax}
              mana={mana}
              manaMax={manaMax}
              xp={xp}
              xpMax={xpMax}
              isEnemy={isEnemy}
              resourceType={resourceType}
            />
          </VStack>
        </HStack>
      </Card.Content>

      {stats && (
        <VStack position="relative" z="10">
          <CharacterStats stats={stats} />
        </VStack>
      )}

      {/* Money & Location Footer (for Player) */}
      {!isEnemy && (gold !== undefined || locationName) && (
        <Card.Footer border="game-t" bg="black-20">
          <VStack gap="xs" fullWidth>
            {locationName && (
              <DetailRow
                label="Lokace"
                value={locationName}
                icon={MapPin}
                iconColor="text-game-gold"
                py="none"
              />
            )}
            {gold !== undefined && (
              <DetailRow
                label="Zlato"
                value={`${gold} zl`}
                icon={Coins}
                iconColor="text-game-gold"
                py="none"
              />
            )}
          </VStack>
        </Card.Footer>
      )}
    </Card>
  )
}
