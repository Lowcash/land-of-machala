import { Activity, Brain, Shield, Sparkles, Sword, Swords, User, Wind, X } from 'lucide-react'
import { Tooltip } from './Tooltip'

type Item = {
  id: number
  name: string
  slot?: string
  attack?: number
  defense?: number
  damage?: number
  value: number
  equipped?: boolean
}

interface CharacterPanelProps {
  inventory: Item[]
  stats: {
    hp: number
    hpMax: number
    mana: number
    manaMax: number
    strength: number
    intelligence: number
    agility: number
    stamina: number
  }
  reputation: number
  onClose: () => void
}

function EquipSlot({ name, items }: { name: string; items: Item[] }) {
  const item = items[0]
  return (
    <div className="flex items-center gap-2 rounded border border-[#8b6f47] bg-black/60 p-2">
      <span className="w-20 text-xs text-[#8b7355]">{name}:</span>
      {item ? (
        <div className="flex min-w-0 flex-1 items-center justify-between">
          <span className="truncate text-xs text-[#f5e6d3]">{item.name}</span>
          <div className="ml-2 flex flex-shrink-0 items-center gap-1">
            {(item.attack || item.damage) && (
              <div className="flex items-center gap-0.5">
                <Swords className="h-3 w-3 text-[#ff6b6b]" />
                <span className="text-xs text-[#ff6b6b]">{item.attack || item.damage}</span>
              </div>
            )}
            {item.defense && (
              <div className="flex items-center gap-0.5">
                <Shield className="h-3 w-3 text-[#69ccf0]" />
                <span className="text-xs text-[#69ccf0]">{item.defense}</span>
              </div>
            )}
          </div>
        </div>
      ) : (
        <span className="text-xs text-[#8b7355] italic">Prázdné</span>
      )}
    </div>
  )
}

export function CharacterPanel({ inventory, stats, reputation, onClose }: CharacterPanelProps) {
  const equipped = inventory.filter((item) => item.equipped)

  // Calculate derived stats based on new system
  const baseAttack = stats.strength * 2
  const equipmentAttack = equipped.reduce((sum, item) => sum + (item.attack || item.damage || 0), 0)
  const totalAttack = baseAttack + equipmentAttack

  const baseDefense = stats.stamina * 1.5
  const equipmentDefense = equipped.reduce((sum, item) => sum + (item.defense || 0), 0)
  const totalDefense = Math.floor(baseDefense + equipmentDefense)

  const critChance = Math.min(5 + Math.floor(stats.agility / 2), 50)
  const dodgeChance = Math.min(5 + Math.floor(stats.agility / 3), 40)

  const currentXP = 750
  const xpToNext = 1000
  const xpProgress = (currentXP / xpToNext) * 100

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-2 backdrop-blur-md sm:p-4">
      <div className="flex h-full max-h-[95vh] w-full max-w-7xl flex-col rounded-lg border-2 border-[#d4a574] bg-gradient-to-br from-black/95 via-[#1a1510]/90 to-black/95 shadow-2xl">
        {/* Header */}
        <div className="flex flex-shrink-0 items-center justify-between border-b-2 border-[#8b6f47] bg-gradient-to-r from-black/80 via-black/60 to-black/80 px-4 py-3 sm:px-6 sm:py-4">
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-[#ffd700] bg-gradient-to-br from-[#ffd700] via-[#a8865d] to-[#8b6f47] shadow-lg sm:h-12 sm:w-12">
              <User className="h-5 w-5 text-white sm:h-6 sm:w-6" />
            </div>
            <div>
              <h2
                className="text-xl text-[#ffd700] sm:text-2xl"
                style={{ fontFamily: 'var(--font-medieval)' }}
              >
                Lowcash
              </h2>
              <p className="text-[10px] text-[#d4a574] sm:text-xs">Level 1 • Lidský válečník</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded p-1.5 text-[#d4a574] transition-colors hover:bg-black/40 hover:text-[#ffd700] sm:p-2"
          >
            <X className="h-5 w-5 sm:h-6 sm:w-6" />
          </button>
        </div>

        <div className="scrollbar-custom min-h-0 flex-1 overflow-y-auto p-3 sm:p-6">
          <div className="grid gap-3 sm:gap-6 lg:grid-cols-[300px_1fr_300px]">
            {/* Left: Core Stats */}
            <div className="space-y-3 sm:space-y-4">
              <div className="rounded-lg border-2 border-[#d4a574] bg-gradient-to-br from-black/80 to-black/60 p-3 shadow-lg sm:p-4">
                <h3
                  className="mb-3 flex items-center gap-2 text-sm text-[#ffd700] sm:mb-4 sm:text-base"
                  style={{ fontFamily: 'var(--font-fantasy)' }}
                >
                  <Sparkles className="h-4 w-4" />
                  Základní atributy
                </h3>
                <div className="grid grid-cols-2 gap-2 sm:gap-3">
                  {/* Strength */}
                  <div className="rounded-lg border border-[#ff6b6b]/30 bg-black/40 p-2">
                    <div className="mb-1 flex flex-col items-center gap-1">
                      <Sword className="h-5 w-5 text-[#ff6b6b]" />
                      <span
                        className="text-xs text-[#ff6b6b]"
                        style={{ fontFamily: 'var(--font-fantasy)' }}
                      >
                        Síla
                      </span>
                      <span
                        className="text-xl text-[#ffd700]"
                        style={{ fontFamily: 'var(--font-fantasy)' }}
                      >
                        {stats.strength}
                      </span>
                    </div>
                    <div className="text-center text-[9px] leading-relaxed text-[#8b7355]">
                      Fyzický útok
                      <br />a nosnost
                    </div>
                  </div>

                  {/* Intelligence */}
                  <div className="rounded-lg border border-[#c084fc]/30 bg-black/40 p-2">
                    <div className="mb-1 flex flex-col items-center gap-1">
                      <Brain className="h-5 w-5 text-[#c084fc]" />
                      <span
                        className="text-xs text-[#c084fc]"
                        style={{ fontFamily: 'var(--font-fantasy)' }}
                      >
                        Inteligence
                      </span>
                      <span
                        className="text-xl text-[#ffd700]"
                        style={{ fontFamily: 'var(--font-fantasy)' }}
                      >
                        {stats.intelligence}
                      </span>
                    </div>
                    <div className="text-center text-[9px] leading-relaxed text-[#8b7355]">
                      Magická síla
                      <br />a mana
                    </div>
                  </div>

                  {/* Agility */}
                  <div className="rounded-lg border border-[#ffd700]/30 bg-black/40 p-2">
                    <div className="mb-1 flex flex-col items-center gap-1">
                      <Wind className="h-5 w-5 text-[#ffd700]" />
                      <span
                        className="text-xs text-[#ffd700]"
                        style={{ fontFamily: 'var(--font-fantasy)' }}
                      >
                        Obratnost
                      </span>
                      <span
                        className="text-xl text-[#ffd700]"
                        style={{ fontFamily: 'var(--font-fantasy)' }}
                      >
                        {stats.agility}
                      </span>
                    </div>
                    <div className="text-center text-[9px] leading-relaxed text-[#8b7355]">
                      Kritický zásah
                      <br />a vyhýbání
                    </div>
                  </div>

                  {/* Stamina */}
                  <div className="rounded-lg border border-[#69ccf0]/30 bg-black/40 p-2">
                    <div className="mb-1 flex flex-col items-center gap-1">
                      <Activity className="h-5 w-5 text-[#69ccf0]" />
                      <span
                        className="text-xs text-[#69ccf0]"
                        style={{ fontFamily: 'var(--font-fantasy)' }}
                      >
                        Výdrž
                      </span>
                      <span
                        className="text-xl text-[#ffd700]"
                        style={{ fontFamily: 'var(--font-fantasy)' }}
                      >
                        {stats.stamina}
                      </span>
                    </div>
                    <div className="text-center text-[9px] leading-relaxed text-[#8b7355]">
                      Zdraví
                      <br />a obrana
                    </div>
                  </div>
                </div>
              </div>

              {/* Combat Stats */}
              <div className="rounded-lg border border-[#8b6f47] bg-black/60 p-3 sm:p-4">
                <h3
                  className="mb-3 flex items-center gap-2 text-sm text-[#d4a574]"
                  style={{ fontFamily: 'var(--font-fantasy)' }}
                >
                  <Tooltip content="Odvozené statistiky pro boj založené na tvých atributech a vybavení">
                    <Swords className="h-4 w-4 cursor-help" />
                  </Tooltip>
                  Bojové statistiky
                </h3>
                <div className="space-y-2.5 text-xs sm:text-sm">
                  <div className="rounded border border-[#8b6f47]/30 bg-black/40 p-2">
                    <div className="mb-1 flex items-center justify-between">
                      <span className="text-[#8b7355]">Útok:</span>
                      <span
                        className="text-[#ff6b6b]"
                        style={{ fontFamily: 'var(--font-fantasy)' }}
                      >
                        {totalAttack}
                      </span>
                    </div>
                    <div className="text-[10px] text-[#8b7355]">
                      Základ {baseAttack} + výbava {equipmentAttack}
                    </div>
                  </div>
                  <div className="rounded border border-[#8b6f47]/30 bg-black/40 p-2">
                    <div className="mb-1 flex items-center justify-between">
                      <span className="text-[#8b7355]">Obrana:</span>
                      <span
                        className="text-[#69ccf0]"
                        style={{ fontFamily: 'var(--font-fantasy)' }}
                      >
                        {totalDefense}
                      </span>
                    </div>
                    <div className="text-[10px] text-[#8b7355]">
                      Základ {Math.floor(baseDefense)} + výbava {equipmentDefense}
                    </div>
                  </div>
                  <div className="flex items-center justify-between py-1">
                    <span className="text-[#8b7355]">Kritický zásah:</span>
                    <span className="text-[#ffd700]" style={{ fontFamily: 'var(--font-fantasy)' }}>
                      {critChance}%
                    </span>
                  </div>
                  <div className="flex items-center justify-between py-1">
                    <span className="text-[#8b7355]">Vyhýbání:</span>
                    <span className="text-[#ffd700]" style={{ fontFamily: 'var(--font-fantasy)' }}>
                      {dodgeChance}%
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Center: Character Portrait & XP */}
            <div className="space-y-3 sm:space-y-4">
              {/* Large Portrait */}
              <div className="rounded-lg border-2 border-[#ffd700] bg-gradient-to-br from-[#1a1510] to-black p-4 text-center shadow-2xl sm:p-6">
                <div className="mx-auto mb-4 flex h-40 w-40 items-center justify-center rounded-full border-4 border-[#ffd700] bg-gradient-to-br from-[#ffd700] via-[#d4a574] to-[#8b6f47] shadow-[0_0_40px_rgba(255,215,0,0.3)] sm:h-48 sm:w-48">
                  <User className="h-20 w-20 text-white sm:h-24 sm:w-24" />
                </div>

                {/* XP Progress */}
                <div className="mt-4">
                  <div className="mb-2 flex justify-between text-xs sm:text-sm">
                    <span className="text-[#d4a574]" style={{ fontFamily: 'var(--font-fantasy)' }}>
                      Zkušenosti
                    </span>
                    <span className="text-[#c084fc]" style={{ fontFamily: 'var(--font-fantasy)' }}>
                      {currentXP}/{xpToNext}
                    </span>
                  </div>
                  <div className="h-4 overflow-hidden rounded-full border-2 border-[#8b6f47] bg-black/80">
                    <div
                      className="h-full bg-gradient-to-r from-[#c084fc] via-[#9333ea] to-[#7c3aed] transition-all"
                      style={{ width: `${xpProgress}%` }}
                    ></div>
                  </div>
                  <p className="mt-1 text-[10px] text-[#8b7355]">
                    {1000 - currentXP} XP do dalšího levelu
                  </p>
                </div>

                {/* Class & Race Info */}
                <div className="mt-4 grid grid-cols-2 gap-3 border-t border-[#8b6f47] pt-4 sm:grid-cols-3">
                  <div className="rounded border border-[#8b6f47]/50 bg-black/40 p-2">
                    <div className="mb-1 text-[10px] text-[#8b7355]">Povolání</div>
                    <div
                      className="text-sm text-[#ffd700]"
                      style={{ fontFamily: 'var(--font-fantasy)' }}
                    >
                      Válečník
                    </div>
                  </div>
                  <div className="rounded border border-[#8b6f47]/50 bg-black/40 p-2">
                    <div className="mb-1 text-[10px] text-[#8b7355]">Rasa</div>
                    <div
                      className="text-sm text-[#ffd700]"
                      style={{ fontFamily: 'var(--font-fantasy)' }}
                    >
                      Člověk
                    </div>
                  </div>
                  <div className="col-span-2 rounded border border-[#8b6f47]/50 bg-black/40 p-2 sm:col-span-1">
                    <div className="mb-1 text-[10px] text-[#8b7355]">Reputace</div>
                    <div
                      className="text-sm text-[#ffd700]"
                      style={{ fontFamily: 'var(--font-fantasy)' }}
                    >
                      {reputation}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Equipment */}
            <div className="space-y-3 sm:space-y-4">
              <div className="rounded-lg border border-[#8b6f47] bg-black/60 p-3 sm:p-4">
                <h3
                  className="mb-3 flex items-center gap-2 text-sm text-[#d4a574] sm:mb-4 sm:text-base"
                  style={{ fontFamily: 'var(--font-fantasy)' }}
                >
                  <Shield className="h-4 w-4" />
                  Vybavení
                </h3>
                <div className="space-y-2">
                  <EquipSlot
                    name="Levá ruka"
                    items={equipped.filter((i) => i.slot === 'left_hand')}
                  />
                  <EquipSlot
                    name="Pravá ruka"
                    items={equipped.filter((i) => i.slot === 'right_hand')}
                  />
                  <EquipSlot name="Hlava" items={equipped.filter((i) => i.slot === 'head')} />
                  <EquipSlot name="Hruď" items={equipped.filter((i) => i.slot === 'chest')} />
                  <EquipSlot name="Ruce" items={equipped.filter((i) => i.slot === 'hands')} />
                  <EquipSlot name="Nohy" items={equipped.filter((i) => i.slot === 'legs')} />
                  <EquipSlot name="Boty" items={equipped.filter((i) => i.slot === 'feet')} />
                </div>
              </div>

              {/* Equipment Summary */}
              <div className="rounded-lg border border-[#8b6f47]/50 bg-black/40 p-3">
                <h4
                  className="mb-2 text-xs text-[#8b7355]"
                  style={{ fontFamily: 'var(--font-fantasy)' }}
                >
                  Souhrn výbavy
                </h4>
                <div className="space-y-1 text-xs">
                  <div className="flex justify-between">
                    <span className="text-[#8b7355]">Nasazeno:</span>
                    <span className="text-[#ffd700]">{equipped.length}/7</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#8b7355]">Bonus útoku:</span>
                    <span className="text-[#ff6b6b]">+{equipmentAttack}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#8b7355]">Bonus obrany:</span>
                    <span className="text-[#69ccf0]">+{equipmentDefense}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
