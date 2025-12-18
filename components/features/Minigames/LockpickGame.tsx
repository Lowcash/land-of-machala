import { AlertCircle, Lock, Trophy, Unlock, X } from 'lucide-react'
import { useState } from 'react'

interface LockpickGameProps {
  isOpen: boolean
  onClose: () => void
  difficulty: 'easy' | 'medium' | 'hard' | 'master'
  onSuccess: (reward: any) => void
  onFailure: () => void
}

export function LockpickGame({
  isOpen,
  onClose,
  difficulty,
  onSuccess,
  onFailure,
}: LockpickGameProps) {
  const [currentPin, setCurrentPin] = useState(0)
  const [position, setPosition] = useState(50)
  const [attempts, setAttempts] = useState(3)
  const [isPicking, setIsPicking] = useState(false)
  const [gameOver, setGameOver] = useState(false)
  const [won, setWon] = useState(false)

  // Difficulty settings
  const difficultySettings = {
    easy: { pins: 3, tolerance: 15, maxAttempts: 5 },
    medium: { pins: 4, tolerance: 10, maxAttempts: 4 },
    hard: { pins: 5, tolerance: 7, maxAttempts: 3 },
    master: { pins: 6, tolerance: 5, maxAttempts: 3 },
  }

  const settings = difficultySettings[difficulty]
  const [sweetSpots] = useState(() =>
    Array.from({ length: settings.pins }, () => Math.random() * 80 + 10)
  )

  const handlePick = () => {
    if (isPicking || gameOver) return

    setIsPicking(true)
    const sweetSpot = sweetSpots[currentPin] || 0
    const distance = Math.abs(position - sweetSpot)

    setTimeout(() => {
      if (distance <= settings.tolerance) {
        // Success on this pin
        if (currentPin === settings.pins - 1) {
          // All pins picked!
          setWon(true)
          setGameOver(true)
          onSuccess({ gold: 50 * settings.pins, xp: 25 * settings.pins })
        } else {
          setCurrentPin(currentPin + 1)
        }
      } else {
        // Failed attempt
        const newAttempts = attempts - 1
        setAttempts(newAttempts)
        if (newAttempts <= 0) {
          setGameOver(true)
          onFailure()
        }
      }
      setIsPicking(false)
    }, 500)
  }

  const handleReset = () => {
    setCurrentPin(0)
    setPosition(50)
    setAttempts(settings.maxAttempts)
    setGameOver(false)
    setWon(false)
    setIsPicking(false)
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
                <Lock className="h-6 w-6 text-yellow-400" />
              </div>
              <div>
                <h2 className="text-yellow-100">Lockpicking</h2>
                <p className="text-sm text-yellow-200/60 capitalize">{difficulty} Lock</p>
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
          {!gameOver ? (
            <>
              {/* Progress */}
              <div className="mb-6">
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-sm text-slate-400">Progress</span>
                  <span className="text-sm text-slate-400">
                    Pin {currentPin + 1} / {settings.pins}
                  </span>
                </div>
                <div className="flex gap-2">
                  {Array.from({ length: settings.pins }).map((_, idx) => (
                    <div
                      key={idx}
                      className={`h-2 flex-1 rounded-full ${
                        idx < currentPin
                          ? 'bg-green-500'
                          : idx === currentPin
                            ? 'bg-yellow-500'
                            : 'bg-slate-700'
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Attempts */}
              <div className="mb-6 flex items-center justify-between rounded-lg border border-slate-700/30 bg-slate-800/40 px-4 py-3">
                <span className="text-slate-300">Attempts remaining:</span>
                <div className="flex gap-1">
                  {Array.from({ length: settings.maxAttempts }).map((_, idx) => (
                    <div
                      key={idx}
                      className={`h-3 w-3 rounded-full ${
                        idx < attempts ? 'bg-red-500' : 'bg-slate-700'
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Lockpick Area */}
              <div className="mb-6 rounded-lg border border-slate-700/30 bg-slate-800/60 p-6">
                <div className="relative mb-4 h-48 overflow-hidden rounded-lg border border-slate-700/50 bg-slate-900/60">
                  {/* Sweet spot indicator (visible for testing - hide in production) */}
                  <div
                    className="absolute top-0 bottom-0 border-x-2 border-green-500/30 bg-green-500/10"
                    style={{
                      left: `${(sweetSpots[currentPin] || 0) - settings.tolerance}%`,
                      width: `${settings.tolerance * 2}%`,
                    }}
                  />

                  {/* Lock pins */}
                  <div className="absolute top-4 right-0 left-0 flex justify-around px-8">
                    {Array.from({ length: settings.pins }).map((_, idx) => (
                      <div
                        key={idx}
                        className={`h-12 w-1 rounded-full transition-all ${
                          idx < currentPin
                            ? 'bg-green-500'
                            : idx === currentPin
                              ? 'bg-yellow-500'
                              : 'bg-slate-600'
                        }`}
                      />
                    ))}
                  </div>

                  {/* Lockpick position */}
                  <div
                    className="absolute bottom-4 h-24 w-1 rounded-full bg-gradient-to-t from-yellow-400 to-yellow-600 shadow-lg transition-all duration-100"
                    style={{ left: `${position}%`, transform: 'translateX(-50%)' }}
                  >
                    <div className="absolute top-0 left-1/2 h-0 w-0 -translate-x-1/2 -translate-y-full border-r-4 border-b-8 border-l-4 border-r-transparent border-b-yellow-400 border-l-transparent" />
                  </div>
                </div>

                {/* Slider */}
                <div className="mb-4">
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={position}
                    onChange={(e) => setPosition(Number(e.target.value))}
                    disabled={isPicking || gameOver}
                    className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-slate-700 accent-yellow-500"
                  />
                </div>

                <button
                  onClick={handlePick}
                  disabled={isPicking || gameOver}
                  className="w-full rounded-lg border border-yellow-500/30 bg-yellow-600/20 px-6 py-3 text-yellow-100 transition-all hover:bg-yellow-600/30 disabled:border-slate-600/30 disabled:bg-slate-700/20 disabled:text-slate-500"
                >
                  {isPicking ? 'Picking...' : 'Pick Lock'}
                </button>
              </div>

              {/* Instructions */}
              <div className="rounded-lg border border-blue-500/30 bg-blue-900/20 p-4">
                <div className="flex gap-3">
                  <AlertCircle className="h-5 w-5 flex-shrink-0 text-blue-400" />
                  <div className="text-sm text-blue-200">
                    <p className="mb-1">Move the slider to find the sweet spot for each pin.</p>
                    <p>The smaller the tolerance, the harder the lock!</p>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="py-12 text-center">
              {won ? (
                <>
                  <div className="mb-4 inline-block rounded-full border-2 border-green-500/30 bg-green-600/20 p-4">
                    <Unlock className="h-16 w-16 text-green-400" />
                  </div>
                  <h3 className="mb-2 text-2xl text-green-100">Lock Picked!</h3>
                  <p className="mb-6 text-slate-400">You successfully opened the lock</p>
                  <div className="mb-6 flex justify-center gap-4">
                    <div className="rounded-lg bg-slate-800/40 px-4 py-2">
                      <Trophy className="mx-auto mb-1 h-5 w-5 text-yellow-400" />
                      <p className="text-sm text-slate-400">Reward</p>
                      <p className="text-yellow-400">{50 * settings.pins}g</p>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="mb-4 inline-block rounded-full border-2 border-red-500/30 bg-red-600/20 p-4">
                    <Lock className="h-16 w-16 text-red-400" />
                  </div>
                  <h3 className="mb-2 text-2xl text-red-100">Lock Jammed!</h3>
                  <p className="mb-6 text-slate-400">You broke your lockpick</p>
                </>
              )}
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
