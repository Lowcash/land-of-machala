'use client'

import { CharacterBox } from '@/components/features/Game/CharacterBox'
import { Coins, MapPin, Shield, Swords, Trophy } from 'lucide-react'
import { AchievementList } from './AchievementList'
import { CharacterDetailContent } from './CharacterDetailContent'
import { EquipmentList } from './EquipmentList'
import type { CharacterData, CharacterItem } from './types'

interface CharacterClientProps {
  character: CharacterData
  inventory: CharacterItem[]
}

export function CharacterClient({ character, inventory }: CharacterClientProps) {
  const equipped = inventory.filter((item) => item.equipped)

  // Calculate derived stats for the CharacterDetailContent
  const baseAttack = character.strength * 2
  const equipmentAttack = equipped.reduce((sum, item) => sum + (item.attack || item.damage || 0), 0)
  const totalAttack = baseAttack + equipmentAttack

  const baseDefense = character.stamina * 1.5
  const equipmentDefense = equipped.reduce((sum, item) => sum + (item.defense || 0), 0)
  const totalDefense = Math.floor(baseDefense + equipmentDefense)

  // Mock achievments for now (moved from Content)
  const achievements = [
    {
      id: 1,
      name: 'První kroky',
      description: 'Vstoupil jsi do světa Machala',
      icon: Trophy,
      unlocked: true,
    },
    {
      id: 2,
      name: 'Začátečník',
      description: 'Dosáhl jsi level 5',
      icon: Trophy,
      unlocked: false,
    },
    {
      id: 3,
      name: 'Bojovník',
      description: 'Poraz 10 nepřátel',
      icon: Swords,
      unlocked: false,
    },
    {
      id: 4,
      name: 'Průzkumník',
      description: 'Prozkoumal jsi 5 lokací',
      icon: MapPin,
      unlocked: false,
    },
    {
      id: 5,
      name: 'Sběratel',
      description: 'Najdi 20 itemů',
      icon: Shield,
      unlocked: false,
    },
    {
      id: 6,
      name: 'Obchodník',
      description: 'Prodej 50 itemů',
      icon: Coins,
      unlocked: false,
    },
  ]

  return (
    <div className="flex h-full flex-col overflow-hidden">
      <div className="flex-1 overflow-y-auto md:p-3">
        <div className="mx-auto w-full max-w-7xl space-y-3">
          {/* Mobile: Sticky Character Box */}
          <div className="sticky top-0 z-20 w-full bg-black/80 px-4 py-2 backdrop-blur-sm md:static md:hidden md:bg-transparent md:p-0">
            <CharacterBox
              name={character.name}
              level={character.level}
              hp={character.hp}
              hpMax={character.maxHp}
              mana={character.mana}
              manaMax={character.maxMana}
              xp={character.experience}
              xpMax={1000}
              stats={{
                strength: character.strength,
                intelligence: character.intelligence,
                agility: character.agility,
                stamina: character.stamina,
              }}
              isEnemy={false}
              gold={character.gold}
            />
          </div>

          {/* Grid Layout */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {/* Left Column: Character Box (Desktop) + Stats */}
            <div className="flex h-full flex-col gap-4">
              <div className="hidden shrink-0 md:block">
                <CharacterBox
                  name={character.name}
                  level={character.level}
                  hp={character.hp}
                  hpMax={character.maxHp}
                  mana={character.mana}
                  manaMax={character.maxMana}
                  xp={character.experience}
                  xpMax={1000}
                  stats={{
                    strength: character.strength,
                    intelligence: character.intelligence,
                    agility: character.agility,
                    stamina: character.stamina,
                  }}
                  isEnemy={false}
                  gold={character.gold}
                />
              </div>
              <div className="min-h-0 flex-1 px-4 md:px-0">
                <CharacterDetailContent
                  character={character}
                  totalAttack={totalAttack}
                  totalDefense={totalDefense}
                />
              </div>
            </div>

            {/* Middle Column: Equipment */}
            <div className="h-full px-4 md:px-0">
              <EquipmentList equipped={equipped} />
            </div>

            {/* Right Column: Achievements */}
            <div className="h-full px-4 md:px-0">
              <AchievementList achievements={achievements} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
