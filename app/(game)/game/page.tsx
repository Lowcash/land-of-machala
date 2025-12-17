import { GameDashboard } from '@/components/features/Game/GameDashboard'
import { calculateXpForLevel, getCharacterByUserId } from '@/entity/character'
import { auth } from '@/lib/auth'
import { serializeCharacter } from '@/lib/serialization'
import { redirect } from 'next/navigation'

export default async function GamePage() {
  const session = await auth()
  if (!session?.user?.id) {
    redirect('/login')
  }

  const character = await getCharacterByUserId(session.user.id)
  if (!character) {
    redirect('/onboarding')
  }

  const serializedCharacter = serializeCharacter(character)

  const characterData = {
    ...serializedCharacter,
    xp: character.experience,
    xpToNextLevel: calculateXpForLevel(character.level),
    stats: {
      strength: character.strength,
      intelligence: character.intelligence,
      agility: character.agility,
      stamina: character.stamina,
    },
  }

  return <GameDashboard character={characterData} />
}
