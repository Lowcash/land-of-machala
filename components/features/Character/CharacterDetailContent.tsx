/**
 * Character page - Right panel detail views for stats/equipment/achievements
 * Used as the aside content in SplitView pattern
 */

'use client'

import { Coins, MapPin, Shield, Swords, Trophy } from 'lucide-react'
import type { CharacterData, CharacterItem } from './types'

type SectionType = 'stats' | 'equipment' | 'achievements'

interface CharacterDetailContentProps {
  section: SectionType
  character: CharacterData
  equipped: CharacterItem[]
}

export function CharacterDetailContent({
  section,
  character,
  equipped,
}: CharacterDetailContentProps) {
  // Calculate derived stats
  const baseAttack = character.strength * 2
  const equipmentAttack = equipped.reduce((sum, item) => sum + (item.attack || item.damage || 0), 0)
  const totalAttack = baseAttack + equipmentAttack

  const baseDefense = character.stamina * 1.5
  const equipmentDefense = equipped.reduce((sum, item) => sum + (item.defense || 0), 0)
  const totalDefense = Math.floor(baseDefense + equipmentDefense)

  const critChance = Math.min(5 + Math.floor(character.agility / 2), 50)
  const dodgeChance = Math.min(5 + Math.floor(character.agility / 3), 40)

  // Mock achievements
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

  const getSlotName = (slot: string) => {
    const names: Record<string, string> = {
      left_hand: 'Levá ruka',
      right_hand: 'Pravá ruka',
      chest: 'Hruď',
      hands: 'Ruce',
      feet: 'Nohy',
      head: 'Hlava',
      legs: 'Nohy',
    }
    return names[slot] || slot
  }

  if (section === 'stats') {
    return (
      <div className="rounded-lg border-2 border-[#d4a574] bg-linear-to-br from-black/80 to-black/60 p-3 shadow-lg">
        {/* Combat Stats */}
        <div className="mb-3">
          <h3
            className="mb-2 flex items-center gap-2 text-sm text-[#ffd700]"
            style={{ fontFamily: 'var(--font-fantasy)' }}
          >
            <Swords className="h-4 w-4" />
            Bojové statistiky
          </h3>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="rounded border border-[#8b6f47]/30 bg-black/40 px-2 py-1">
              <div className="flex items-center justify-between">
                <span className="text-[#8b7355]">Útok</span>
                <div className="text-right">
                  <span className="text-[#ff6b6b]" style={{ fontFamily: 'var(--font-fantasy)' }}>
                    {totalAttack}
                  </span>
                </div>
              </div>
            </div>
            <div className="rounded border border-[#8b6f47]/30 bg-black/40 px-2 py-1">
              <div className="flex items-center justify-between">
                <span className="text-[#8b7355]">Obrana</span>
                <div className="text-right">
                  <span className="text-[#69ccf0]" style={{ fontFamily: 'var(--font-fantasy)' }}>
                    {totalDefense}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between rounded border border-[#8b6f47]/30 bg-black/40 px-2 py-1">
              <span className="text-[#8b7355]">Crit</span>
              <span className="text-[#ffd700]" style={{ fontFamily: 'var(--font-fantasy)' }}>
                {critChance}%
              </span>
            </div>
            <div className="flex items-center justify-between rounded border border-[#8b6f47]/30 bg-black/40 px-2 py-1">
              <span className="text-[#8b7355]">Dodge</span>
              <span className="text-[#ffd700]" style={{ fontFamily: 'var(--font-fantasy)' }}>
                {dodgeChance}%
              </span>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="mb-3 h-px bg-linear-to-r from-transparent via-[#8b6f47] to-transparent"></div>

        {/* Resistances */}
        <div>
          <h3
            className="mb-2 flex items-center gap-2 text-sm text-[#ffd700]"
            style={{ fontFamily: 'var(--font-fantasy)' }}
          >
            <Shield className="h-4 w-4" />
            Odolnosti
          </h3>
          <div className="grid grid-cols-3 gap-1.5 text-[10px]">
            <div className="flex flex-col items-center rounded bg-black/40 p-1">
              <span className="mb-0.5 text-[#8b7355]">Fyz.</span>
              <span className="text-[#d4a574]" style={{ fontFamily: 'var(--font-fantasy)' }}>
                {character.physicalResistance}%
              </span>
            </div>
            <div className="flex flex-col items-center rounded bg-black/40 p-1">
              <span className="mb-0.5 text-[#8b7355]">Mag.</span>
              <span className="text-[#b66bd4]" style={{ fontFamily: 'var(--font-fantasy)' }}>
                {character.magicalResistance}%
              </span>
            </div>
            <div className="flex flex-col items-center rounded bg-black/40 p-1">
              <span className="mb-0.5 text-[#8b7355]">Oheň</span>
              <span className="text-[#ff6b6b]" style={{ fontFamily: 'var(--font-fantasy)' }}>
                {character.fireResistance}%
              </span>
            </div>
            <div className="flex flex-col items-center rounded bg-black/40 p-1">
              <span className="mb-0.5 text-[#8b7355]">Chlad</span>
              <span className="text-[#69ccf0]" style={{ fontFamily: 'var(--font-fantasy)' }}>
                {character.coldResistance}%
              </span>
            </div>
            <div className="col-span-2 flex flex-col items-center rounded bg-black/40 p-1">
              <span className="mb-0.5 text-[#8b7355]">Jed</span>
              <span className="text-[#6fbf6f]" style={{ fontFamily: 'var(--font-fantasy)' }}>
                {character.poisonResistance}%
              </span>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (section === 'equipment') {
    return (
      <div className="rounded-lg border-2 border-[#d4a574] bg-linear-to-br from-black/80 to-black/60 p-4 shadow-lg">
        <h3
          className="mb-4 flex items-center gap-2 text-base text-[#ffd700]"
          style={{ fontFamily: 'var(--font-fantasy)' }}
        >
          <Swords className="h-5 w-5" />
          Nasazená výbava
        </h3>
        <div className="grid grid-cols-2 gap-3">
          {equipped.map((item) => {
            const Icon = item.icon || Shield
            return (
              <div
                key={item.id}
                className="group relative flex flex-col items-center rounded-lg border-2 border-[#8b6f47] bg-black/60 p-3 transition-all hover:border-[#ffd700] hover:bg-black/80"
              >
                <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-lg border-2 border-[#8b6f47] bg-black/40 shadow-inner transition-colors group-hover:border-[#d4a574]">
                  <Icon className="h-6 w-6 text-[#d4a574] group-hover:text-[#ffd700]" />
                </div>
                <h4
                  className="mb-1 w-full truncate text-center text-xs text-[#f5e6d3]"
                  style={{ fontFamily: 'var(--font-fantasy)' }}
                >
                  {item.name}
                </h4>
                <p className="mb-2 text-[10px] tracking-wider text-[#8b7355] uppercase">
                  {getSlotName(item.slot || '')}
                </p>
                <div className="w-full space-y-0.5 border-t border-[#8b6f47]/30 pt-1">
                  {(item.attack || item.damage) && (
                    <div className="flex items-center justify-between text-[10px]">
                      <span className="text-[#8b7355]">Útok</span>
                      <span className="text-[#ff6b6b]">+{item.attack || item.damage}</span>
                    </div>
                  )}
                  {item.defense && (
                    <div className="flex items-center justify-between text-[10px]">
                      <span className="text-[#8b7355]">Obrana</span>
                      <span className="text-[#69ccf0]">+{item.defense}</span>
                    </div>
                  )}
                </div>
              </div>
            )
          })}
          {equipped.length === 0 && (
            <div className="col-span-full py-8 text-center text-sm text-[#8b7355] italic">
              Žádná nasazená výbava
            </div>
          )}
        </div>
      </div>
    )
  }

  if (section === 'achievements') {
    return (
      <div className="rounded-lg border border-[#8b6f47] bg-black/80 p-4">
        <h3
          className="mb-3 flex items-center gap-2 text-base text-[#d4a574]"
          style={{ fontFamily: 'var(--font-fantasy)' }}
        >
          <Trophy className="h-4 w-4" />
          Úspěchy ({achievements.filter((a) => a.unlocked).length}/{achievements.length})
        </h3>
        <div className="space-y-2">
          {achievements.map((achievement) => (
            <div
              key={achievement.id}
              className={`flex items-start gap-3 rounded border p-3 ${
                achievement.unlocked
                  ? 'border-[#ffd700]/30 bg-[#ffd700]/5'
                  : 'border-[#8b6f47]/30 bg-black/40 opacity-60'
              }`}
            >
              <div
                className={`mt-0.5 rounded-full p-1 ${achievement.unlocked ? 'bg-[#ffd700]/20' : 'bg-black/40'}`}
              >
                <achievement.icon
                  className={`h-4 w-4 ${achievement.unlocked ? 'text-[#ffd700]' : 'text-[#8b7355]'}`}
                />
              </div>
              <div className="flex min-w-0 flex-1 flex-col">
                <h4
                  className={`text-sm font-bold ${achievement.unlocked ? 'text-[#ffd700]' : 'text-[#8b7355]'}`}
                >
                  {achievement.name}
                </h4>
                <p className="text-xs text-[#8b7355]">{achievement.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return null
}
