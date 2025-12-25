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
    resourceType === 'energy' ? 'from-amber-600 via-yellow-500 to-amber-400' : 'from-blue-700 via-blue-500 to-cyan-400'
  const resourceGlow = resourceType === 'energy' ? 'shadow-[0_0_15px_rgba(245,158,11,0.5)]' : 'shadow-[0_0_15px_rgba(59,130,246,0.5)]'
  const resourceLabel = resourceType === 'energy' ? 'Energie' : 'Mana'

  const hpPercent = Math.max(0, Math.min(100, (hp / hpMax) * 100))
  const resourcePercent = Math.max(0, Math.min(100, (mana / manaMax) * 100))

  return (
    <div
      className={`group relative isolate overflow-hidden rounded-xl shadow-2xl transition-all duration-500 select-none ${
        isEnemy
          ? 'bg-gradient-to-br from-red-950/90 via-black/95 to-red-950/80 hover:shadow-[0_0_60px_rgba(220,38,38,0.6)]'
          : 'bg-gradient-to-br from-amber-950/40 via-black/90 to-amber-900/30 hover:shadow-[0_0_60px_rgba(217,119,6,0.4)]'
      }`}
      style={{
        border: '3px solid transparent',
        backgroundClip: 'padding-box',
        borderImage: isEnemy 
          ? 'linear-gradient(135deg, #7f1d1d 0%, #450a0a 50%, #7f1d1d 100%) 1'
          : 'linear-gradient(135deg, #d97706 0%, #78350f 25%, #451a03 50%, #78350f 75%, #d97706 100%) 1'
      }}
    >
      {/* Ornamental corners */}
      <div className="pointer-events-none absolute top-0 left-0 h-6 w-6 border-t-2 border-l-2 border-amber-500/40" />
      <div className="pointer-events-none absolute top-0 right-0 h-6 w-6 border-t-2 border-r-2 border-amber-500/40" />
      <div className="pointer-events-none absolute bottom-0 left-0 h-6 w-6 border-b-2 border-l-2 border-amber-500/40" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-6 w-6 border-b-2 border-r-2 border-amber-500/40" />

      {/* Parchment texture overlay */}
      <div 
        className="pointer-events-none absolute inset-0 opacity-5 mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23noise)' opacity='0.5'/%3E%3C/svg%3E")`
        }}
      />

      {/* Magical glow pulse */}
      <div className={`pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100 ${isEnemy ? 'bg-gradient-to-r from-red-600/10 via-transparent to-red-600/10' : 'bg-gradient-to-r from-amber-500/10 via-transparent to-amber-500/10'} animate-pulse`} />

      <div className="relative z-10 flex h-32 items-stretch">
        {/* Avatar Section - Medieval Portrait Frame */}
        <div
          className={`relative w-32 shrink-0 border-r-4 ${
            isEnemy ? 'border-red-900/60' : 'border-amber-800/60'
          } bg-gradient-to-br ${
            isEnemy ? 'from-red-950/80 via-black/90 to-red-900/60' : 'from-amber-950/60 via-black/80 to-amber-900/40'
          } flex items-center justify-center overflow-hidden`}
        >
          {/* Inner frame decoration */}
          <div className="pointer-events-none absolute inset-2 border-2 border-amber-700/20 rounded" />
          
          {image ? (
            <div className="relative h-full w-full">
              <img
                src={image}
                alt={name}
                className="h-full w-full object-cover transition-all duration-700 group-hover:scale-125"
                style={{ filter: 'sepia(20%) contrast(110%)' }}
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/80" />
            </div>
          ) : (
            <User
              className={`h-16 w-16 transition-all duration-500 ${
                isEnemy ? 'text-red-600/40 group-hover:text-red-500/60' : 'text-amber-700/50 group-hover:text-amber-600/70'
              }`}
            />
          )}

          {/* Level Emblem - Medieval shield style */}
          <div
            className={`absolute -top-1 -left-1 flex h-10 w-10 items-center justify-center rounded-full shadow-xl transition-all duration-500 ${
              isEnemy
                ? 'bg-gradient-to-br from-red-700 via-red-800 to-red-950 ring-2 ring-red-600/50 group-hover:ring-red-500'
                : 'bg-gradient-to-br from-amber-500 via-amber-700 to-amber-900 ring-2 ring-amber-400/60 group-hover:ring-amber-300'
            }`}
          >
            <span
              className="text-sm font-black text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]"
              style={{ fontFamily: 'var(--font-fantasy)', fontSize: '11px' }}
            >
              {level}
            </span>
          </div>
        </div>

        {/* Main Info Section */}
        <div className="flex min-w-0 flex-1 flex-col justify-between p-3 backdrop-blur-sm">
          {/* Character Name with XP */}
          <div className="mb-2">
            <h3
              className={`mb-1 truncate text-xl font-bold leading-none tracking-wider transition-all duration-300 ${
                isEnemy 
                  ? 'text-red-400 drop-shadow-[0_0_8px_rgba(248,113,113,0.6)] group-hover:text-red-300' 
                  : 'text-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.6)] group-hover:text-amber-300'
              }`}
              style={{ fontFamily: 'var(--font-fantasy)' }}
            >
              {name}
            </h3>
            
            {!isEnemy && xp !== undefined && (
              <Tooltip content={`Zkušenosti: ${xp.toLocaleString()} / ${xpMax.toLocaleString()}`}>
                <div className="flex items-center gap-2">
                  <Sparkles className="h-3.5 w-3.5 text-amber-400 drop-shadow-[0_0_6px_rgba(251,191,36,0.8)]" />
                  <div className="relative h-2 flex-1 overflow-hidden rounded-full border border-amber-900/60 bg-black/70 shadow-inner">
                    <div
                      className="h-full bg-gradient-to-r from-amber-600 via-amber-400 to-yellow-300 shadow-[0_0_8px_rgba(251,191,36,0.6)] transition-all duration-700"
                      style={{ width: `${(xp / xpMax) * 100}%` }}
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-white/20 via-transparent to-transparent" />
                  </div>
                  <span className="font-mono text-xs font-semibold text-amber-300/90">
                    {Math.floor((xp / xpMax) * 100)}%
                  </span>
                </div>
              </Tooltip>
            )}
          </div>

          {/* Vitals Bars - Enhanced medieval style */}
          <div className="space-y-2.5">
            {/* HP Bar - Blood red with pulse */}
            <Tooltip content={`Životy: ${Math.round(hp)} / ${hpMax}`}>
              <div className="group/hp relative h-5 overflow-hidden rounded-md border-2 border-red-950/80 bg-gradient-to-b from-black/80 to-black/60 shadow-lg transition-all hover:border-red-800/80">
                <div
                  className="absolute inset-0 bg-gradient-to-r from-red-900 via-red-700 to-red-600 shadow-[0_0_12px_rgba(220,38,38,0.5)] transition-all duration-500"
                  style={{ width: `${hpPercent}%` }}
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-red-400/30 via-transparent to-black/40" />
                <div className={`pointer-events-none absolute inset-0 transition-opacity ${hpPercent < 25 ? 'animate-pulse opacity-100' : 'opacity-0'} bg-red-500/20`} />
                
                <div className="pointer-events-none absolute inset-0 flex items-center justify-between px-2">
                  <div className="flex items-center gap-1.5">
                    <Heart className="h-4 w-4 text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]" fill={hpPercent < 50 ? 'currentColor' : 'none'} />
                    <span className="text-xs font-black text-white drop-shadow-[0_2px_6px_rgba(0,0,0,1)]" style={{ fontFamily: 'var(--font-fantasy)' }}>
                      {Math.round(hp)} / {hpMax}
                    </span>
                  </div>
                </div>
              </div>
            </Tooltip>

            {/* Resource Bar - Magical glow */}
            <Tooltip content={`${resourceLabel}: ${Math.round(mana)} / ${manaMax}`}>
              <div className={`group/mana relative h-5 overflow-hidden rounded-md border-2 ${resourceType === 'energy' ? 'border-amber-950/80 hover:border-amber-800/80' : 'border-blue-950/80 hover:border-blue-800/80'} bg-gradient-to-b from-black/80 to-black/60 shadow-lg transition-all`}>
                <div
                  className={`absolute inset-0 bg-gradient-to-r ${resourceColor} ${resourceGlow} transition-all duration-500`}
                  style={{ width: `${resourcePercent}%` }}
                />
                <div className={`pointer-events-none absolute inset-0 bg-gradient-to-b ${resourceType === 'energy' ? 'from-amber-300/30' : 'from-blue-300/30'} via-transparent to-black/40`} />
                
                <div className="pointer-events-none absolute inset-0 flex items-center justify-between px-2">
                  <div className="flex items-center gap-1.5">
                    <Zap className="h-4 w-4 text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]" fill={resourcePercent > 75 ? 'currentColor' : 'none'} />
                    <span className="text-xs font-black text-white drop-shadow-[0_2px_6px_rgba(0,0,0,1)]" style={{ fontFamily: 'var(--font-fantasy)' }}>
                      {Math.round(mana)} / {manaMax}
                    </span>
                  </div>
                </div>
              </div>
            </Tooltip>
          </div>

          {/* Stats Display - Compact with icons */}
          {stats && !isEnemy && (
            <div className="mt-2 flex items-center justify-between gap-3 rounded-md border border-amber-900/30 bg-black/40 px-2 py-1.5 backdrop-blur-sm">
              <Tooltip content={`Síla: ${stats.strength} - Fyzický útok`}>
                <StatIcon icon={Sword} val={stats.strength} color="text-red-400" glowColor="group-hover:drop-shadow-[0_0_6px_rgba(248,113,113,0.8)]" />
              </Tooltip>
              <Tooltip content={`Inteligence: ${stats.intelligence} - Magický útok`}>
                <StatIcon icon={Brain} val={stats.intelligence} color="text-purple-400" glowColor="group-hover:drop-shadow-[0_0_6px_rgba(192,132,252,0.8)]" />
              </Tooltip>
              <Tooltip content={`Obratnost: ${stats.agility} - Kritický zásah`}>
                <StatIcon icon={Wind} val={stats.agility} color="text-amber-400" glowColor="group-hover:drop-shadow-[0_0_6px_rgba(251,191,36,0.8)]" />
              </Tooltip>
              <Tooltip content={`Výdrž: ${stats.stamina} - HP a obrana`}>
                <StatIcon icon={Shield} val={stats.stamina} color="text-cyan-400" glowColor="group-hover:drop-shadow-[0_0_6px_rgba(34,211,238,0.8)]" />
              </Tooltip>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function StatIcon({ icon: Icon, val, color, glowColor }: any) {
  return (
    <div className={`group flex items-center gap-1.5 transition-all duration-300 hover:scale-110 ${glowColor}`}>
      <Icon className={`h-4 w-4 ${color} drop-shadow-md`} />
      <span className="font-mono text-sm font-bold text-amber-200" style={{ fontFamily: 'var(--font-fantasy)' }}>
        {val}
      </span>
    </div>
  )
}
