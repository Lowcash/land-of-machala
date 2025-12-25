import { Brain, Heart, Shield, Sparkles, Sword, User, Wind, Zap } from 'lucide-react'
import { Tooltip } from '@/components/ui/CustomTooltip'

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
}: any) {
  const resourceColor =
    resourceType === 'energy' ? 'from-yellow-700 to-yellow-500' : 'from-blue-900 to-blue-600'
  const resourceBorder = resourceType === 'energy' ? 'border-yellow-900/50' : 'border-blue-900/50'
  const resourceLabel = resourceType === 'energy' ? 'Energie' : 'Mana'

  return (
    <div
      className={`group relative overflow-hidden rounded-lg border-2 bg-black/90 shadow-2xl backdrop-blur-md transition-all duration-300 select-none ${
        isEnemy
          ? 'border-red-900/80 hover:border-red-700 hover:shadow-[0_0_40px_rgba(220,38,38,0.4)]'
          : 'border-[#d4a574] hover:border-[#ffd700] hover:shadow-[0_0_40px_rgba(212,165,116,0.4)]'
      }`}
    >
      {/* Animated Background Gradient */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-black/20 transition-opacity group-hover:from-white/10" />
      
      {/* Subtle glow effect on hover */}
      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
        <div className={`absolute inset-0 bg-gradient-radial ${isEnemy ? 'from-red-500/10' : 'from-[#ffd700]/10'} via-transparent to-transparent`} />
      </div>

      <div className="relative z-10 flex h-24 items-stretch">
        {/* Avatar Section - Enhanced */}
        <div
          className={`relative w-24 shrink-0 border-r-2 ${
            isEnemy ? 'border-red-900/80' : 'border-[#8b6f47]'
          } ${
            isEnemy ? 'from-red-950/50 to-black/60' : 'from-[#1a1410]/80 to-black/60'
          } flex items-center justify-center bg-gradient-to-br transition-all`}
        >
          {image ? (
            <div className="relative h-full w-full overflow-hidden">
              <img
                src={image}
                alt={name}
                className="h-full w-full object-cover grayscale-[20%] transition-all duration-500 group-hover:scale-110 group-hover:grayscale-0"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            </div>
          ) : (
            <div className="flex flex-col items-center gap-1">
              <User
                className={`h-10 w-10 transition-all duration-300 ${
                  isEnemy ? 'text-red-400/30 group-hover:text-red-400/50' : 'text-[#8b6f47]/50 group-hover:text-[#d4a574]/70'
                }`}
              />
            </div>
          )}

          {/* Level Badge - Enhanced with glow */}
          <div
            className={`absolute top-0 left-0 rounded-br border-r border-b px-2 py-1 text-xs font-bold text-white shadow-lg transition-all duration-300 ${
              isEnemy
                ? 'border-red-700 bg-red-900/90 group-hover:shadow-red-500/50'
                : 'border-[#ffd700]/50 bg-gradient-to-br from-[#d4a574] to-[#8b6f47] group-hover:shadow-[#ffd700]/50'
            }`}
            style={{ fontFamily: 'var(--font-fantasy)' }}
          >
            LVL {level}
          </div>
        </div>

        {/* Info Section - Enhanced spacing */}
        <div className="flex min-w-0 flex-1 flex-col justify-between bg-gradient-to-r from-black/60 to-transparent p-3">
          {/* Header: Name & XP */}
          <div className="mb-2 flex items-baseline justify-between">
            <h3
              className={`truncate pr-2 text-base tracking-wide transition-colors ${
                isEnemy ? 'text-red-400 group-hover:text-red-300' : 'text-[#ffd700] group-hover:text-[#ffed4e]'
              }`}
              style={{ fontFamily: 'var(--font-fantasy)' }}
            >
              {name}
            </h3>
            {!isEnemy && xp !== undefined && (
              <Tooltip content={`Zkušenosti: ${xp} / ${xpMax}`}>
                <div className="flex items-center gap-1.5 font-mono text-[10px] text-[#d4a574] transition-colors group-hover:text-[#ffd700]">
                  <Sparkles className="h-3 w-3" />
                  <div className="h-1.5 w-16 overflow-hidden rounded-full border border-[#8b6f47]/30 bg-black/60 shadow-inner">
                    <div
                      className="h-full bg-gradient-to-r from-[#ffd700] to-[#ffed4e] transition-all duration-500"
                      style={{ width: `${(xp / xpMax) * 100}%` }}
                    />
                  </div>
                  <span>{Math.floor((xp / xpMax) * 100)}%</span>
                </div>
              </Tooltip>
            )}
          </div>

          {/* Bars Container - Enhanced */}
          <div className="space-y-2">
            {/* HP Bar */}
            <Tooltip content={`Životy: ${Math.round(hp)} / ${hpMax}`}>
              <div className="group/bar relative h-4 overflow-hidden rounded border-2 border-red-900/40 bg-black/60 shadow-inner transition-all hover:border-red-700/60">
                <div
                  className="absolute inset-0 bg-gradient-to-r from-red-900 to-red-600 transition-all duration-300"
                  style={{ width: `${Math.max(0, Math.min(100, (hp / hpMax) * 100))}%` }}
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-white/10 to-transparent" />
                <div className="pointer-events-none absolute inset-0 flex items-center gap-1.5 px-2">
                  <Heart className="h-3 w-3 text-white drop-shadow-md" />
                  <span
                    className="z-10 font-mono text-[10px] font-semibold text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]"
                    style={{ fontFamily: 'var(--font-fantasy)' }}
                  >
                    {Math.round(hp)} / {hpMax}
                  </span>
                </div>
              </div>
            </Tooltip>

            {/* Resource Bar */}
            <Tooltip content={`${resourceLabel}: ${Math.round(mana)} / ${manaMax}`}>
              <div
                className={`group/bar relative h-4 overflow-hidden rounded border-2 bg-black/60 shadow-inner transition-all ${resourceBorder} hover:opacity-100`}
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-r ${resourceColor} transition-all duration-300`}
                  style={{ width: `${Math.max(0, Math.min(100, (mana / manaMax) * 100))}%` }}
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-white/10 to-transparent" />
                <div className="pointer-events-none absolute inset-0 flex items-center gap-1.5 px-2">
                  <Zap className="h-3 w-3 text-white drop-shadow-md" />
                  <span
                    className="z-10 font-mono text-[10px] font-semibold text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]"
                    style={{ fontFamily: 'var(--font-fantasy)' }}
                  >
                    {Math.round(mana)} / {manaMax}
                  </span>
                </div>
              </div>
            </Tooltip>
          </div>

          {/* Stats Row - Enhanced with tooltips */}
          {stats && !isEnemy && (
            <div className="mt-2 flex items-center gap-4 opacity-90 transition-opacity group-hover:opacity-100">
              <Tooltip content="Síla - Ovlivňuje fyzický útok">
                <StatCompact icon={Sword} val={stats.strength} color="text-[#ff6b6b]" />
              </Tooltip>
              <Tooltip content="Inteligence - Ovlivňuje magii">
                <StatCompact icon={Brain} val={stats.intelligence} color="text-[#b66bd4]" />
              </Tooltip>
              <Tooltip content="Obratnost - Ovlivňuje krit a vyhýbání">
                <StatCompact icon={Wind} val={stats.agility} color="text-[#ffd700]" />
              </Tooltip>
              <Tooltip content="Výdrž - Ovlivňuje HP a obranu">
                <StatCompact icon={Shield} val={stats.stamina} color="text-[#69ccf0]" />
              </Tooltip>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function StatCompact({ icon: Icon, val, color }: any) {
  return (
    <div className="flex items-center gap-1 transition-transform hover:scale-110">
      <Icon className={`h-3.5 w-3.5 ${color} drop-shadow-md`} />
      <span
        className="font-mono text-[10px] font-semibold text-[#d4a574]"
        style={{ fontFamily: 'var(--font-fantasy)' }}
      >
        {val}
      </span>
    </div>
  )
}
