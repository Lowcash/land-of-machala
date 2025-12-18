'use client'

import { PageTemplate } from '@/components/layout/PageTemplate'
import { Tooltip } from '@/components/ui/CustomTooltip'
import { ScrollIndicator } from '@/components/ui/ScrollIndicator'
import {
  Activity,
  Brain,
  Coins,
  MapPin,
  Shield,
  Sparkles,
  Sword,
  Swords,
  Trophy,
  User,
  Wind,
} from 'lucide-react'
import { useRef, useState } from 'react'

type Item = {
  id: string
  name: string
  slot?: string | null
  attack?: number
  defense?: number
  damage?: number
  value: number
  equipped?: boolean
  icon?: any
}

interface CharacterClientProps {
  character: {
    name: string
    level: number
    race: string
    class: string
    experience: number
    hp: number
    maxHp: number
    mana: number
    maxMana: number
    strength: number
    intelligence: number
    agility: number
    stamina: number
    physicalResistance: number
    magicalResistance: number
    fireResistance: number
    coldResistance: number
    poisonResistance: number
    reputation: number
  }
  inventory: Item[]
}

export function CharacterClient({ character, inventory }: CharacterClientProps) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [, setPanel] = useState<'help' | null>(null)
  const equipped = inventory.filter((item) => item.equipped)

  // Calculate derived stats
  const baseAttack = character.strength * 2
  const equipmentAttack = equipped.reduce((sum, item) => sum + (item.attack || item.damage || 0), 0)
  const totalAttack = baseAttack + equipmentAttack

  const baseDefense = character.stamina * 1.5
  const equipmentDefense = equipped.reduce((sum, item) => sum + (item.defense || 0), 0)
  const totalDefense = Math.floor(baseDefense + equipmentDefense)

  const critChance = Math.min(5 + Math.floor(character.agility / 2), 50)
  const dodgeChance = Math.min(5 + Math.floor(character.agility / 3), 40)

  const xpToNext = 1000 // This should ideally come from prop or calculation
  const xpProgress = (character.experience / xpToNext) * 100

  // Achievements system (mock for now)
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

  return (
    <PageTemplate
      title={character.name}
      subtitle={`Level ${character.level} • ${character.race} ${character.class}`}
      icon={User}
      maxWidth="md"
      onHelp={() => setPanel('help')}
    >
      {/* Content - Scrollable Area */}
      <div className="relative flex flex-1 flex-col overflow-hidden">
        <ScrollIndicator targetRef={scrollRef} position="both" />
        <div ref={scrollRef} className="scrollbar-custom flex-1 overflow-y-auto">
          <div className="w-full p-3 sm:p-4">
            {/* Top: Character Profile Card (Compact) */}
            <div className="mb-3 rounded-lg border-2 border-[#d4a574] bg-gradient-to-br from-black/90 to-black/70 p-3 shadow-xl sm:p-4">
              <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-stretch">
                {/* Left: Identity */}
                <div className="flex shrink-0 items-center gap-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full border-3 border-[#ffd700] bg-gradient-to-br from-[#ffd700] via-[#d4a574] to-[#8b6f47] shadow-[0_0_30px_rgba(255,215,0,0.3)] sm:h-20 sm:w-20">
                    <User className="h-8 w-8 text-white sm:h-10 sm:w-10" />
                  </div>
                  <div className="text-center sm:text-left">
                    <h2
                      className="mb-1 text-xl leading-none text-[#ffd700] sm:text-2xl"
                      style={{ fontFamily: 'var(--font-fantasy)' }}
                    >
                      {character.name}
                    </h2>
                    <div className="flex flex-col items-center gap-1 sm:flex-row sm:gap-2">
                      <span
                        className="rounded border border-[#ffd700] bg-[#ffd700]/20 px-2 py-0.5 text-xs font-bold text-[#ffd700]"
                        style={{ fontFamily: 'var(--font-fantasy)' }}
                      >
                        Level {character.level}
                      </span>
                      <span className="text-xs text-[#d4a574]">
                        {character.race} {character.class}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right: Vitals & Progress */}
                <div className="flex min-w-0 flex-1 flex-col justify-center gap-2 border-t border-[#8b6f47]/30 pt-3 sm:gap-3 sm:border-t-0 sm:border-l sm:pt-0 sm:pl-4">
                  {/* HP & Mana Row */}
                  <div className="grid grid-cols-2 gap-3">
                    {/* HP */}
                    <div className="space-y-1">
                      <div className="flex justify-between text-[10px] tracking-wider uppercase">
                        <span className="font-bold text-[#ff6b6b]">Zdraví</span>
                        <span className="text-[#8b7355]">
                          {character.hp}/{character.maxHp}
                        </span>
                      </div>
                      <div className="h-2 overflow-hidden rounded-full border border-[#8b6f47] bg-black/60">
                        <div
                          className="h-full bg-gradient-to-r from-[#ff6b6b] to-[#ff4444]"
                          style={{ width: `${(character.hp / character.maxHp) * 100}%` }}
                        ></div>
                      </div>
                    </div>

                    {/* Mana */}
                    <div className="space-y-1">
                      <div className="flex justify-between text-[10px] tracking-wider uppercase">
                        <span className="font-bold text-[#69ccf0]">Mana</span>
                        <span className="text-[#8b7355]">
                          {character.mana}/{character.maxMana}
                        </span>
                      </div>
                      <div className="h-2 overflow-hidden rounded-full border border-[#8b6f47] bg-black/60">
                        <div
                          className="h-full bg-gradient-to-r from-[#69ccf0] to-[#5ba4c2]"
                          style={{ width: `${(character.mana / character.maxMana) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>

                  {/* XP Bar */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-[10px] tracking-wider uppercase">
                      <span className="font-bold text-[#ffd700]">Zkušenosti</span>
                      <span className="text-[#8b7355]">
                        {character.experience} / {xpToNext} XP
                      </span>
                    </div>
                    <div className="group relative h-1.5 overflow-hidden rounded-full border border-[#8b6f47] bg-black/60">
                      <div
                        className="h-full bg-gradient-to-r from-[#ffd700] to-[#ffed4e]"
                        style={{ width: `${xpProgress}%` }}
                      ></div>
                      {/* Tooltip on hover */}
                      <div className="pointer-events-none absolute top-full left-1/2 z-10 mt-1 -translate-x-1/2 rounded border border-[#ffd700] bg-black/90 px-2 py-1 text-[10px] whitespace-nowrap text-[#ffd700] opacity-0 transition-opacity group-hover:opacity-100">
                        Chybí {xpToNext - character.experience} XP do levelu {character.level + 1}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Middle: Stats Grid - More compact layout */}
            <div className="mb-3 grid grid-cols-2 gap-2 sm:gap-3 lg:grid-cols-4">
              {/* Core Attributes */}
              <div className="rounded-lg border-2 border-[#d4a574] bg-gradient-to-br from-black/80 to-black/60 p-2.5 shadow-lg sm:p-3">
                <h3
                  className="mb-2 flex items-center gap-1.5 text-xs text-[#ffd700] sm:text-sm"
                  style={{ fontFamily: 'var(--font-fantasy)' }}
                >
                  <Sparkles className="h-3.5 w-3.5" />
                  Základní atributy
                </h3>
                <div className="grid grid-cols-2 gap-1.5">
                  <Tooltip content="Síla - Ovlivňuje fyzický útok">
                    <div className="cursor-help rounded border border-[#8b6f47]/30 bg-black/40 p-1.5 text-center">
                      <Sword className="mx-auto mb-0.5 h-4 w-4 text-[#ff6b6b]" />
                      <div className="mb-0.5 text-[9px] text-[#8b7355]">Síla</div>
                      <div
                        className="text-base text-[#ffd700] sm:text-lg"
                        style={{ fontFamily: 'var(--font-fantasy)' }}
                      >
                        {character.strength}
                      </div>
                    </div>
                  </Tooltip>
                  <Tooltip content="Inteligence - Ovlivňuje magii">
                    <div className="cursor-help rounded border border-[#8b6f47]/30 bg-black/40 p-1.5 text-center">
                      <Brain className="mx-auto mb-0.5 h-4 w-4 text-[#b66bd4]" />
                      <div className="mb-0.5 text-[9px] text-[#8b7355]">Inteligence</div>
                      <div
                        className="text-base text-[#ffd700] sm:text-lg"
                        style={{ fontFamily: 'var(--font-fantasy)' }}
                      >
                        {character.intelligence}
                      </div>
                    </div>
                  </Tooltip>
                  <Tooltip content="Obratnost - Ovlivňuje krit a vyhýbání">
                    <div className="cursor-help rounded border border-[#8b6f47]/30 bg-black/40 p-1.5 text-center">
                      <Wind className="mx-auto mb-0.5 h-4 w-4 text-[#ffd700]" />
                      <div className="mb-0.5 text-[9px] text-[#8b7355]">Obratnost</div>
                      <div
                        className="text-base text-[#ffd700] sm:text-lg"
                        style={{ fontFamily: 'var(--font-fantasy)' }}
                      >
                        {character.agility}
                      </div>
                    </div>
                  </Tooltip>
                  <Tooltip content="Výdrž - Ovlivňuje HP a obranu">
                    <div className="cursor-help rounded border border-[#8b6f47]/30 bg-black/40 p-1.5 text-center">
                      <Activity className="mx-auto mb-0.5 h-4 w-4 text-[#69ccf0]" />
                      <div className="mb-0.5 text-[9px] text-[#8b7355]">Výdrž</div>
                      <div
                        className="text-base text-[#ffd700] sm:text-lg"
                        style={{ fontFamily: 'var(--font-fantasy)' }}
                      >
                        {character.stamina}
                      </div>
                    </div>
                  </Tooltip>
                </div>
              </div>

              {/* Combat Stats */}
              <div className="rounded-lg border border-[#8b6f47] bg-black/80 p-2.5 sm:p-3">
                <h3
                  className="mb-2 flex items-center gap-1.5 text-xs text-[#d4a574] sm:text-sm"
                  style={{ fontFamily: 'var(--font-fantasy)' }}
                >
                  <Swords className="h-3.5 w-3.5" />
                  Bojové statistiky
                </h3>
                <div className="space-y-1.5 text-xs">
                  <div className="rounded border border-[#8b6f47]/30 bg-black/40 p-1.5">
                    <div className="mb-0.5 flex items-center justify-between">
                      <span className="text-[#8b7355]">Útok:</span>
                      <span
                        className="text-[#ff6b6b]"
                        style={{ fontFamily: 'var(--font-fantasy)' }}
                      >
                        {totalAttack}
                      </span>
                    </div>
                    <div className="text-[9px] text-[#8b7355]">
                      Základ {baseAttack} + výbava {equipmentAttack}
                    </div>
                  </div>
                  <div className="rounded border border-[#8b6f47]/30 bg-black/40 p-1.5">
                    <div className="mb-0.5 flex items-center justify-between">
                      <span className="text-[#8b7355]">Obrana:</span>
                      <span
                        className="text-[#69ccf0]"
                        style={{ fontFamily: 'var(--font-fantasy)' }}
                      >
                        {totalDefense}
                      </span>
                    </div>
                    <div className="text-[9px] text-[#8b7355]">
                      Základ {Math.floor(baseDefense)} + výbava {equipmentDefense}
                    </div>
                  </div>
                  <div className="flex items-center justify-between py-0.5">
                    <span className="text-[#8b7355]">Kritický zásah:</span>
                    <span className="text-[#ffd700]" style={{ fontFamily: 'var(--font-fantasy)' }}>
                      {critChance}%
                    </span>
                  </div>
                  <div className="flex items-center justify-between py-0.5">
                    <span className="text-[#8b7355]">Vyhýbání:</span>
                    <span className="text-[#ffd700]" style={{ fontFamily: 'var(--font-fantasy)' }}>
                      {dodgeChance}%
                    </span>
                  </div>
                </div>
              </div>

              {/* Resistances */}
              <div className="rounded-lg border border-[#8b6f47] bg-black/80 p-2.5 sm:p-3">
                <h3
                  className="mb-2 flex items-center gap-1.5 text-xs text-[#d4a574] sm:text-sm"
                  style={{ fontFamily: 'var(--font-fantasy)' }}
                >
                  <Shield className="h-3.5 w-3.5" />
                  Odolnosti
                </h3>
                <div className="space-y-1 text-xs">
                  <div className="flex items-center justify-between py-0.5">
                    <span className="text-[#8b7355]">Fyzická:</span>
                    <span className="text-[#d4a574]" style={{ fontFamily: 'var(--font-fantasy)' }}>
                      {character.physicalResistance}%
                    </span>
                  </div>
                  <div className="flex items-center justify-between py-0.5">
                    <span className="text-[#8b7355]">Magická:</span>
                    <span className="text-[#b66bd4]" style={{ fontFamily: 'var(--font-fantasy)' }}>
                      {character.magicalResistance}%
                    </span>
                  </div>
                  <div className="flex items-center justify-between py-0.5">
                    <span className="text-[#8b7355]">Oheň:</span>
                    <span className="text-[#ff6b6b]" style={{ fontFamily: 'var(--font-fantasy)' }}>
                      {character.fireResistance}%
                    </span>
                  </div>
                  <div className="flex items-center justify-between py-0.5">
                    <span className="text-[#8b7355]">Chlad:</span>
                    <span className="text-[#69ccf0]" style={{ fontFamily: 'var(--font-fantasy)' }}>
                      {character.coldResistance}%
                    </span>
                  </div>
                  <div className="flex items-center justify-between py-0.5">
                    <span className="text-[#8b7355]">Jed:</span>
                    <span className="text-[#6fbf6f]" style={{ fontFamily: 'var(--font-fantasy)' }}>
                      {character.poisonResistance}%
                    </span>
                  </div>
                </div>
              </div>

              {/* Achievements Preview */}
              <div className="rounded-lg border border-[#8b6f47] bg-black/80 p-2.5 sm:p-3">
                <h3
                  className="mb-2 flex items-center gap-1.5 text-xs text-[#d4a574] sm:text-sm"
                  style={{ fontFamily: 'var(--font-fantasy)' }}
                >
                  <Trophy className="h-3.5 w-3.5" />
                  Úspěchy ({achievements.filter((a) => a.unlocked).length}/{achievements.length})
                </h3>
                <div className="space-y-1.5">
                  {achievements.slice(0, 4).map((achievement) => (
                    <div
                      key={achievement.id}
                      className={`rounded border bg-black/40 p-1.5 ${achievement.unlocked ? 'border-[#ffd700]/30' : 'border-[#8b6f47]/30 opacity-50'}`}
                    >
                      <div className="mb-0.5 flex items-center gap-1.5">
                        <achievement.icon
                          className={`h-3 w-3 ${achievement.unlocked ? 'text-[#ffd700]' : 'text-[#8b7355]'}`}
                        />
                        <span className="truncate text-xs text-[#ffd700]">{achievement.name}</span>
                      </div>
                      <p className="line-clamp-1 text-[9px] text-[#8b7355]">
                        {achievement.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom: Equipment - More compact grid */}
            <div className="rounded-lg border-2 border-[#d4a574] bg-gradient-to-br from-black/80 to-black/60 p-3 shadow-lg sm:p-4">
              <h3
                className="mb-3 flex items-center gap-2 text-sm text-[#ffd700] sm:text-base"
                style={{ fontFamily: 'var(--font-fantasy)' }}
              >
                <Swords className="h-4 w-4" />
                Nasazená výbava
              </h3>
              <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 sm:gap-3 md:grid-cols-5">
                {equipped.map((item) => {
                  const Icon = item.icon || Shield // Fallback icon
                  return (
                    <div
                      key={item.id}
                      className="rounded-lg border-2 border-[#8b6f47] bg-black/60 p-2 transition-colors hover:border-[#ffd700]"
                    >
                      <div className="flex flex-col items-center text-center">
                        <div className="mb-1.5 flex h-10 w-10 items-center justify-center rounded-lg border-2 border-[#8b6f47] bg-black/40">
                          <Icon className="h-5 w-5 text-[#d4a574]" />
                        </div>
                        <h4
                          className="mb-0.5 line-clamp-1 text-[10px] text-[#f5e6d3] sm:text-xs"
                          style={{ fontFamily: 'var(--font-fantasy)' }}
                        >
                          {item.name}
                        </h4>
                        <p className="mb-1 text-[9px] text-[#8b7355]">
                          {getSlotName(item.slot || '')}
                        </p>
                        <div className="w-full space-y-0.5">
                          {(item.attack || item.damage) && (
                            <div className="flex items-center justify-between text-[9px]">
                              <span className="text-[#8b7355]">Útok:</span>
                              <span className="text-[#ff6b6b]">+{item.attack || item.damage}</span>
                            </div>
                          )}
                          {item.defense && (
                            <div className="flex items-center justify-between text-[9px]">
                              <span className="text-[#8b7355]">Obrana:</span>
                              <span className="text-[#69ccf0]">+{item.defense}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageTemplate>
  )
}
