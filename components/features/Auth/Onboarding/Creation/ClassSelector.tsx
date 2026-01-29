import { classes, isCasterClass, isTankClass } from '@/lib/game/onboarding'
import { cn } from '@/lib/utils'

import { EntitySelector } from './EntitySelector'

interface SelectorProps {
  selectedId: string
  searchParams?: { [key: string]: string | string[] | undefined }
  isMobile?: boolean
}

interface SelectorProps {
  selectedId: string
  searchParams?: { [key: string]: string | string[] | undefined }
  isMobile?: boolean
}

export function ClassSelector({ selectedId, searchParams, isMobile }: SelectorProps) {
  return (
    <EntitySelector
      items={classes}
      selectedId={selectedId}
      paramName="class"
      searchParams={searchParams}
      isMobile={isMobile}
      title="Vyber své povolání"
      renderDetail={(c) => <ClassInfo classData={c} />}
    />
  )
}

function ClassInfo({ classData }: { classData: (typeof classes)[0] }) {
  const isCaster = isCasterClass(classData.id)
  const isTank = isTankClass(classData.id)

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
