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

  const xpToNext = 1000
  const xpProgress = (character.experience / xpToNext) * 100

  // Achievements
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
          <div className="w-full space-y-3 p-3 sm:space-y-4 sm:p-4">
            {/* Character Profile Card */}
            <div className="rounded-lg border-2 border-[#d4a574] bg-gradient-to-br from-black/90 to-black/70 p-3 shadow-xl sm:p-4">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-stretch">
                {/* Left: Avatar & Identity */}
                <div className="flex items-center gap-4 flex-shrink-0">
                  <div className="flex h-16 w-16 sm:h-20 sm:w-20 shrink-0 items-center justify-center rounded-full border-3 border-[#ffd700] bg-gradient-to-br from-[#ffd700] via-[#d4a574] to-[#8b6f47] shadow-[0_0_30px_rgba(255,215,0,0.3)]">
                    <User className="h-8 w-8 sm:h-10 sm:w-10 text-white" />
                  </div>
                  <div className="text-center sm:text-left">
                    <h2
                      className="text-xl sm:text-2xl leading-none mb-1 text-[#ffd700]"
                      style={{ fontFamily: 'var(--font-fantasy)' }}
                    >
                      {character.name}
                    </h2>
                    <div className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2">
                      <span className="text-xs px-2 py-0.5 bg-[#ffd700]/20 border border-[#ffd700] rounded text-[#ffd700] font-bold" style={{ fontFamily: 'var(--font-fantasy)' }}>
                        Level {character.level}
                      </span>
                      <span className="text-xs text-[#d4a574]">{character.race} {character.class}</span>
                    </div>
                  </div>
                </div>

                {/* Right: Vitals & Progress */}
                <div className="flex-1 w-full flex flex-col justify-center gap-2 sm:gap-3 min-w-0 border-t sm:border-t-0 sm:border-l border-[#8b6f47]/30 pt-3 sm:pt-0 sm:pl-4">
                  {/* HP & Mana Row */}
                  <div className="grid grid-cols-2 gap-3">
                    {/* HP */}
                    <div className="space-y-1">
                      <div className="flex justify-between text-[10px] uppercase tracking-wider">
                        <span className="text-[#ff6b6b] font-bold">Zdraví</span>
                        <span className="text-[#8b7355]">{character.hp} / {character.maxHp} HP</span>
                      </div>
                      <div className="h-2 bg-black/60 rounded-full border border-[#8b6f47] overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-[#ff6b6b] to-[#ff4444]" style={{ width: `${(character.hp/character.maxHp)*100}%` }}></div>
                      </div>
                    </div>

                    {/* Mana */}
                    <div className="space-y-1">
                      <div className="flex justify-between text-[10px] uppercase tracking-wider">
                        <span className="text-[#69ccf0] font-bold">Mana</span>
                        <span className="text-[#8b7355]">{character.mana} / {character.maxMana} MP</span>
                      </div>
                      <div className="h-2 bg-black/60 rounded-full border border-[#8b6f47] overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-[#69ccf0] to-[#5ba4c2]" style={{ width: `${(character.mana/character.maxMana)*100}%` }}></div>
                      </div>
                    </div>
                  </div>

                  {/* XP Bar */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-[10px] uppercase tracking-wider">
                      <span className="text-[#ffd700] font-bold">Zkušenosti</span>
                      <span className="text-[#8b7355]">{character.experience} / {xpToNext} XP</span>
                    </div>
                    <div className="h-1.5 bg-black/60 rounded-full border border-[#8b6f47] overflow-hidden relative group">
                      <div className="h-full bg-gradient-to-r from-[#ffd700] to-[#ffed4e]" style={{ width: `${xpProgress}%` }}></div>
                      <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 px-2 py-1 bg-black/90 border border-[#ffd700] text-[#ffd700] text-[10px] rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10 pointer-events-none">
                        Chybí {xpToNext - character.experience} XP do levelu {character.level + 1}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Layout: 2-Column (Stats Left, Equipment Right) */}
            <div className="grid grid-cols-1 gap-3 lg:grid-cols-12 sm:gap-4">
              {/* Left Column: Attributes & Stats - 4 cols */}
              <div className="space-y-3 sm:space-y-4 lg:col-span-4">
                {/* Core Attributes */}
                <div className="rounded-lg border-2 border-[#d4a574] bg-gradient-to-br from-black/80 to-black/60 p-3 shadow-lg sm:p-4">
                  <h3
                    className="mb-3 flex items-center gap-2 text-sm text-[#ffd700] sm:text-base"
                    style={{ fontFamily: 'var(--font-fantasy)' }}
                  >
                    <Sparkles className="h-4 w-4" />
                    Základní atributy
                  </h3>
                  <div className="grid grid-cols-2 gap-2 sm:gap-3">
                    <Tooltip content="Síla - Ovlivňuje fyzický útok a nosnost">
                      <div className="min-h-touch-target cursor-help rounded border border-[#8b6f47]/30 bg-black/40 p-2 text-center transition-all hover:border-[#ff6b6b]/50 hover:bg-black/60 sm:min-h-0 sm:p-3">
                        <Sword className="mx-auto mb-1 h-4 w-4 sm:h-5 sm:w-5 text-[#ff6b6b]" />
                        <div className="text-[9px] sm:text-[10px] text-[#8b7355] uppercase mb-0.5">Síla</div>
                        <div
                          className="text-base sm:text-lg text-[#ffd700]"
                          style={{ fontFamily: 'var(--font-fantasy)' }}
                        >
                          {character.strength}
                        </div>
                      </div>
                    </Tooltip>
                    <Tooltip content="Inteligence - Ovlivňuje magickou sílu a manu">
                      <div className="min-h-touch-target cursor-help rounded border border-[#8b6f47]/30 bg-black/40 p-2 text-center transition-all hover:border-[#b66bd4]/50 hover:bg-black/60 sm:min-h-0 sm:p-3">
                        <Brain className="mx-auto mb-1 h-4 w-4 sm:h-5 sm:w-5 text-[#b66bd4]" />
                        <div className="text-[9px] sm:text-[10px] text-[#8b7355] uppercase mb-0.5">Inteligence</div>
                        <div
                          className="text-base sm:text-lg text-[#ffd700]"
                          style={{ fontFamily: 'var(--font-fantasy)' }}
                        >
                          {character.intelligence}
                        </div>
                      </div>
                    </Tooltip>
                    <Tooltip content="Obratnost - Ovlivňuje kritický zásah a vyhýbání">
                      <div className="min-h-touch-target cursor-help rounded border border-[#8b6f47]/30 bg-black/40 p-2 text-center transition-all hover:border-[#ffd700]/50 hover:bg-black/60 sm:min-h-0 sm:p-3">
                        <Wind className="mx-auto mb-1 h-4 w-4 sm:h-5 sm:w-5 text-[#ffd700]" />
                        <div className="text-[9px] sm:text-[10px] text-[#8b7355] uppercase mb-0.5">Obratnost</div>
                        <div
                          className="text-base sm:text-lg text-[#ffd700]"
                          style={{ fontFamily: 'var(--font-fantasy)' }}
                        >
                          {character.agility}
                        </div>
                      </div>
                    </Tooltip>
                    <Tooltip content="Výdrž - Ovlivňuje zdraví a obranu">
                      <div className="min-h-touch-target cursor-help rounded border border-[#8b6f47]/30 bg-black/40 p-2 text-center transition-all hover:border-[#69ccf0]/50 hover:bg-black/60 sm:min-h-0 sm:p-3">
                        <Activity className="mx-auto mb-1 h-4 w-4 sm:h-5 sm:w-5 text-[#69ccf0]" />
                        <div className="text-[9px] sm:text-[10px] text-[#8b7355] uppercase mb-0.5">Výdrž</div>
                        <div
                          className="text-base sm:text-lg text-[#ffd700]"
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
                    className="mb-2 flex items-center gap-1.5 text-xs sm:text-sm text-[#d4a574]"
                    style={{ fontFamily: 'var(--font-fantasy)' }}
                  >
                    <Swords className="h-3.5 w-3.5" />
                    Bojové statistiky
                  </h3>
                  <div className="space-y-1.5 text-xs">
                    <div className="bg-black/40 rounded p-1.5 border border-[#8b6f47]/30">
                      <div className="flex justify-between items-center mb-0.5">
                        <span className="text-[#8b7355]">Útok:</span>
                        <span className="text-[#ff6b6b]" style={{ fontFamily: 'var(--font-fantasy)' }}>{totalAttack}</span>
                      </div>
                      <div className="text-[9px] text-[#8b7355]">
                        Základ {baseAttack} + výbava {equipmentAttack}
                      </div>
                    </div>
                    <div className="bg-black/40 rounded p-1.5 border border-[#8b6f47]/30">
                      <div className="flex justify-between items-center mb-0.5">
                        <span className="text-[#8b7355]">Obrana:</span>
                        <span className="text-[#69ccf0]" style={{ fontFamily: 'var(--font-fantasy)' }}>{totalDefense}</span>
                      </div>
                      <div className="text-[9px] text-[#8b7355]">
                        Základ {Math.floor(baseDefense)} + výbava {equipmentDefense}
                      </div>
                    </div>
                    <div className="flex justify-between items-center py-0.5">
                      <span className="text-[#8b7355]">Kritický zásah:</span>
                      <span className="text-[#ffd700]" style={{ fontFamily: 'var(--font-fantasy)' }}>{critChance}%</span>
                    </div>
                    <div className="flex justify-between items-center py-0.5">
                      <span className="text-[#8b7355]">Vyhýbání:</span>
                      <span className="text-[#ffd700]" style={{ fontFamily: 'var(--font-fantasy)' }}>{dodgeChance}%</span>
                    </div>
                  </div>
                </div>

                {/* Resistances */}
                <div className="rounded-lg border border-[#8b6f47] bg-black/80 p-2.5 sm:p-3">
                  <h3
                    className="mb-2 flex items-center gap-1.5 text-xs sm:text-sm text-[#d4a574]"
                    style={{ fontFamily: 'var(--font-fantasy)' }}
                  >
                    <Shield className="h-3.5 w-3.5" />
                    Odolnosti
                  </h3>
                  <div className="space-y-1 text-xs">
                    <div className="flex justify-between items-center py-0.5">
                      <span className="text-[#8b7355]">Fyzická:</span>
                      <span className="text-[#d4a574]" style={{ fontFamily: 'var(--font-fantasy)' }}>{character.physicalResistance}%</span>
                    </div>
                    <div className="flex justify-between items-center py-0.5">
                      <span className="text-[#8b7355]">Magická:</span>
                      <span className="text-[#b66bd4]" style={{ fontFamily: 'var(--font-fantasy)' }}>{character.magicalResistance}%</span>
                    </div>
                    <div className="flex justify-between items-center py-0.5">
                      <span className="text-[#8b7355]">Oheň:</span>
                      <span className="text-[#ff6b6b]" style={{ fontFamily: 'var(--font-fantasy)' }}>{character.fireResistance}%</span>
                    </div>
                    <div className="flex justify-between items-center py-0.5">
                      <span className="text-[#8b7355]">Chlad:</span>
                      <span className="text-[#69ccf0]" style={{ fontFamily: 'var(--font-fantasy)' }}>{character.coldResistance}%</span>
                    </div>
                    <div className="flex justify-between items-center py-0.5">
                      <span className="text-[#8b7355]">Jed:</span>
                      <span className="text-[#6fbf6f]" style={{ fontFamily: 'var(--font-fantasy)' }}>{character.poisonResistance}%</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Equipment & Achievements - 8 cols */}
              <div className="space-y-3 sm:space-y-4 lg:col-span-8">
                {/* Equipment */}
                <div className="rounded-lg border-2 border-[#d4a574] bg-gradient-to-br from-black/80 to-black/60 p-3 shadow-lg sm:p-4">
                  <h3
                    className="mb-3 sm:mb-4 flex items-center gap-2 text-sm sm:text-base text-[#ffd700]"
                    style={{ fontFamily: 'var(--font-fantasy)' }}
                  >
                    <Swords className="h-4 w-4 sm:h-5 sm:w-5" />
                    Nasazená výbava
                  </h3>
                  <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2 sm:gap-3">
                    {equipped.map((item) => {
                      const Icon = item.icon || Shield
                      return (
                        <div
                          key={item.id}
                          className="bg-black/60 rounded-lg border-2 border-[#8b6f47] p-2 hover:border-[#ffd700] transition-colors"
                        >
                          <div className="flex flex-col items-center text-center">
                            <div className="w-10 h-10 rounded-lg bg-black/40 border-2 border-[#8b6f47] flex items-center justify-center mb-1.5">
                              <Icon className="h-5 w-5 text-[#d4a574]" />
                            </div>
                            <h4 className="text-[10px] text-[#f5e6d3] mb-0.5 truncate w-full" style={{ fontFamily: 'var(--font-fantasy)' }}>
                              {item.name}
                            </h4>
                            <p className="text-[8px] text-[#8b7355] uppercase mb-1 tracking-wider">
                              {getSlotName(item.slot || '')}
                            </p>
                            <div className="w-full border-t border-[#8b6f47]/30 pt-1 space-y-0.5">
                              {(item.attack || item.damage) && (
                                <div className="flex items-center justify-between text-[9px]">
                                  <span className="text-[#8b7355]">Útok</span>
                                  <span className="text-[#ff6b6b]">+{item.attack || item.damage}</span>
                                </div>
                              )}
                              {item.defense && (
                                <div className="flex items-center justify-between text-[9px]">
                                  <span className="text-[#8b7355]">Obrana</span>
                                  <span className="text-[#69ccf0]">+{item.defense}</span>
                                </div>
                              )}
                            </div>
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

                {/* Achievements */}
                <div className="rounded-lg border border-[#8b6f47] bg-black/80 p-3 sm:p-4">
                  <h3
                    className="mb-3 flex items-center gap-2 text-sm sm:text-base text-[#d4a574]"
                    style={{ fontFamily: 'var(--font-fantasy)' }}
                  >
                    <Trophy className="h-4 w-4" />
                    Úspěchy ({achievements.filter((a) => a.unlocked).length}/{achievements.length})
                  </h3>
                  <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                    {achievements.map((achievement) => (
                      <div
                        key={achievement.id}
                        className={`flex items-start gap-2 sm:gap-3 rounded border p-2 ${
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
                            className={`h-3.5 w-3.5 sm:h-4 sm:w-4 ${
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
                          <p className="text-[10px] text-[#8b7355] line-clamp-1">
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
