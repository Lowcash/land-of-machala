'use client'

import { races } from '@/lib/game/onboarding-data'
import * as Accordion from '@radix-ui/react-accordion'
import { Activity, Brain, ChevronDown, Droplet, Heart, Sword, Wind } from 'lucide-react'

interface SelectorProps {
  selectedId: string
  onSelect: (id: string) => void
  isMobile?: boolean
}

export function RaceSelector({ selectedId, onSelect, isMobile }: SelectorProps) {
  const selectedRace = races.find((r) => r.id === selectedId)!

  if (isMobile) {
    return (
      <Accordion.Item
        value="race"
        className="mb-2 overflow-hidden rounded-lg border border-[#d4a574] bg-black/80 backdrop-blur-sm"
      >
        <Accordion.Header>
          <Accordion.Trigger className="group flex w-full items-center justify-between p-3 text-sm text-[#ffd700] transition-colors hover:bg-[#8b6f47]/20 sm:p-4 sm:text-base">
            <span style={{ fontFamily: 'var(--font-fantasy)' }}>
              Vyber svou rasu ({selectedRace.name})
            </span>
            <ChevronDown className="h-4 w-4 transition-transform group-data-[state=open]:rotate-180 sm:h-5 sm:w-5" />
          </Accordion.Trigger>
        </Accordion.Header>
        <Accordion.Content className="data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down overflow-hidden">
          <div className="p-3 sm:p-4">
            <div className="mb-2 grid grid-cols-3 gap-1.5 sm:gap-2">
              {races.map((r) => {
                const Icon = r.icon
                return (
                  <button
                    key={r.id}
                    onClick={() => onSelect(r.id)}
                    className={`flex h-15 flex-col items-center justify-center gap-0.5 rounded-lg border-2 p-2 transition-all sm:h-20 sm:gap-1 sm:p-3 ${
                      selectedId === r.id
                        ? 'scale-105 border-[#ffd700] bg-linear-to-br from-[#8b6f47] to-[#6d5a3e] shadow-lg'
                        : 'border-[#8b6f47]/50 bg-black/40 hover:scale-105 hover:border-[#ffd700]'
                    }`}
                  >
                    <Icon
                      className={`h-4 w-4 sm:h-5 sm:w-5 ${selectedId === r.id ? 'text-[#ffd700]' : 'text-[#d4a574]'}`}
                    />
                    <span
                      className={`text-[10px] sm:text-xs ${selectedId === r.id ? 'text-[#ffd700]' : 'text-[#d4a574]'}`}
                      style={{ fontFamily: 'var(--font-fantasy)' }}
                    >
                      {r.name}
                    </span>
                  </button>
                )
              })}
            </div>
            <RaceInfo race={selectedRace} />
          </div>
        </Accordion.Content>
      </Accordion.Item>
    )
  }

  return (
    <div className="flex flex-col gap-4 rounded-lg border-2 border-[#d4a574] bg-black/90 p-4 shadow-2xl backdrop-blur-md">
      <h2
        className="text-center text-xl text-[#ffd700]"
        style={{ fontFamily: 'var(--font-fantasy)' }}
      >
        Vyber svou rasu
      </h2>
      <div className="grid grid-cols-3 gap-3">
        {races.map((r) => {
          const Icon = r.icon
          return (
            <button
              key={r.id}
              onClick={() => onSelect(r.id)}
              className={`flex flex-col items-center justify-center gap-2 rounded-lg border-2 p-3 transition-all ${
                selectedId === r.id
                  ? 'scale-105 border-[#ffd700] bg-linear-to-br from-[#8b6f47] to-[#6d5a3e] shadow-lg'
                  : 'border-[#8b6f47]/50 bg-black/40 hover:scale-105 hover:border-[#ffd700]'
              }`}
            >
              <Icon
                className={`h-6 w-6 ${selectedId === r.id ? 'text-[#ffd700]' : 'text-[#d4a574]'}`}
              />
              <span
                className={`text-xs ${selectedId === r.id ? 'text-[#ffd700]' : 'text-[#d4a574]'}`}
                style={{ fontFamily: 'var(--font-fantasy)' }}
              >
                {r.name}
              </span>
            </button>
          )
        })}
      </div>
      <RaceInfo race={selectedRace} />
    </div>
  )
}

function RaceInfo({ race }: { race: (typeof races)[0] }) {
  return (
    <div className="rounded border border-[#8b6f47] bg-black/60 p-3">
      <p className="mb-2 text-xs leading-relaxed text-[#d4a574]">{race.desc}</p>
      <div className="mt-2 border-t border-[#8b6f47]/30 pt-2">
        <p className="mb-1.5 text-xs text-[#ffd700]" style={{ fontFamily: 'var(--font-fantasy)' }}>
          Bonusy rasy:
        </p>
        <div className="grid grid-cols-2 gap-x-2 gap-y-1 text-[10px]">
          <span className="flex items-center gap-1">
            <Heart className="h-3 w-3 text-[#ff6b6b]" />{' '}
            <span className="text-[#d4a574]">{race.stats.hp} HP</span>
          </span>
          <span className="flex items-center gap-1">
            <Droplet className="h-3 w-3 text-[#69ccf0]" />{' '}
            <span className="text-[#d4a574]">{race.stats.mana} MP</span>
          </span>
          <span className="flex items-center gap-1">
            <Sword className="h-3 w-3 text-[#ff6b6b]" />{' '}
            <span className="text-[#d4a574]">{race.stats.strength} Síla</span>
          </span>
          <span className="flex items-center gap-1">
            <Brain className="h-3 w-3 text-[#c084fc]" />{' '}
            <span className="text-[#d4a574]">{race.stats.intelligence} Intel.</span>
          </span>
          <span className="flex items-center gap-1">
            <Wind className="h-3 w-3 text-[#ffd700]" />{' '}
            <span className="text-[#d4a574]">{race.stats.agility} Obrat.</span>
          </span>
          <span className="flex items-center gap-1">
            <Activity className="h-3 w-3 text-[#69ccf0]" />{' '}
            <span className="text-[#d4a574]">{race.stats.stamina} Výdrž</span>
          </span>
        </div>
        <p className="mt-2 text-[10px] text-[#8b7355] italic">{race.bonuses}</p>
      </div>
    </div>
  )
}
