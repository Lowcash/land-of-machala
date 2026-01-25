'use client'

import { Button } from '@/components/ui/button'
import { races } from '@/lib/game/onboarding-data'
import { cn } from '@/lib/utils'
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
        className="border-game-gold-muted mb-2 overflow-hidden rounded-lg border bg-black/80 backdrop-blur-sm"
      >
        <Accordion.Header>
          <Accordion.Trigger className="group text-game-gold hover:bg-game-copper/20 flex w-full items-center justify-between p-3 text-sm transition-colors sm:p-4 sm:text-base">
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
                const isSelected = selectedId === r.id
                return (
                  <Button
                    key={r.id}
                    onClick={() => onSelect(r.id)}
                    variant="ghost"
                    className={cn(
                      'flex h-15 flex-col items-center justify-center gap-0.5 rounded-lg border-2 p-2 transition-all sm:h-20 sm:gap-1 sm:p-3',
                      isSelected
                        ? 'border-game-gold from-game-copper to-game-copper-muted scale-105 bg-linear-to-br shadow-lg'
                        : 'border-game-copper/50 hover:border-game-gold bg-black/40 hover:scale-105'
                    )}
                  >
                    <Icon
                      className={cn(
                        'h-4 w-4 sm:h-5 sm:w-5',
                        isSelected ? 'text-game-gold' : 'text-game-gold-muted'
                      )}
                    />
                    <span
                      className={cn(
                        'text-[10px] sm:text-xs',
                        isSelected ? 'text-game-gold' : 'text-game-gold-muted'
                      )}
                      style={{ fontFamily: 'var(--font-fantasy)' }}
                    >
                      {r.name}
                    </span>
                  </Button>
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
    <div className="border-game-gold-muted flex flex-col gap-4 rounded-lg border-2 bg-black/90 p-4 shadow-2xl backdrop-blur-md">
      <h2
        className="text-game-gold text-center text-xl"
        style={{ fontFamily: 'var(--font-fantasy)' }}
      >
        Vyber svou rasu
      </h2>
      <div className="grid grid-cols-3 gap-3">
        {races.map((r) => {
          const Icon = r.icon
          const isSelected = selectedId === r.id
          return (
            <Button
              key={r.id}
              onClick={() => onSelect(r.id)}
              variant="ghost"
              className={cn(
                'flex h-auto flex-col items-center justify-center gap-2 rounded-lg border-2 p-3 transition-all',
                isSelected
                  ? 'border-game-gold from-game-copper to-game-copper-muted scale-105 bg-linear-to-br shadow-lg'
                  : 'border-game-copper/50 hover:border-game-gold bg-black/40 hover:scale-105'
              )}
            >
              <Icon
                className={cn('h-6 w-6', isSelected ? 'text-game-gold' : 'text-game-gold-muted')}
              />
              <span
                className={cn('text-xs', isSelected ? 'text-game-gold' : 'text-game-gold-muted')}
                style={{ fontFamily: 'var(--font-fantasy)' }}
              >
                {r.name}
              </span>
            </Button>
          )
        })}
      </div>
      <RaceInfo race={selectedRace} />
    </div>
  )
}

function RaceInfo({ race }: { race: (typeof races)[0] }) {
  return (
    <div className="border-game-copper rounded border bg-black/60 p-3">
      <p className="text-game-gold-muted mb-2 text-xs leading-relaxed">{race.desc}</p>
      <div className="border-game-copper/30 mt-2 border-t pt-2">
        <p className="text-game-gold mb-1.5 text-xs" style={{ fontFamily: 'var(--font-fantasy)' }}>
          Bonusy rasy:
        </p>
        <div className="grid grid-cols-2 gap-x-2 gap-y-1 text-[10px]">
          <span className="flex items-center gap-1">
            <Heart className="h-3 w-3 text-red-400" />{' '}
            <span className="text-game-gold-muted">{race.stats.hp} HP</span>
          </span>
          <span className="flex items-center gap-1">
            <Droplet className="h-3 w-3 text-sky-400" />{' '}
            <span className="text-game-gold-muted">{race.stats.mana} MP</span>
          </span>
          <span className="flex items-center gap-1">
            <Sword className="h-3 w-3 text-red-400" />{' '}
            <span className="text-game-gold-muted">{race.stats.strength} Síla</span>
          </span>
          <span className="flex items-center gap-1">
            <Brain className="h-3 w-3 text-purple-400" />{' '}
            <span className="text-game-gold-muted">{race.stats.intelligence} Intel.</span>
          </span>
          <span className="flex items-center gap-1">
            <Wind className="text-game-gold h-3 w-3" />{' '}
            <span className="text-game-gold-muted">{race.stats.agility} Obrat.</span>
          </span>
          <span className="flex items-center gap-1">
            <Activity className="h-3 w-3 text-sky-400" />{' '}
            <span className="text-game-gold-muted">{race.stats.stamina} Výdrž</span>
          </span>
        </div>
        <p className="mt-2 text-[10px] text-[#8b7355] italic">{race.bonuses}</p>
      </div>
    </div>
  )
}
