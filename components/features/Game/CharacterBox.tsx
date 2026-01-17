import { Brain, Shield, Sword, User, Wind } from 'lucide-react'
import Image from 'next/image'

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
}: CharacterBoxProps) {
  const hpPercent = Math.max(0, Math.min(100, (hp / hpMax) * 100))
  const resourcePercent = Math.max(0, Math.min(100, (mana / manaMax) * 100))
  const xpPercent = xp && xpMax ? Math.max(0, Math.min(100, (xp / xpMax) * 100)) : 0

  return (
    <div
      className={`group relative overflow-hidden rounded-xl border-2 shadow-lg transition-all duration-300 ${
        isEnemy
          ? 'border-red-900 bg-red-950/60 shadow-[0_0_15px_rgba(220,38,38,0.2)]'
          : 'border-[#8b6f47] bg-linear-to-br from-[#1a1408] via-[#2a1f10] to-[#1a1408] shadow-[0_8px_32px_rgba(139,111,71,0.4),0_0_64px_rgba(255,215,0,0.1)]'
      }`}
    >
      {/* Medieval Corner Decorations with Scrollwork */}
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
        {/* Avatar - Compacted */}
        <div className="relative mr-4 shrink-0">
          <div
            className={`flex h-20 w-20 items-center justify-center overflow-hidden rounded-lg border-2 shadow-inner ${
              isEnemy ? 'border-red-900 bg-red-950' : 'border-[#8b6f47] bg-black'
            }`}
          >
            {image ? (
              <Image
                src={image}
                alt={name}
                width={80}
                height={80}
                className="h-full w-full object-cover opacity-90 transition-opacity group-hover:opacity-100"
              />
            ) : (
              <User className={`h-10 w-10 ${isEnemy ? 'text-red-500/70' : 'text-[#d4a574]/70'}`} />
            )}
          </div>
          {/* Level Bubble - moved overlap with glow */}
          <div
            className={`absolute -right-2 -bottom-2 flex h-8 w-8 items-center justify-center rounded-full border-2 ${
              isEnemy
                ? 'border-red-800 bg-red-950 text-red-200 shadow-[0_0_10px_rgba(220,38,38,0.5)]'
                : 'border-[#ffd700] bg-linear-to-br from-[#8b6f47] to-[#5a4a2e] text-[#ffd700] shadow-[0_0_10px_rgba(255,215,0,0.4)]'
            } text-sm font-bold`}
          >
            {level}
          </div>
        </div>

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

          {/* Vitals Bars - Thicker and with Text */}
          <div className="w-full space-y-1.5">
            {/* HP Bar */}
            <div className="relative h-4 w-full overflow-hidden rounded bg-black/80 ring-1 ring-white/10">
              <div
                className="absolute inset-0 bg-linear-to-r from-red-900 via-red-700 to-red-600 transition-all duration-300"
                style={{ width: `${hpPercent}%` }}
              />
              <div className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-white shadow-black drop-shadow-md">
                {Math.round(hp)} / {hpMax} HP
              </div>
            </div>

            {/* Mana Bar */}
            <div className="relative h-4 w-full overflow-hidden rounded bg-black/80 ring-1 ring-white/10">
              <div
                className={`absolute inset-0 bg-linear-to-r from-blue-900 via-blue-700 to-blue-500 transition-all duration-300`}
                style={{ width: `${resourcePercent}%` }}
              />
              <div className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-white shadow-black drop-shadow-md">
                {Math.round(mana)} / {manaMax} {resourceType === 'energy' ? 'EN' : 'MP'}
              </div>
            </div>
          </div>

          {/* XP Bar - Tiny */}
          {!isEnemy && xp !== undefined && (
            <div className="mt-1 flex items-center gap-2 text-[9px] text-[#8b7355]">
              <span className="font-bold">XP</span>
              <div className="relative h-1.5 flex-1 overflow-hidden rounded-full bg-black/40">
                <div className="absolute inset-0 bg-[#d4a574]" style={{ width: `${xpPercent}%` }} />
              </div>
              <span>{Math.floor(xpPercent)}%</span>
            </div>
          )}
        </div>
      </div>

      {/* Stats - Horizontal Strip */}
      {stats && !isEnemy && (
        <div className="flex divide-x divide-[#8b6f47]/20 border-t border-[#8b6f47]/30 bg-[#120f0a]/50">
          <StatItem icon={Sword} value={stats.strength} label="STR" color="text-red-400" />
          <StatItem icon={Brain} value={stats.intelligence} label="INT" color="text-purple-400" />
          <StatItem icon={Wind} value={stats.agility} label="AGI" color="text-yellow-400" />
          <StatItem icon={Shield} value={stats.stamina} label="STA" color="text-blue-400" />
        </div>
      )}
    </div>
  )
}

interface StatItemProps {
  icon: typeof Sword
  value: number
  label: string
  color: string
}

function StatItem({ icon: Icon, value, label, color }: StatItemProps) {
  return (
    <div className="flex flex-1 flex-col items-center py-2 transition-colors hover:bg-white/5">
      <span className={`mb-0.5 text-[10px] font-bold tracking-wider text-[#8b7355] uppercase`}>
        {label}
      </span>
      <div className="flex items-center gap-1.5">
        <Icon className={`h-3.5 w-3.5 ${color}`} />
        <span className="text-sm font-medium text-[#d4a574]">{value}</span>
      </div>
    </div>
  )
}
