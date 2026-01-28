import { Coins, MapPin } from 'lucide-react'

import { CharacterAvatar } from './CharacterParts/CharacterAvatar'
import { CharacterStats } from './CharacterParts/CharacterStats'
import { CharacterVitals } from './CharacterParts/CharacterVitals'

interface CharacterBoxProps {
  name: string
  level: number
  hp: number
  hpMax: number
  mana: number
  manaMax: number
  stats?: {
    strength: number
    intelligence: number
    agility: number
    stamina: number
  }
  isEnemy: boolean
  xp?: number
  xpMax?: number
  image?: string
  resourceType?: 'mana' | 'energy'
  gold?: number
  locationName?: string
}

export function CharacterBox({
  name,
  level,
  hp,
  hpMax,
  mana,
  manaMax,
  stats,
  isEnemy,
  xp,
  xpMax,
  image,
  resourceType = 'mana',
  gold,
  locationName,
}: CharacterBoxProps) {
  return (
    <div
      className={`group relative overflow-hidden rounded-xl border-2 shadow-lg transition-all duration-300 ${
        isEnemy
          ? 'border-red-900 bg-red-950/60 shadow-[0_0_15px_rgba(220,38,38,0.2)]'
          : 'border-[#8b6f47] bg-linear-to-br from-[#1a1408] via-[#2a1f10] to-[#1a1408] shadow-[0_8px_32px_rgba(139,111,71,0.4),0_0_64px_rgba(255,215,0,0.1)]'
      }`}
    >
      {/* Medieval Corner Decorations with Scrollwork */}
      <CornerDecorations />

      {/* Parchment Texture Overlay with Paper Grain */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.2)_100%)] opacity-50"></div>
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            'repeating-linear-gradient(0deg, #000 0px, transparent 1px, transparent 2px, #000 3px)',
        }}
      ></div>

      <div className="flex p-3 sm:p-4">
        <CharacterAvatar name={name} level={level} isEnemy={isEnemy} image={image} />

        {/* Info Column */}
        <div className="flex min-w-0 flex-1 flex-col justify-center space-y-2">
          {/* Name & Class */}
          <div className="flex items-center justify-between">
            <h3
              className={`truncate text-lg leading-none font-bold tracking-wide ${
                isEnemy ? 'text-red-400' : 'text-[#f5e6d3]'
              }`}
              style={{ fontFamily: 'var(--font-medieval)' }}
            >
              {name}
            </h3>
          </div>

          <CharacterVitals
            hp={hp}
            hpMax={hpMax}
            mana={mana}
            manaMax={manaMax}
            xp={xp}
            xpMax={xpMax}
            isEnemy={isEnemy}
            resourceType={resourceType}
          />
        </div>
      </div>

      {stats && <CharacterStats stats={stats} />}

      {/* Money & Location Footer (for Player) */}
      {!isEnemy && (gold !== undefined || locationName) && (
        <div className="flex items-center justify-between border-t border-[#8b6f47]/30 bg-black/40 px-3 py-1.5 text-xs text-[#d4a574]">
          {locationName && (
            <div className="flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5 text-[#8b7355]" />
              <span style={{ fontFamily: 'var(--font-fantasy)' }}>{locationName}</span>
            </div>
          )}
          {gold !== undefined && (
            <div className="flex items-center gap-1.5 font-bold text-[#ffd700]">
              <Coins className="h-3.5 w-3.5" />
              <span>{gold} zl</span>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

function CornerDecorations() {
  return (
    <>
      <div className="absolute top-0 left-0 h-10 w-10 border-t-2 border-l-2 border-[#d4a574]/40">
        <div className="absolute top-1 left-1 h-2 w-2 rounded-full bg-[#d4a574]/20"></div>
      </div>
      <div className="absolute top-0 right-0 h-10 w-10 border-t-2 border-r-2 border-[#d4a574]/40">
        <div className="absolute top-1 right-1 h-2 w-2 rounded-full bg-[#d4a574]/20"></div>
      </div>
      <div className="absolute bottom-0 left-0 h-10 w-10 border-b-2 border-l-2 border-[#d4a574]/40">
        <div className="absolute bottom-1 left-1 h-2 w-2 rounded-full bg-[#d4a574]/20"></div>
      </div>
      <div className="absolute right-0 bottom-0 h-10 w-10 border-r-2 border-b-2 border-[#d4a574]/40">
        <div className="absolute right-1 bottom-1 h-2 w-2 rounded-full bg-[#d4a574]/20"></div>
      </div>
    </>
  )
}
