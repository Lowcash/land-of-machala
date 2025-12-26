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
    resourceType === 'energy' ? 'from-amber-500 via-yellow-400 to-amber-300' : 'from-blue-600 via-blue-400 to-cyan-300'
  const resourceLabel = resourceType === 'energy' ? 'Energie' : 'Mana'

  const hpPercent = Math.max(0, Math.min(100, (hp / hpMax) * 100))
  const resourcePercent = Math.max(0, Math.min(100, (mana / manaMax) * 100))

  return (
    <div
      className={`group relative rounded-lg overflow-hidden shadow-2xl transition-all duration-300 select-none ${
        isEnemy
          ? 'bg-gradient-to-br from-red-950/90 via-black/95 to-red-900/80 border-2 border-red-800/70 hover:border-red-700 hover:shadow-[0_0_40px_rgba(220,38,38,0.5)]'
          : 'bg-gradient-to-br from-amber-950/40 via-black/90 to-amber-900/30 border-2 border-amber-700/60 hover:border-amber-600 hover:shadow-[0_0_40px_rgba(217,119,6,0.4)]'
      }`}
    >
      {/* Medieval ornamental corners */}
      <div className="pointer-events-none absolute inset-0">
        {/* Top corners */}
        <div className="absolute top-1 left-1 h-6 w-6">
          <div className="absolute top-0 left-0 h-full w-0.5 bg-gradient-to-b from-amber-400/60 via-amber-600/30 to-transparent" />
          <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-amber-400/60 via-amber-600/30 to-transparent" />
        </div>
        <div className="absolute top-1 right-1 h-6 w-6">
          <div className="absolute top-0 right-0 h-full w-0.5 bg-gradient-to-b from-amber-400/60 via-amber-600/30 to-transparent" />
          <div className="absolute top-0 right-0 w-full h-0.5 bg-gradient-to-l from-amber-400/60 via-amber-600/30 to-transparent" />
        </div>
        {/* Bottom corners */}
        <div className="absolute bottom-1 left-1 h-6 w-6">
          <div className="absolute bottom-0 left-0 h-full w-0.5 bg-gradient-to-t from-amber-400/60 via-amber-600/30 to-transparent" />
          <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-amber-400/60 via-amber-600/30 to-transparent" />
        </div>
        <div className="absolute bottom-1 right-1 h-6 w-6">
          <div className="absolute bottom-0 right-0 h-full w-0.5 bg-gradient-to-t from-amber-400/60 via-amber-600/30 to-transparent" />
          <div className="absolute bottom-0 right-0 w-full h-0.5 bg-gradient-to-l from-amber-400/60 via-amber-600/30 to-transparent" />
        </div>
      </div>

      {/* Shield emblem background */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-[0.03]">
        <Shield className="h-32 w-32 text-amber-500" />
      </div>

      {/* Parchment texture overlay */}
      <div 
        className="pointer-events-none absolute inset-0 opacity-[0.04] mix-blend-overlay" 
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E")`
        }} 
      />

      <div className="relative z-10 flex h-24 items-stretch">
        {/* Avatar Section */}
        <div 
          className={`relative w-24 shrink-0 border-r-2 ${
            isEnemy ? 'border-red-900/60' : 'border-amber-800/50'
          } bg-gradient-to-br ${
            isEnemy ? 'from-red-950/80 via-black/85 to-red-900/60' : 'from-amber-950/50 via-black/75 to-amber-900/40'
          } flex items-center justify-center overflow-hidden`}
        >
          {image ? (
            <div className="relative h-full w-full">
              <img 
                src={image} 
                alt={name} 
                className="h-full w-full object-cover transition-all duration-700 group-hover:scale-110" 
                style={{ filter: 'sepia(20%) contrast(108%) brightness(95%)' }} 
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/70" />
            </div>
          ) : (
            <User 
              className={`h-14 w-14 ${
                isEnemy ? 'text-red-600/40 group-hover:text-red-500/60' : 'text-amber-700/50 group-hover:text-amber-600/70'
              } transition-colors`} 
            />
          )}
          
          {/* Level badge with medieval shield style */}
          <div 
            className={`absolute -top-1 -left-1 flex h-9 w-9 items-center justify-center rounded-full shadow-2xl transition-all duration-300 ${
              isEnemy 
                ? 'bg-gradient-to-br from-red-700 via-red-800 to-red-950 ring-2 ring-red-600/50 group-hover:ring-red-500/70' 
                : 'bg-gradient-to-br from-amber-500 via-amber-700 to-amber-900 ring-2 ring-amber-400/60 group-hover:ring-amber-300/80'
            }`}
          >
            <span 
              className="text-xs font-black text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]" 
              style={{ fontFamily: 'var(--font-fantasy)' }}
            >
              {level}
            </span>
          </div>
        </div>

        {/* Info Section */}
        <div className="flex min-w-0 flex-1 flex-col justify-between p-3">
          {/* Name & XP */}
          <div>
            <h3 
              className={`mb-1.5 truncate text-lg font-black leading-none tracking-wide ${
                isEnemy 
                  ? 'text-red-400 drop-shadow-[0_0_8px_rgba(248,113,113,0.6)]' 
                  : 'text-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.6)]'
              } transition-all group-hover:tracking-wider`} 
              style={{ fontFamily: 'var(--font-fantasy)' }}
            >
              {name}
            </h3>
            {!isEnemy && xp !== undefined && (
              <Tooltip content={`Zkušenosti: ${xp.toLocaleString()} / ${xpMax.toLocaleString()}`}>
                <div className="flex items-center gap-2">
                  <Sparkles className="h-3.5 w-3.5 text-amber-400 drop-shadow-[0_0_6px_rgba(251,191,36,0.7)]" />
                  <div className="relative h-2 flex-1 overflow-hidden rounded-full border border-amber-900/60 bg-black/70 shadow-inner">
                    <div 
                      className="h-full bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-300 shadow-[0_0_8px_rgba(251,191,36,0.6)]" 
                      style={{ width: `${(xp / xpMax) * 100}%` }} 
                    />
                  </div>
                  <span className="font-mono text-xs font-bold text-amber-300 drop-shadow">
                    {Math.floor((xp / xpMax) * 100)}%
                  </span>
                </div>
              </Tooltip>
            )}
          </div>

          {/* Vitals */}
          <div className="space-y-1.5">
            <Tooltip content={`Životy: ${Math.round(hp)} / ${hpMax}`}>
              <div className="group/hp relative h-5 overflow-hidden rounded border-2 border-red-950/80 bg-gradient-to-b from-black/80 to-black/60 shadow-lg">
                <div 
                  className="absolute inset-0 bg-gradient-to-r from-red-900 via-red-700 to-red-600 shadow-[0_0_10px_rgba(220,38,38,0.5)] transition-all duration-300" 
                  style={{ width: `${hpPercent}%` }} 
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-red-400/25 to-black/40" />
                {hpPercent < 25 && (
                  <div className="pointer-events-none absolute inset-0 animate-pulse bg-red-500/15" />
                )}
                <div className="pointer-events-none absolute inset-0 flex items-center px-2.5">
                  <Heart 
                    className="h-3.5 w-3.5 text-white drop-shadow-lg" 
                    fill={hpPercent < 50 ? 'currentColor' : 'none'} 
                  />
                  <span 
                    className="ml-2 text-xs font-black text-white drop-shadow-[0_1px_6px_rgba(0,0,0,1)]" 
                    style={{ fontFamily: 'var(--font-fantasy)' }}
                  >
                    {Math.round(hp)} / {hpMax}
                  </span>
                </div>
              </div>
            </Tooltip>

            <Tooltip content={`${resourceLabel}: ${Math.round(mana)} / ${manaMax}`}>
              <div 
                className={`relative h-5 overflow-hidden rounded border-2 ${
                  resourceType === 'energy' ? 'border-amber-950/80' : 'border-blue-950/80'
                } bg-gradient-to-b from-black/80 to-black/60 shadow-lg`}
              >
                <div 
                  className={`absolute inset-0 bg-gradient-to-r ${resourceColor} shadow-[0_0_10px_rgba(59,130,246,0.5)] transition-all duration-300`} 
                  style={{ width: `${resourcePercent}%` }} 
                />
                <div 
                  className={`pointer-events-none absolute inset-0 bg-gradient-to-b ${
                    resourceType === 'energy' ? 'from-amber-300/25' : 'from-blue-300/25'
                  } to-black/40`} 
                />
                <div className="pointer-events-none absolute inset-0 flex items-center px-2.5">
                  <Zap 
                    className="h-3.5 w-3.5 text-white drop-shadow-lg" 
                    fill={resourcePercent > 75 ? 'currentColor' : 'none'} 
                  />
                  <span 
                    className="ml-2 text-xs font-black text-white drop-shadow-[0_1px_6px_rgba(0,0,0,1)]" 
                    style={{ fontFamily: 'var(--font-fantasy)' }}
                  >
                    {Math.round(mana)} / {manaMax}
                  </span>
                </div>
              </div>
            </Tooltip>
          </div>

          {/* Stats - Compact version */}
          {stats && !isEnemy && (
            <div className="flex items-center justify-between gap-2 rounded border border-amber-900/30 bg-black/40 px-2 py-1.5 shadow-inner">
              <Tooltip content={`Síla: ${stats.strength}`}>
                <StatMini icon={Sword} val={stats.strength} color="text-red-400" />
              </Tooltip>
              <Tooltip content={`Inteligence: ${stats.intelligence}`}>
                <StatMini icon={Brain} val={stats.intelligence} color="text-purple-400" />
              </Tooltip>
              <Tooltip content={`Obratnost: ${stats.agility}`}>
                <StatMini icon={Wind} val={stats.agility} color="text-amber-400" />
              </Tooltip>
              <Tooltip content={`Výdrž: ${stats.stamina}`}>
                <StatMini icon={Shield} val={stats.stamina} color="text-cyan-400" />
              </Tooltip>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function StatMini({ icon: Icon, val, color }: any) {
  return (
    <div className="flex items-center gap-1 transition-all hover:scale-110">
      <Icon className={`h-3.5 w-3.5 ${color} drop-shadow-md`} />
      <span 
        className="font-mono text-xs font-bold text-amber-200 drop-shadow" 
        style={{ fontFamily: 'var(--font-fantasy)' }}
      >
        {val}
      </span>
    </div>
  )
}
