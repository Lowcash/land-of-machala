'use client'

import { classes } from '@/lib/game/onboarding-data'
import { cn } from '@/lib/utils'
import * as Accordion from '@radix-ui/react-accordion'
import { ChevronDown } from 'lucide-react'

interface SelectorProps {
  selectedId: string
  onSelect: (id: string) => void
  isMobile?: boolean
}

export function ClassSelector({ selectedId, onSelect, isMobile }: SelectorProps) {
  const selectedClass = classes.find((c) => c.id === selectedId)!

  if (isMobile) {
    return (
      <Accordion.Item
        value="class"
        className="border-game-gold-muted overflow-hidden rounded-lg border bg-black/80 backdrop-blur-sm"
      >
        <Accordion.Header>
          <Accordion.Trigger className="group text-game-gold hover:bg-game-copper/20 flex w-full items-center justify-between p-3 text-sm transition-colors sm:p-4 sm:text-base">
            <span style={{ fontFamily: 'var(--font-fantasy)' }}>
              Vyber své povolání ({selectedClass.name})
            </span>
            <ChevronDown className="h-4 w-4 transition-transform group-data-[state=open]:rotate-180 sm:h-5 sm:w-5" />
          </Accordion.Trigger>
        </Accordion.Header>
        <Accordion.Content className="data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down overflow-hidden">
          <div className="p-3 sm:p-4">
            <div className="mb-2 grid grid-cols-3 gap-1.5 sm:gap-2">
              {classes.map((c) => {
                const Icon = c.icon
                const isSelected = selectedId === c.id
                return (
                  <button
                    key={c.id}
                    onClick={() => onSelect(c.id)}
                    className={cn(
                      'flex min-h-15 flex-col items-center justify-center gap-0.5 rounded-lg border-2 p-2 transition-all sm:min-h-17.5 sm:gap-1 sm:p-3',
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
                      {c.name}
                    </span>
                  </button>
                )
              })}
            </div>
            <ClassInfo classData={selectedClass} />
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
        Vyber své povolání
      </h2>
      <div className="grid grid-cols-3 gap-3">
        {classes.map((c) => {
          const Icon = c.icon
          const isSelected = selectedId === c.id
          return (
            <button
              key={c.id}
              onClick={() => onSelect(c.id)}
              className={cn(
                'flex flex-col items-center justify-center gap-2 rounded-lg border-2 p-3 transition-all',
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
                {c.name}
              </span>
            </button>
          )
        })}
      </div>
      <ClassInfo classData={selectedClass} />
    </div>
  )
}

function ClassInfo({ classData }: { classData: (typeof classes)[0] }) {
  const isCaster = ['mage', 'necromancer'].includes(classData.id)
  const isTank = ['warrior', 'paladin'].includes(classData.id)

  return (
    <div className="border-game-copper rounded border bg-black/60 p-3">
      <p className="text-game-gold-muted mb-2 text-xs leading-relaxed">{classData.desc}</p>
      <div className="mb-2">
        <span
          className={cn(
            'inline-block rounded border px-2 py-0.5 text-[10px]',
            isCaster
              ? 'border-purple-400 bg-purple-400/20 text-purple-400'
              : isTank
                ? 'border-red-400 bg-red-400/20 text-red-400'
                : 'border-game-gold bg-game-gold/20 text-game-gold'
          )}
          style={{ fontFamily: 'var(--font-fantasy)' }}
        >
          {isCaster ? 'Kouzlící' : isTank ? 'Tank' : 'Hybrid'}
        </span>
      </div>
      <div className="border-game-copper/30 mt-2 space-y-2 border-t pt-2">
        <p className="text-game-gold text-xs" style={{ fontFamily: 'var(--font-fantasy)' }}>
          Bonusy povolání:
        </p>
        {Object.entries(classData.statMod)
          .filter(([_, val]) => val !== 0)
          .map(([stat, val]) => (
            <div key={stat} className="space-y-1">
              <div className="flex justify-between text-[10px]">
                <span className="text-game-gold-muted capitalize">{stat}</span>
                <span className={val > 0 ? 'text-game-success' : 'text-game-danger'}>
                  {val > 0 ? '+' : ''}
                  {val}
                </span>
              </div>
              <div className="h-1 w-full overflow-hidden rounded-full bg-black/60">
                <div
                  className={`h-full ${val > 0 ? 'bg-game-success' : 'bg-game-danger'}`}
                  style={{ width: `${Math.abs(val) * 10}%` }}
                ></div>
              </div>
            </div>
          ))}
        <p className="text-[10px] text-[#8b7355] italic">{classData.bonuses}</p>
      </div>
    </div>
  )
}
