import { VStack } from '@/components/ui/stack'
import { VitalBar } from '@/components/ui/vitals'

interface CharacterVitalsProps {
  hp: number
  hpMax: number
  mana: number
  manaMax: number
  xp?: number
  xpMax?: number
  isEnemy: boolean
  resourceType?: 'mana' | 'energy'
}

export function CharacterVitals({
  hp,
  hpMax,
  mana,
  manaMax,
  xp,
  xpMax,
  isEnemy,
  resourceType = 'mana',
}: CharacterVitalsProps) {
  return (
    <VStack fullWidth gap="xs">
      <VitalBar current={hp} max={hpMax} variant="hp" label="HP" />

      <VitalBar
        current={mana}
        max={manaMax}
        variant="mana"
        label={resourceType === 'energy' ? 'EN' : 'MP'}
      />

      {!isEnemy && xp !== undefined && xpMax !== undefined && (
        <VitalBar current={xp} max={xpMax} variant="xp" label="XP" showPercentage />
      )}
    </VStack>
  )
}
