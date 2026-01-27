import { Activity, Brain, Droplet, Heart, Sword, Wind } from 'lucide-react'

import { races } from '@/lib/game/onboarding'

import { EntitySelector } from './EntitySelector'

interface SelectorProps {
  selectedId: string
  searchParams?: { [key: string]: string | string[] | undefined }
  isMobile?: boolean
}

export function RaceSelector({ selectedId, searchParams, isMobile }: SelectorProps) {
  return (
    <EntitySelector
      items={races}
      selectedId={selectedId}
      paramName="race"
      searchParams={searchParams}
      isMobile={isMobile}
      title="Vyber svou rasu"
      renderDetail={(race) => <RaceInfo race={race} />}
    />
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
