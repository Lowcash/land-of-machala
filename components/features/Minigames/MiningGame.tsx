import { Gem, Pickaxe, TrendingUp, X, Zap } from 'lucide-react'
import { useState } from 'react'

interface MiningGameProps {
  isOpen: boolean
  onClose: () => void
  onComplete: (rewards: any[]) => void
}

export function MiningGame({ isOpen, onClose, onComplete }: MiningGameProps) {
  const [rockHealth, setRockHealth] = useState(100)
  const [hits, setHits] = useState(0)
  const [toolDurability, setToolDurability] = useState(100)
  const [combo, setCombo] = useState(0)
  const [rewards, setRewards] = useState<any[]>([])
  const [isComplete, setIsComplete] = useState(false)
  const [lastHitQuality, setLastHitQuality] = useState<
    'poor' | 'normal' | 'good' | 'excellent' | null
  >(null)

  // Quality zones - hitting here gives bonus rewards
  const qualityZones = [
    { start: 20, end: 30, multiplier: 1.5, label: 'good' },
    { start: 60, end: 70, multiplier: 2.0, label: 'excellent' },
  ]

  const handleHit = () => {
    if (isComplete || rockHealth <= 0 || toolDurability <= 0) return

    const damage = 8 + Math.random() * 7 // 8-15 damage
    const newHealth = Math.max(0, rockHealth - damage)
    const newDurability = Math.max(0, toolDurability - 2)
    const newHits = hits + 1

    // Check if hit was in quality zone
    const currentProgress = 100 - newHealth
    let hitQuality: 'poor' | 'normal' | 'good' | 'excellent' = 'normal'
    let qualityMultiplier = 1.0

    for (const zone of qualityZones) {
      if (currentProgress >= zone.start && currentProgress <= zone.end) {
        hitQuality = zone.label as any
        qualityMultiplier = zone.multiplier
        setCombo(combo + 1)
        break
      }
    }

    if (hitQuality === 'normal' || hitQuality === 'poor') {
      setCombo(0)
    }

    setLastHitQuality(hitQuality)
    setRockHealth(newHealth)
    setToolDurability(newDurability)
    setHits(newHits)

    // Generate rewards when rock is destroyed
    if (newHealth <= 0) {
      const generatedRewards = generateRewards(newHits, qualityMultiplier)
      setRewards(generatedRewards)
      setIsComplete(true)
      setTimeout(() => {
        onComplete(generatedRewards)
      }, 2000)
    }

    // Clear quality indicator
    setTimeout(() => setLastHitQuality(null), 500)
  }

  const generateRewards = (totalHits: number, avgMultiplier: number) => {
    const baseRewards: {
      materialId: number
      name: string
      quantity: number
      quality: 'normal' | 'good' | 'excellent'
    }[] = [
      {
        materialId: 1,
        name: 'Iron Ore',
        quantity: Math.floor(2 + Math.random() * 3),
        quality: 'normal',
      },
      {
        materialId: 2,
        name: 'Stone',
        quantity: Math.floor(3 + Math.random() * 5),
        quality: 'normal',
      },
    ]

    // Bonus rewards based on performance
    if (totalHits <= 10 && avgMultiplier > 1.2) {
      baseRewards.push({
        materialId: 10,
        name: 'Silver Ore',
        quantity: 1,
        quality: 'good' as const,
      })
    }

    if (combo >= 3) {
      baseRewards.push({
        materialId: 15,
        name: 'Gem Fragment',
        quantity: 1,
        quality: 'excellent' as const,
      })
    }

    return baseRewards
  }

  const getQualityColor = (quality: string | null) => {
    switch (quality) {
      case 'poor':
        return 'text-gray-400'
      case 'normal':
        return 'text-blue-400'
      case 'good':
        return 'text-green-400'
      case 'excellent':
        return 'text-purple-400'
      default:
        return ''
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />

      <div className="relative w-full max-w-2xl overflow-hidden rounded-lg border-2 border-yellow-600/40 bg-gradient-to-b from-slate-900/98 to-slate-800/98 shadow-2xl backdrop-blur-md">
        {/* Header */}
        <div className="border-b-2 border-yellow-600/30 bg-gradient-to-r from-yellow-900/40 to-yellow-800/40 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="rounded-lg border border-yellow-500/30 bg-yellow-600/20 p-2">
                <Pickaxe className="h-6 w-6 text-yellow-400" />
              </div>
              <div>
                <h2 className="text-yellow-100">Mining</h2>
                <p className="text-sm text-yellow-200/60">
                  Strike the quality zones for bonus rewards
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="rounded-lg border border-transparent p-2 transition-colors hover:border-red-500/30 hover:bg-red-500/20"
            >
              <X className="h-5 w-5 text-red-400" />
            </button>
          </div>
        </div>

        {/* Game Area */}
        <div className="p-8">
          {!isComplete ? (
            <>
              {/* Stats */}
              <div className="mb-6 grid grid-cols-3 gap-4">
                <div className="rounded-lg border border-slate-700/30 bg-slate-800/40 p-3">
                  <p className="mb-1 text-xs text-slate-400">Rock Health</p>
                  <div className="flex items-center justify-between">
                    <span className="text-lg text-slate-200">{Math.ceil(rockHealth)}%</span>
                  </div>
                  <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-slate-900/60">
                    <div
                      className="h-full bg-gradient-to-r from-red-600 to-orange-500 transition-all duration-300"
                      style={{ width: `${rockHealth}%` }}
                    />
                  </div>
                </div>

                <div className="rounded-lg border border-slate-700/30 bg-slate-800/40 p-3">
                  <p className="mb-1 text-xs text-slate-400">Tool Durability</p>
                  <div className="flex items-center justify-between">
                    <span className="text-lg text-slate-200">{Math.ceil(toolDurability)}%</span>
                  </div>
                  <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-slate-900/60">
                    <div
                      className="h-full bg-gradient-to-r from-blue-600 to-cyan-500 transition-all duration-300"
                      style={{ width: `${toolDurability}%` }}
                    />
                  </div>
                </div>

                <div className="rounded-lg border border-slate-700/30 bg-slate-800/40 p-3">
                  <p className="mb-1 text-xs text-slate-400">Combo</p>
                  <div className="flex items-center gap-2">
                    <Zap className="h-5 w-5 text-yellow-400" />
                    <span className="text-2xl text-yellow-400">{combo}x</span>
                  </div>
                </div>
              </div>

              {/* Rock Visual */}
              <div className="relative mb-6 rounded-lg border border-slate-700/30 bg-slate-800/60 p-6">
                <div className="relative mb-4 h-64 overflow-hidden rounded-lg border border-slate-700/50 bg-slate-900/60">
                  {/* Quality zones */}
                  {qualityZones.map((zone, idx) => (
                    <div
                      key={idx}
                      className={`absolute right-0 left-0 ${
                        zone.label === 'good'
                          ? 'border-y border-green-500/30 bg-green-500/10'
                          : 'border-y border-purple-500/30 bg-purple-500/10'
                      }`}
                      style={{
                        top: `${zone.start}%`,
                        height: `${zone.end - zone.start}%`,
                      }}
                    >
                      <span
                        className={`absolute top-1/2 right-2 -translate-y-1/2 text-xs tracking-wide uppercase ${
                          zone.label === 'good' ? 'text-green-400' : 'text-purple-400'
                        }`}
                      >
                        {zone.label}
                      </span>
                    </div>
                  ))}

                  {/* Progress indicator */}
                  <div
                    className="absolute top-0 right-0 left-0 border-b-2 border-yellow-500/50 bg-gradient-to-b from-yellow-600/20 to-orange-600/20 transition-all duration-300"
                    style={{ height: `${100 - rockHealth}%` }}
                  />

                  {/* Hit quality feedback */}
                  {lastHitQuality && (
                    <div className="animate-in fade-in zoom-in absolute inset-0 flex items-center justify-center duration-300">
                      <span
                        className={`text-4xl tracking-wider uppercase ${getQualityColor(lastHitQuality)}`}
                      >
                        {lastHitQuality}!
                      </span>
                    </div>
                  )}

                  {/* Rock icon */}
                  <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                    <Gem className="h-32 w-32 text-slate-600/30" strokeWidth={1} />
                  </div>
                </div>

                <button
                  onClick={handleHit}
                  disabled={toolDurability <= 0}
                  className="flex w-full items-center justify-center gap-2 rounded-lg border border-yellow-500/30 bg-yellow-600/20 px-6 py-4 text-yellow-100 transition-all hover:bg-yellow-600/30 disabled:border-slate-600/30 disabled:bg-slate-700/20 disabled:text-slate-500"
                >
                  <Pickaxe className="h-5 w-5" />
                  Strike
                </button>
              </div>

              {/* Instructions */}
              <div className="rounded-lg border border-blue-500/30 bg-blue-900/20 p-4">
                <p className="text-sm text-blue-200">
                  Hit the colored zones for bonus materials. Build a combo by hitting quality zones
                  consecutively!
                </p>
              </div>
            </>
          ) : (
            <div className="py-12 text-center">
              <div className="mb-4 inline-block rounded-full border-2 border-green-500/30 bg-green-600/20 p-4">
                <Gem className="h-16 w-16 text-green-400" />
              </div>
              <h3 className="mb-2 text-2xl text-green-100">Mining Complete!</h3>
              <p className="mb-6 text-slate-400">You collected:</p>
              <div className="mx-auto mb-6 grid max-w-md gap-3">
                {rewards.map((reward, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between rounded-lg border border-slate-700/30 bg-slate-800/40 px-4 py-3"
                  >
                    <div className="flex items-center gap-3">
                      <Gem className={`h-5 w-5 ${getQualityColor(reward.quality)}`} />
                      <span className="text-slate-200">{reward.name}</span>
                    </div>
                    <span className={`${getQualityColor(reward.quality)}`}>
                      × {reward.quantity}
                    </span>
                  </div>
                ))}
              </div>
              {combo >= 3 && (
                <div className="mx-auto mb-6 max-w-md rounded-lg border border-purple-500/30 bg-purple-900/20 p-3">
                  <div className="flex items-center justify-center gap-2 text-purple-300">
                    <TrendingUp className="h-4 w-4" />
                    <span className="text-sm">Combo Bonus Applied!</span>
                  </div>
                </div>
              )}
              <button
                onClick={onClose}
                className="rounded-lg border border-yellow-500/30 bg-yellow-600/20 px-6 py-2 text-yellow-100 transition-all hover:bg-yellow-600/30"
              >
                Collect Rewards
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
