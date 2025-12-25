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
      className={`group relative overflow-hidden rounded-lg shadow-xl transition-all duration-300 select-none ${
        isEnemy
          ? 'bg-gradient-to-br from-red-950/80 via-black/90 to-red-900/70 border-2 border-red-800/60 hover:border-red-700 hover:shadow-[0_0_30px_rgba(220,38,38,0.4)]'
          : 'bg-gradient-to-br from-amber-950/30 via-black/85 to-amber-900/20 border-2 border-amber-700/50 hover:border-amber-600 hover:shadow-[0_0_30px_rgba(217,119,6,0.3)]'
      }`}
    >
      {/* Subtle corner accents */}
      <div className="pointer-events-none absolute top-0 left-0 h-4 w-4 border-t border-l border-amber-500/30" />
      <div className="pointer-events-none absolute top-0 right-0 h-4 w-4 border-t border-r border-amber-500/30" />
      <div className="pointer-events-none absolute bottom-0 left-0 h-4 w-4 border-b border-l border-amber-500/30" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-4 w-4 border-b border-r border-amber-500/30" />

      {/* Parchment texture */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.03] mix-blend-overlay" 
        style={{backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E")`}} 
      />

      <div className="relative z-10 flex h-20 items-stretch">
        {/* Avatar - Compact */}
        <div className={`relative w-20 shrink-0 border-r-2 ${isEnemy ? 'border-red-900/50' : 'border-amber-800/40'} bg-gradient-to-br ${isEnemy ? 'from-red-950/70 via-black/80 to-red-900/50' : 'from-amber-950/40 via-black/70 to-amber-900/30'} flex items-center justify-center overflow-hidden`}>
          {image ? (
            <div className="relative h-full w-full">
              <img src={image} alt={name} className="h-full w-full object-cover transition-all duration-500 group-hover:scale-110" style={{filter: 'sepia(15%) contrast(105%)'}} />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent to-black/60" />
            </div>
          ) : (
            <User className={`h-12 w-12 ${isEnemy ? 'text-red-600/30 group-hover:text-red-500/50' : 'text-amber-700/40 group-hover:text-amber-600/60'}`} />
          )}
          
          {/* Level badge - compact */}
          <div className={`absolute -top-0.5 -left-0.5 flex h-7 w-7 items-center justify-center rounded-full shadow-lg ${isEnemy ? 'bg-gradient-to-br from-red-700 to-red-900 ring-1 ring-red-600/40' : 'bg-gradient-to-br from-amber-500 to-amber-800 ring-1 ring-amber-400/50'}`}>
            <span className="text-[10px] font-black text-white drop-shadow-md" style={{fontFamily: 'var(--font-fantasy)'}}>{level}</span>
          </div>
        </div>

        {/* Info Section - Compact */}
        <div className="flex min-w-0 flex-1 flex-col justify-between p-2.5">
          {/* Name & XP */}
          <div>
            <h3 className={`mb-1 truncate text-base font-bold leading-none tracking-wide ${isEnemy ? 'text-red-400 drop-shadow-[0_0_6px_rgba(248,113,113,0.5)]' : 'text-amber-400 drop-shadow-[0_0_6px_rgba(251,191,36,0.5)]'}`} style={{fontFamily: 'var(--font-fantasy)'}}>
              {name}
            </h3>
            {!isEnemy && xp !== undefined && (
              <Tooltip content={`Zkušenosti: ${xp.toLocaleString()} / ${xpMax.toLocaleString()}`}>
                <div className="flex items-center gap-1.5">
                  <Sparkles className="h-3 w-3 text-amber-400 drop-shadow-[0_0_4px_rgba(251,191,36,0.6)]" />
                  <div className="relative h-1.5 flex-1 overflow-hidden rounded-full border border-amber-900/50 bg-black/60 shadow-inner">
                    <div className="h-full bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-300 shadow-[0_0_6px_rgba(251,191,36,0.5)]" style={{width: `${(xp / xpMax) * 100}%`}} />
                  </div>
                  <span className="font-mono text-[10px] font-semibold text-amber-300">{Math.floor((xp / xpMax) * 100)}%</span>
                </div>
              </Tooltip>
            )}
          </div>

          {/* Vitals - Compact */}
          <div className="space-y-1.5">
            <Tooltip content={`Životy: ${Math.round(hp)} / ${hpMax}`}>
              <div className="group/hp relative h-4 overflow-hidden rounded border border-red-950/70 bg-gradient-to-b from-black/70 to-black/50 shadow-md">
                <div className="absolute inset-0 bg-gradient-to-r from-red-900 via-red-700 to-red-600 shadow-[0_0_8px_rgba(220,38,38,0.4)]" style={{width: `${hpPercent}%`}} />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-red-400/20 to-black/30" />
                {hpPercent < 25 && <div className="pointer-events-none absolute inset-0 animate-pulse bg-red-500/10" />}
                <div className="pointer-events-none absolute inset-0 flex items-center px-2">
                  <Heart className="h-3 w-3 text-white drop-shadow-md" fill={hpPercent < 50 ? 'currentColor' : 'none'} />
                  <span className="ml-1.5 text-[10px] font-black text-white drop-shadow-[0_1px_4px_rgba(0,0,0,1)]" style={{fontFamily: 'var(--font-fantasy)'}}>{Math.round(hp)} / {hpMax}</span>
                </div>
              </div>
            </Tooltip>

            <Tooltip content={`${resourceLabel}: ${Math.round(mana)} / ${manaMax}`}>
              <div className={`relative h-4 overflow-hidden rounded border ${resourceType === 'energy' ? 'border-amber-950/70' : 'border-blue-950/70'} bg-gradient-to-b from-black/70 to-black/50 shadow-md`}>
                <div className={`absolute inset-0 bg-gradient-to-r ${resourceColor} shadow-[0_0_8px_rgba(59,130,246,0.4)]`} style={{width: `${resourcePercent}%`}} />
                <div className={`pointer-events-none absolute inset-0 bg-gradient-to-b ${resourceType === 'energy' ? 'from-amber-300/20' : 'from-blue-300/20'} to-black/30`} />
                <div className="pointer-events-none absolute inset-0 flex items-center px-2">
                  <Zap className="h-3 w-3 text-white drop-shadow-md" fill={resourcePercent > 75 ? 'currentColor' : 'none'} />
                  <span className="ml-1.5 text-[10px] font-black text-white drop-shadow-[0_1px_4px_rgba(0,0,0,1)]" style={{fontFamily: 'var(--font-fantasy)'}}>{Math.round(mana)} / {manaMax}</span>
                </div>
              </div>
            </Tooltip>
          </div>

          {/* Stats - Ultra compact */}
          {stats && !isEnemy && (
            <div className="flex items-center justify-between gap-2 rounded border border-amber-900/20 bg-black/30 px-1.5 py-1">
              <Tooltip content={`Síla: ${stats.strength}`}><StatMini icon={Sword} val={stats.strength} color="text-red-400" /></Tooltip>
              <Tooltip content={`Inteligence: ${stats.intelligence}`}><StatMini icon={Brain} val={stats.intelligence} color="text-purple-400" /></Tooltip>
              <Tooltip content={`Obratnost: ${stats.agility}`}><StatMini icon={Wind} val={stats.agility} color="text-amber-400" /></Tooltip>
              <Tooltip content={`Výdrž: ${stats.stamina}`}><StatMini icon={Shield} val={stats.stamina} color="text-cyan-400" /></Tooltip>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function StatMini({ icon: Icon, val, color }: any) {
  return (
    <div className="flex items-center gap-0.5 transition-all hover:scale-110">
      <Icon className={`h-3 w-3 ${color} drop-shadow-sm`} />
      <span className="font-mono text-[10px] font-bold text-amber-200" style={{fontFamily: 'var(--font-fantasy)'}}>{val}</span>
    </div>
  )
}
