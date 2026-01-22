'use client'

import { classes } from '@/lib/game/onboarding-data'
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
        className="overflow-hidden rounded-lg border border-[#d4a574] bg-black/80 backdrop-blur-sm"
      >
        <Accordion.Header>
          <Accordion.Trigger className="group flex w-full items-center justify-between p-3 text-sm text-[#ffd700] transition-colors hover:bg-[#8b6f47]/20 sm:p-4 sm:text-base">
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
                return (
                  <button
                    key={c.id}
                    onClick={() => onSelect(c.id)}
                    className={`flex min-h-15 flex-col items-center justify-center gap-0.5 rounded-lg border-2 p-2 transition-all sm:min-h-17.5 sm:gap-1 sm:p-3 ${
                      selectedId === c.id
                        ? 'scale-105 border-[#ffd700] bg-linear-to-br from-[#8b6f47] to-[#6d5a3e] shadow-lg'
                        : 'border-[#8b6f47]/50 bg-black/40 hover:scale-105 hover:border-[#ffd700]'
                    }`}
                  >
                    <Icon
                      className={`h-4 w-4 sm:h-5 sm:w-5 ${selectedId === c.id ? 'text-[#ffd700]' : 'text-[#d4a574]'}`}
                    />
                    <span
                      className={`text-[10px] sm:text-xs ${selectedId === c.id ? 'text-[#ffd700]' : 'text-[#d4a574]'}`}
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
    <div className="flex flex-col gap-4 rounded-lg border-2 border-[#d4a574] bg-black/90 p-4 shadow-2xl backdrop-blur-md">
      <h2
        className="text-center text-xl text-[#ffd700]"
        style={{ fontFamily: 'var(--font-fantasy)' }}
      >
        Vyber své povolání
      </h2>
      <div className="grid grid-cols-3 gap-3">
        {classes.map((c) => {
          const Icon = c.icon
          return (
            <button
              key={c.id}
              onClick={() => onSelect(c.id)}
              className={`flex flex-col items-center justify-center gap-2 rounded-lg border-2 p-3 transition-all ${
                selectedId === c.id
                  ? 'scale-105 border-[#ffd700] bg-linear-to-br from-[#8b6f47] to-[#6d5a3e] shadow-lg'
                  : 'border-[#8b6f47]/50 bg-black/40 hover:scale-105 hover:border-[#ffd700]'
              }`}
            >
              <Icon
                className={`h-6 w-6 ${selectedId === c.id ? 'text-[#ffd700]' : 'text-[#d4a574]'}`}
              />
              <span
                className={`text-xs ${selectedId === c.id ? 'text-[#ffd700]' : 'text-[#d4a574]'}`}
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
  return (
    <div className="rounded border border-[#8b6f47] bg-black/60 p-3">
      <p className="mb-2 text-xs leading-relaxed text-[#d4a574]">{classData.desc}</p>
      <div className="mb-2">
        <span
          className={`inline-block rounded border px-2 py-0.5 text-[10px] ${
            ['mage', 'necromancer'].includes(classData.id)
              ? 'border-[#c084fc] bg-[#c084fc]/20 text-[#c084fc]'
              : ['warrior', 'paladin'].includes(classData.id)
                ? 'border-[#ff6b6b] bg-[#ff6b6b]/20 text-[#ff6b6b]'
                : 'border-[#ffd700] bg-[#ffd700]/20 text-[#ffd700]'
          }`}
          style={{ fontFamily: 'var(--font-fantasy)' }}
        >
          {['mage', 'necromancer'].includes(classData.id)
            ? 'Kouzlící'
            : ['warrior', 'paladin'].includes(classData.id)
              ? 'Tank'
              : 'Hybrid'}
        </span>
      </div>
      <div className="mt-2 space-y-2 border-t border-[#8b6f47]/30 pt-2">
        <p className="text-xs text-[#ffd700]" style={{ fontFamily: 'var(--font-fantasy)' }}>
          Bonusy povolání:
        </p>
        {Object.entries(classData.statMod)
          .filter(([_, val]) => val !== 0)
          .map(([stat, val]) => (
            <div key={stat} className="space-y-1">
              <div className="flex justify-between text-[10px]">
                <span className="text-[#d4a574] capitalize">{stat}</span>
                <span className={val > 0 ? 'text-[#6fbf6f]' : 'text-[#ff6b6b]'}>
                  {val > 0 ? '+' : ''}
                  {val}
                </span>
              </div>
              <div className="h-1 w-full overflow-hidden rounded-full bg-black/60">
                <div
                  className={`h-full ${val > 0 ? 'bg-[#6fbf6f]' : 'bg-[#ff6b6b]'}`}
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
