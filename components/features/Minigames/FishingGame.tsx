import { AlertCircle, Fish, Trophy, Waves, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

interface FishingGameProps {
  isOpen: boolean
  onClose: () => void
  onCatch: (fish: any) => void
}

export function FishingGame({ isOpen, onClose, onCatch }: FishingGameProps) {
  const [gamePhase, setGamePhase] = useState<
    'waiting' | 'hooked' | 'reeling' | 'success' | 'escaped'
  >('waiting')
  const [tension, setTension] = useState(50)
  const [fishStamina, setFishStamina] = useState(100)
  const [playerStamina, setPlayerStamina] = useState(100)
  const [caughtFish, setCaughtFish] = useState<any>(null)
  const [, setWaitTime] = useState(0)

  const tensionInterval = useRef<NodeJS.Timeout | null>(null)
  const fishInterval = useRef<NodeJS.Timeout | null>(null)
  const waitInterval = useRef<NodeJS.Timeout | null>(null)

  const fishTypes = [
    { id: 1, name: 'Minnow', rarity: 'common' as const, size: 5, value: 5, difficulty: 1 },
    { id: 2, name: 'Trout', rarity: 'common' as const, size: 15, value: 15, difficulty: 2 },
    { id: 3, name: 'Bass', rarity: 'uncommon' as const, size: 25, value: 30, difficulty: 3 },
    { id: 4, name: 'Pike', rarity: 'rare' as const, size: 40, value: 60, difficulty: 4 },
    {
      id: 5,
      name: 'Golden Carp',
      rarity: 'legendary' as const,
      size: 50,
      value: 150,
      difficulty: 5,
    },
  ]

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common':
        return 'text-gray-400'
      case 'uncommon':
        return 'text-green-400'
      case 'rare':
        return 'text-blue-400'
      case 'legendary':
        return 'text-yellow-400'
      default:
        return 'text-gray-400'
    }
  }

  useEffect(() => {
    if (gamePhase === 'waiting') {
      // Random wait time 2-5 seconds
      const randomWait = 2000 + Math.random() * 3000
      waitInterval.current = setTimeout(() => {
        // Roll for fish type
        const roll = Math.random() * 100
        let selectedFish
        if (roll < 50)
          selectedFish = fishTypes[0] // 50% minnow
        else if (roll < 80)
          selectedFish = fishTypes[1] // 30% trout
        else if (roll < 95)
          selectedFish = fishTypes[2] // 15% bass
        else if (roll < 99)
          selectedFish = fishTypes[3] // 4% pike
        else selectedFish = fishTypes[4] // 1% golden carp

        setCaughtFish(selectedFish)
        setFishStamina(100)
        setGamePhase('hooked')
      }, randomWait)
    }

    return () => {
      if (waitInterval.current) clearTimeout(waitInterval.current)
    }
  }, [gamePhase])

  useEffect(() => {
    if (gamePhase === 'reeling' && caughtFish) {
      // Tension management
      tensionInterval.current = setInterval(() => {
        setTension((prev) => {
          // Fish pulls randomly
          const fishPull = (Math.random() - 0.3) * caughtFish.difficulty * 2
          let newTension = prev + fishPull

          // Clamp between 0-100
          newTension = Math.max(0, Math.min(100, newTension))

          // Check win/loss conditions
          if (newTension >= 95) {
            setGamePhase('escaped')
            return prev
          }

          return newTension
        })
      }, 100)

      // Fish stamina drain
      fishInterval.current = setInterval(() => {
        setFishStamina((prev) => {
          const newStamina = prev - 0.5
          if (newStamina <= 0) {
            setGamePhase('success')
            return 0
          }
          return newStamina
        })
      }, 100)
    }

    return () => {
      if (tensionInterval.current) clearInterval(tensionInterval.current)
      if (fishInterval.current) clearInterval(fishInterval.current)
    }
  }, [gamePhase, caughtFish])

  const handleReel = () => {
    if (gamePhase === 'hooked') {
      setGamePhase('reeling')
    } else if (gamePhase === 'reeling') {
      // Reeling reduces tension but costs player stamina
      setTension((prev) => Math.max(0, prev - 5))
      setPlayerStamina((prev) => Math.max(0, prev - 2))

      if (playerStamina <= 0) {
        setGamePhase('escaped')
      }
    }
  }

  const handleRelease = () => {
    // Releasing line increases tension
    if (gamePhase === 'reeling') {
      setTension((prev) => Math.min(100, prev + 3))
      setPlayerStamina((prev) => Math.min(100, prev + 1)) // Slight stamina recovery
    }
  }

  const handleReset = () => {
    setGamePhase('waiting')
    setTension(50)
    setFishStamina(100)
    setPlayerStamina(100)
    setCaughtFish(null)
    setWaitTime(0)
  }

  const handleComplete = () => {
    if (caughtFish) {
      onCatch(caughtFish)
    }
    onClose()
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
                <Fish className="h-6 w-6 text-yellow-400" />
              </div>
              <div>
                <h2 className="text-yellow-100">Fishing</h2>
                <p className="text-sm text-yellow-200/60 capitalize">{gamePhase}</p>
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
          {gamePhase === 'waiting' && (
            <div className="py-12 text-center">
              <Waves className="mx-auto mb-4 h-16 w-16 animate-pulse text-blue-400" />
              <h3 className="mb-2 text-xl text-slate-200">Waiting for a bite...</h3>
              <p className="text-sm text-slate-400">Stay patient</p>
            </div>
          )}

          {gamePhase === 'hooked' && caughtFish && (
            <div className="py-12 text-center">
              <div className="mb-4 inline-block animate-pulse rounded-full border-2 border-yellow-500/30 bg-yellow-600/20 p-4">
                <Fish className="h-16 w-16 text-yellow-400" />
              </div>
              <h3 className="mb-2 text-2xl text-yellow-100">Fish Hooked!</h3>
              <p className="mb-6 text-slate-400">Start reeling it in!</p>
              <button
                onClick={handleReel}
                className="rounded-lg border border-green-500/30 bg-green-600/20 px-8 py-3 text-green-100 transition-all hover:bg-green-600/30"
              >
                Start Reeling
              </button>
            </div>
          )}

          {gamePhase === 'reeling' && caughtFish && (
            <>
              {/* Stats */}
              <div className="mb-6 grid grid-cols-2 gap-4">
                <div className="rounded-lg border border-slate-700/30 bg-slate-800/40 p-3">
                  <p className="mb-1 text-xs text-slate-400">Line Tension</p>
                  <div className="mt-2 h-3 w-full overflow-hidden rounded-full bg-slate-900/60">
                    <div
                      className={`h-full transition-all duration-100 ${
                        tension > 80
                          ? 'bg-red-500'
                          : tension > 50
                            ? 'bg-yellow-500'
                            : 'bg-green-500'
                      }`}
                      style={{ width: `${tension}%` }}
                    />
                  </div>
                  <p className="mt-1 text-xs text-slate-500">
                    {tension > 80 ? 'Danger!' : tension > 50 ? 'Careful!' : 'Good'}
                  </p>
                </div>

                <div className="rounded-lg border border-slate-700/30 bg-slate-800/40 p-3">
                  <p className="mb-1 text-xs text-slate-400">Fish Stamina</p>
                  <div className="mt-2 h-3 w-full overflow-hidden rounded-full bg-slate-900/60">
                    <div
                      className="h-full bg-gradient-to-r from-blue-600 to-cyan-500 transition-all duration-100"
                      style={{ width: `${fishStamina}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Fish visual */}
              <div className="relative mb-6 overflow-hidden rounded-lg border border-blue-500/30 bg-gradient-to-b from-blue-900/20 to-blue-800/20 p-8">
                <div className="absolute inset-0 opacity-10">
                  <Waves className="h-full w-full" />
                </div>
                <div className="relative text-center">
                  <Fish className={`mx-auto mb-4 h-32 w-32 ${getRarityColor(caughtFish.rarity)}`} />
                  <h3 className={`mb-1 text-xl ${getRarityColor(caughtFish.rarity)}`}>
                    {caughtFish.name}
                  </h3>
                  <p className="text-sm text-slate-400">
                    {caughtFish.size}cm • {caughtFish.rarity}
                  </p>
                </div>
              </div>

              {/* Controls */}
              <div className="mb-6 grid grid-cols-2 gap-3">
                <button
                  onMouseDown={handleReel}
                  onMouseUp={() => {}}
                  onTouchStart={handleReel}
                  onTouchEnd={() => {}}
                  disabled={playerStamina <= 0}
                  className="rounded-lg border border-green-500/30 bg-green-600/20 px-6 py-4 text-green-100 transition-all hover:bg-green-600/30 active:scale-95 disabled:border-slate-600/30 disabled:bg-slate-700/20 disabled:text-slate-500"
                >
                  <div className="text-center">
                    <p className="mb-1 font-medium">Reel In</p>
                    <p className="text-xs opacity-75">Reduce tension</p>
                  </div>
                </button>
                <button
                  onMouseDown={handleRelease}
                  onMouseUp={() => {}}
                  onTouchStart={handleRelease}
                  onTouchEnd={() => {}}
                  className="rounded-lg border border-blue-500/30 bg-blue-600/20 px-6 py-4 text-blue-100 transition-all hover:bg-blue-600/30 active:scale-95"
                >
                  <div className="text-center">
                    <p className="mb-1 font-medium">Release Line</p>
                    <p className="text-xs opacity-75">Increase tension</p>
                  </div>
                </button>
              </div>

              {/* Instructions */}
              <div className="rounded-lg border border-blue-500/30 bg-blue-900/20 p-4">
                <div className="flex gap-3">
                  <AlertCircle className="h-5 w-5 flex-shrink-0 text-blue-400" />
                  <div className="text-sm text-blue-200">
                    <p>
                      Balance the line tension! Too much and the line snaps. Tire out the fish to
                      catch it.
                    </p>
                  </div>
                </div>
              </div>
            </>
          )}

          {gamePhase === 'success' && caughtFish && (
            <div className="py-12 text-center">
              <div className="mb-4 inline-block rounded-full border-2 border-green-500/30 bg-green-600/20 p-4">
                <Trophy className="h-16 w-16 text-green-400" />
              </div>
              <h3 className="mb-2 text-2xl text-green-100">Fish Caught!</h3>
              <div className="mx-auto mb-6 max-w-sm rounded-lg border border-slate-700/30 bg-slate-800/40 p-6">
                <Fish className={`mx-auto mb-3 h-24 w-24 ${getRarityColor(caughtFish.rarity)}`} />
                <h4 className={`mb-2 text-xl ${getRarityColor(caughtFish.rarity)}`}>
                  {caughtFish.name}
                </h4>
                <div className="flex justify-center gap-4 text-sm text-slate-400">
                  <span>{caughtFish.size}cm</span>
                  <span>•</span>
                  <span className={getRarityColor(caughtFish.rarity)}>{caughtFish.rarity}</span>
                  <span>•</span>
                  <span className="text-yellow-400">{caughtFish.value}g</span>
                </div>
              </div>
              <div className="flex justify-center gap-3">
                <button
                  onClick={handleReset}
                  className="rounded-lg border border-blue-500/30 bg-blue-600/20 px-6 py-2 text-blue-100 transition-all hover:bg-blue-600/30"
                >
                  Fish Again
                </button>
                <button
                  onClick={handleComplete}
                  className="rounded-lg border border-yellow-500/30 bg-yellow-600/20 px-6 py-2 text-yellow-100 transition-all hover:bg-yellow-600/30"
                >
                  Keep Fish
                </button>
              </div>
            </div>
          )}

          {gamePhase === 'escaped' && (
            <div className="py-12 text-center">
              <div className="mb-4 inline-block rounded-full border-2 border-red-500/30 bg-red-600/20 p-4">
                <Fish className="h-16 w-16 text-red-400" />
              </div>
              <h3 className="mb-2 text-2xl text-red-100">Fish Escaped!</h3>
              <p className="mb-6 text-slate-400">The line snapped or you ran out of stamina</p>
              <div className="flex justify-center gap-3">
                <button
                  onClick={handleReset}
                  className="rounded-lg border border-blue-500/30 bg-blue-600/20 px-6 py-2 text-blue-100 transition-all hover:bg-blue-600/30"
                >
                  Try Again
                </button>
                <button
                  onClick={onClose}
                  className="rounded-lg border border-slate-600/30 bg-slate-700/40 px-6 py-2 text-slate-200 transition-all hover:bg-slate-700/60"
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
