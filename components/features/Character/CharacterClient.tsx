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
      maxWidth="lg"
      onHelp={() => setPanel('help')}
      backUrl="/game"
    >
      {/* Content - Scrollable Area */}
      <div className="relative flex flex-1 flex-col overflow-hidden">
        <ScrollIndicator targetRef={scrollRef} position="both" />
        <div ref={scrollRef} className="scrollbar-custom flex-1 overflow-y-auto">
          <div className="w-full space-y-4 p-3 sm:p-4">
            {/* Top: Character Header & Vitals */}
            <div className="rounded-lg border-2 border-[#d4a574] bg-gradient-to-br from-black/90 to-black/70 p-4 shadow-xl">
              <div className="flex flex-col gap-4 md:flex-row md:items-center">
                {/* Identity */}
                <div className="flex items-center gap-4">
                  <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full border-3 border-[#ffd700] bg-gradient-to-br from-[#ffd700] via-[#d4a574] to-[#8b6f47] shadow-[0_0_30px_rgba(255,215,0,0.3)]">
                    <User className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <h2
                      className="text-2xl leading-none text-[#ffd700]"
                      style={{ fontFamily: 'var(--font-fantasy)' }}
                    >
                      {character.name}
                    </h2>
                    <div className="mt-1 flex items-center gap-2 text-sm text-[#d4a574]">
                      <span>{character.race}</span>
                      <span>•</span>
                      <span>{character.class}</span>
                      <span>•</span>
                      <span className="font-bold text-[#ffd700]">Level {character.level}</span>
                    </div>
                  </div>
                </div>

                {/* Vitals Bars */}
                <div className="flex-1 space-y-2 md:border-l md:border-[#8b6f47]/30 md:pl-6">
                  {/* HP */}
                  <div className="grid grid-cols-[40px_1fr_60px] items-center gap-2 text-xs">
                    <span className="font-bold text-[#ff6b6b]">HP</span>
                    <div className="h-2.5 overflow-hidden rounded-full border border-[#8b6f47] bg-black/60">
                      <div
                        className="h-full bg-gradient-to-r from-[#ff6b6b] to-[#ff4444]"
                        style={{ width: `${(character.hp / character.maxHp) * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-right text-[#8b7355]">
                      {character.hp}/{character.maxHp}
                    </span>
                  </div>
                  {/* Mana */}
                  <div className="grid grid-cols-[40px_1fr_60px] items-center gap-2 text-xs">
                    <span className="font-bold text-[#69ccf0]">MP</span>
                    <div className="h-2.5 overflow-hidden rounded-full border border-[#8b6f47] bg-black/60">
                      <div
                        className="h-full bg-gradient-to-r from-[#69ccf0] to-[#5ba4c2]"
                        style={{ width: `${(character.mana / character.maxMana) * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-right text-[#8b7355]">
                      {character.mana}/{character.maxMana}
                    </span>
                  </div>
                  {/* XP */}
                  <div className="grid grid-cols-[40px_1fr_60px] items-center gap-2 text-xs">
                    <span className="font-bold text-[#ffd700]">XP</span>
                    <div className="group relative h-2.5 overflow-hidden rounded-full border border-[#8b6f47] bg-black/60">
                      <div
                        className="h-full bg-gradient-to-r from-[#ffd700] to-[#ffed4e]"
                        style={{ width: `${xpProgress}%` }}
                      ></div>
                      <div className="pointer-events-none absolute top-full left-1/2 z-10 mt-1 -translate-x-1/2 rounded border border-[#ffd700] bg-black/90 px-2 py-1 text-[10px] whitespace-nowrap text-[#ffd700] opacity-0 transition-opacity group-hover:opacity-100">
                        {character.experience} / {xpToNext} XP
                      </div>
                    </div>
                    <span className="text-right text-[#8b7355]">{Math.floor(xpProgress)}%</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Grid Layout */}
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
              {/* Left Column: Stats (4 cols) */}
              <div className="space-y-4 lg:col-span-4">
                {/* Core Attributes */}
                <div className="rounded-lg border-2 border-[#d4a574] bg-black/80 p-3 sm:p-4">
                  <h3
                    className="mb-3 flex items-center gap-2 text-sm text-[#ffd700] sm:text-base"
                    style={{ fontFamily: 'var(--font-fantasy)' }}
                  >
                    <Sparkles className="h-4 w-4" />
                    Atributy
                  </h3>
                  <div className="grid grid-cols-2 gap-2 sm:gap-3">
                    <Tooltip content="Síla - Ovlivňuje fyzický útok">
                      <div className="min-h-touch-target cursor-help rounded border border-[#8b6f47]/30 bg-black/40 p-2 text-center transition-colors hover:border-[#d4a574]/50 sm:min-h-0 sm:p-3">
                        <Sword className="mx-auto mb-1 h-5 w-5 text-[#ff6b6b]" />
                        <div className="text-[10px] text-[#8b7355] uppercase">Síla</div>
                        <div
                          className="text-xl text-[#ffd700] sm:text-2xl"
                          style={{ fontFamily: 'var(--font-fantasy)' }}
                        >
                          {character.strength}
                        </div>
                      </div>
                    </Tooltip>
                    <Tooltip content="Inteligence - Ovlivňuje magii">
                      <div className="min-h-touch-target cursor-help rounded border border-[#8b6f47]/30 bg-black/40 p-2 text-center transition-colors hover:border-[#d4a574]/50 sm:min-h-0 sm:p-3">
                        <Brain className="mx-auto mb-1 h-5 w-5 text-[#b66bd4]" />
                        <div className="text-[10px] text-[#8b7355] uppercase">Inteligence</div>
                        <div
                          className="text-xl text-[#ffd700] sm:text-2xl"
                          style={{ fontFamily: 'var(--font-fantasy)' }}
                        >
                          {character.intelligence}
                        </div>
                      </div>
                    </Tooltip>
                    <Tooltip content="Obratnost - Ovlivňuje krit a vyhýbání">
                      <div className="min-h-touch-target cursor-help rounded border border-[#8b6f47]/30 bg-black/40 p-2 text-center transition-colors hover:border-[#d4a574]/50 sm:min-h-0 sm:p-3">
                        <Wind className="mx-auto mb-1 h-5 w-5 text-[#ffd700]" />
                        <div className="text-[10px] text-[#8b7355] uppercase">Obratnost</div>
                        <div
                          className="text-xl text-[#ffd700] sm:text-2xl"
                          style={{ fontFamily: 'var(--font-fantasy)' }}
                        >
                          {character.agility}
                        </div>
                      </div>
                    </Tooltip>
                    <Tooltip content="Výdrž - Ovlivňuje HP a obranu">
                      <div className="min-h-touch-target cursor-help rounded border border-[#8b6f47]/30 bg-black/40 p-2 text-center transition-colors hover:border-[#d4a574]/50 sm:min-h-0 sm:p-3">
                        <Activity className="mx-auto mb-1 h-5 w-5 text-[#69ccf0]" />
                        <div className="text-[10px] text-[#8b7355] uppercase">Výdrž</div>
                        <div
                          className="text-xl text-[#ffd700] sm:text-2xl"
                          style={{ fontFamily: 'var(--font-fantasy)' }}
                        >
                          {character.stamina}
                        </div>
                      </div>
                    </Tooltip>
                  </div>
                </div>

                {/* Combat Stats */}
                <div className="rounded-lg border border-[#8b6f47] bg-black/80 p-3 sm:p-4">
                  <h3
                    className="mb-3 flex items-center gap-2 text-sm text-[#d4a574] sm:text-base"
                    style={{ fontFamily: 'var(--font-fantasy)' }}
                  >
                    <Swords className="h-4 w-4" />
                    Bojové statistiky
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center justify-between rounded border border-[#8b6f47]/30 bg-black/40 px-3 py-2">
                      <span className="text-[#8b7355]">Útok</span>
                      <div className="text-right">
                        <span
                          className="text-[#ff6b6b]"
                          style={{ fontFamily: 'var(--font-fantasy)' }}
                        >
                          {totalAttack}
                        </span>
                        <div className="text-[9px] text-[#8b7355]">
                          ({baseAttack} + {equipmentAttack})
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between rounded border border-[#8b6f47]/30 bg-black/40 px-3 py-2">
                      <span className="text-[#8b7355]">Obrana</span>
                      <div className="text-right">
                        <span
                          className="text-[#69ccf0]"
                          style={{ fontFamily: 'var(--font-fantasy)' }}
                        >
                          {totalDefense}
                        </span>
                        <div className="text-[9px] text-[#8b7355]">
                          ({Math.floor(baseDefense)} + {equipmentDefense})
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between px-2">
                      <span className="text-[#8b7355]">Kritický zásah</span>
                      <span
                        className="text-[#ffd700]"
                        style={{ fontFamily: 'var(--font-fantasy)' }}
                      >
                        {critChance}%
                      </span>
                    </div>
                    <div className="flex items-center justify-between px-2">
                      <span className="text-[#8b7355]">Vyhýbání</span>
                      <span
                        className="text-[#ffd700]"
                        style={{ fontFamily: 'var(--font-fantasy)' }}
                      >
                        {dodgeChance}%
                      </span>
                    </div>
                  </div>
                </div>

                {/* Resistances */}
                <div className="rounded-lg border border-[#8b6f47] bg-black/80 p-3 sm:p-4">
                  <h3
                    className="mb-3 flex items-center gap-2 text-sm text-[#d4a574] sm:text-base"
                    style={{ fontFamily: 'var(--font-fantasy)' }}
                  >
                    <Shield className="h-4 w-4" />
                    Odolnosti
                  </h3>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="flex items-center justify-between rounded bg-black/40 px-2 py-1">
                      <span className="text-[#8b7355]">Fyzická</span>
                      <span
                        className="text-[#d4a574]"
                        style={{ fontFamily: 'var(--font-fantasy)' }}
                      >
                        {character.physicalResistance}%
                      </span>
                    </div>
                    <div className="flex items-center justify-between rounded bg-black/40 px-2 py-1">
                      <span className="text-[#8b7355]">Magická</span>
                      <span
                        className="text-[#b66bd4]"
                        style={{ fontFamily: 'var(--font-fantasy)' }}
                      >
                        {character.magicalResistance}%
                      </span>
                    </div>
                    <div className="flex items-center justify-between rounded bg-black/40 px-2 py-1">
                      <span className="text-[#8b7355]">Oheň</span>
                      <span
                        className="text-[#ff6b6b]"
                        style={{ fontFamily: 'var(--font-fantasy)' }}
                      >
                        {character.fireResistance}%
                      </span>
                    </div>
                    <div className="flex items-center justify-between rounded bg-black/40 px-2 py-1">
                      <span className="text-[#8b7355]">Chlad</span>
                      <span
                        className="text-[#69ccf0]"
                        style={{ fontFamily: 'var(--font-fantasy)' }}
                      >
                        {character.coldResistance}%
                      </span>
                    </div>
                    <div className="col-span-2 flex items-center justify-between rounded bg-black/40 px-2 py-1">
                      <span className="text-[#8b7355]">Jed</span>
                      <span
                        className="text-[#6fbf6f]"
                        style={{ fontFamily: 'var(--font-fantasy)' }}
                      >
                        {character.poisonResistance}%
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Equipment & Achievements (8 cols) */}
              <div className="space-y-4 lg:col-span-8">
                {/* Equipment */}
                <div className="rounded-lg border-2 border-[#d4a574] bg-gradient-to-br from-black/80 to-black/60 p-3 shadow-lg sm:p-4">
                  <h3
                    className="mb-4 flex items-center gap-2 text-sm text-[#ffd700] sm:text-base"
                    style={{ fontFamily: 'var(--font-fantasy)' }}
                  >
                    <Swords className="h-5 w-5" />
                    Nasazená výbava
                  </h3>
                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
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
                                <span className="text-[#ff6b6b]">
                                  +{item.attack || item.damage}
                                </span>
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
                    {/* Empty slots placeholders if needed, or just show equipped */}
                    {equipped.length === 0 && (
                      <div className="col-span-full py-8 text-center text-sm text-[#8b7355] italic">
                        Žádná nasazená výbava
                      </div>
                    )}
                  </div>
                </div>

                {/* Achievements */}
                <div className="rounded-lg border border-[#8b6f47] bg-black/80 p-3 sm:p-4">
                  <h3
                    className="mb-3 flex items-center gap-2 text-sm text-[#d4a574] sm:text-base"
                    style={{ fontFamily: 'var(--font-fantasy)' }}
                  >
                    <Trophy className="h-4 w-4" />
                    Úspěchy ({achievements.filter((a) => a.unlocked).length}/{achievements.length})
                  </h3>
                  <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                    {achievements.map((achievement) => (
                      <div
                        key={achievement.id}
                        className={`flex items-start gap-3 rounded border p-2 ${
                          achievement.unlocked
                            ? 'border-[#ffd700]/30 bg-[#ffd700]/5'
                            : 'border-[#8b6f47]/30 bg-black/40 opacity-60'
                        }`}
                      >
                        <div
                          className={`mt-0.5 rounded-full p-1 ${
                            achievement.unlocked ? 'bg-[#ffd700]/20' : 'bg-black/40'
                          }`}
                        >
                          <achievement.icon
                            className={`h-4 w-4 ${
                              achievement.unlocked ? 'text-[#ffd700]' : 'text-[#8b7355]'
                            }`}
                          />
                        </div>
                        <div className="min-w-0 flex-1">
                          <h4
                            className={`text-xs font-bold ${
                              achievement.unlocked ? 'text-[#ffd700]' : 'text-[#8b7355]'
                            }`}
                          >
                            {achievement.name}
                          </h4>
                          <p className="truncate text-[10px] text-[#8b7355]">
                            {achievement.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageTemplate>
  )
}
