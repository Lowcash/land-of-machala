import { Brain, Shield, Sword, User, Wind } from 'lucide-react'

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

  return (
    <div
      className={`group relative border-2 bg-black/90 backdrop-blur-md ${isEnemy ? 'border-red-900/80' : 'border-[#d4a574]'} overflow-hidden rounded-lg shadow-2xl transition-all duration-300 select-none hover:shadow-[0_0_30px_rgba(212,165,116,0.3)]`}
    >
      {/* Background Gradient */}
      <div className="pointer-events-none absolute inset-0 bg-linear-to-br from-white/5 via-transparent to-black/20" />

      <div className="relative z-10 flex h-20 items-stretch">
        {/* Avatar Section */}
        <div
          className={`relative w-20 shrink-0 border-r-2 ${isEnemy ? 'border-red-900/80' : 'border-[#8b6f47]'} bg-linear-to-br ${isEnemy ? 'from-red-950/50 to-black/60' : 'from-[#1a1410]/80 to-black/60'} flex items-center justify-center`}
        >
          {image ? (
            <img
              src={image}
              alt={name}
              className="h-full w-full object-cover grayscale-[20%] transition-all duration-500 group-hover:grayscale-0"
            />
          ) : (
            <div className="flex flex-col items-center gap-1">
              <User className={`h-8 w-8 ${isEnemy ? 'text-red-400/30' : 'text-[#8b6f47]/50'}`} />
            </div>
          )}

          {/* Level Badge - Modern corner style */}
          <div
            className={`absolute top-0 left-0 ${isEnemy ? 'bg-red-900/90' : 'bg-linear-to-br from-[#d4a574] to-[#8b6f47]'} rounded-br border-r border-b px-1.5 py-0.5 text-[10px] text-white ${isEnemy ? 'border-red-700' : 'border-[#ffd700]/50'} shadow-lg`}
            style={{ fontFamily: 'var(--font-fantasy)' }}
          >
            LVL {level}
          </div>
        </div>

        {/* Info Section */}
        <div className="flex min-w-0 flex-1 flex-col justify-between bg-gradient-to-r from-black/60 to-transparent p-2.5">
          {/* Header: Name & XP */}
          <div className="mb-1.5 flex items-baseline justify-between">
            <h3
              className={`truncate pr-2 text-sm tracking-wide ${isEnemy ? 'text-red-400' : 'text-[#ffd700]'}`}
              style={{ fontFamily: 'var(--font-fantasy)' }}
            >
              {name}
            </h3>
            {!isEnemy && xp !== undefined && (
              <div className="flex items-center gap-1 font-mono text-[9px] text-[#d4a574]">
                <span>XP</span>
                <div className="h-1 w-12 overflow-hidden rounded-full border border-[#8b6f47]/30 bg-black/60">
                  <div
                    className="h-full bg-gradient-to-r from-[#ffd700] to-[#ffed4e]"
                    style={{ width: `${(xp / xpMax) * 100}%` }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Bars Container */}
          <div className="space-y-1.5">
            {/* HP Bar */}
            <div className="relative h-3.5 overflow-hidden rounded border-2 border-red-900/40 bg-black/60 shadow-inner transition-colors group-hover:border-red-700/50">
              <div
                className="absolute inset-0 bg-gradient-to-r from-red-900 to-red-600 transition-all duration-300"
                style={{ width: `${Math.max(0, Math.min(100, (hp / hpMax) * 100))}%` }}
              />
              <div className="absolute inset-0 bg-linear-to-t from-white/10 to-transparent" />
              <div className="absolute inset-0 flex items-center justify-center gap-1">
                <span
                  className="z-10 font-mono text-[9px] text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)]"
                  style={{ fontFamily: 'var(--font-fantasy)' }}
                >
                  {Math.round(hp)} / {hpMax}
                </span>
              </div>
            </div>

            {/* Resource Bar */}
            <div
              className={`h-3.5 rounded border-2 bg-black/60 ${resourceBorder} relative overflow-hidden shadow-inner`}
            >
              <div
                className={`absolute inset-0 bg-gradient-to-r ${resourceColor} transition-all duration-300`}
                style={{ width: `${Math.max(0, Math.min(100, (mana / manaMax) * 100))}%` }}
              />
              <div className="absolute inset-0 bg-linear-to-t from-white/10 to-transparent" />
              <div className="absolute inset-0 flex items-center justify-center gap-1">
                <span
                  className="z-10 font-mono text-[9px] text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)]"
                  style={{ fontFamily: 'var(--font-fantasy)' }}
                >
                  {Math.round(mana)} / {manaMax}
                </span>
              </div>
            </div>
          </div>

          {/* Stats Row - Updated with new design */}
          {stats && !isEnemy && (
            <div className="mt-1.5 flex items-center gap-3 opacity-90 transition-opacity group-hover:opacity-100">
              <StatCompact icon={Sword} val={stats.strength} color="text-[#ff6b6b]" />
              <StatCompact icon={Brain} val={stats.intelligence} color="text-[#b66bd4]" />
              <StatCompact icon={Wind} val={stats.agility} color="text-[#ffd700]" />
              <StatCompact icon={Shield} val={stats.stamina} color="text-[#69ccf0]" />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function StatCompact({ icon: Icon, val, color }: any) {
  return (
    <div className="flex items-center gap-0.5">
      <Icon className={`h-3 w-3 ${color}`} />
      <span
        className="font-mono text-[9px] text-[#d4a574]"
        style={{ fontFamily: 'var(--font-fantasy)' }}
      >
        {val}
      </span>
    </div>
  )
}
