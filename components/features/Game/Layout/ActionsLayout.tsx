import { BasePanel } from '@/components/layout/BasePanel'
import { GameButton } from '@/components/ui/game/GameButton'
import { ArrowDown, ArrowLeft as ArrowLeftIcon, ArrowRight, ArrowUp, Home } from 'lucide-react'
import type { ReactNode } from 'react'

interface ActionsLayoutProps {
  children?: ReactNode // Main actions content
  exploration?: ReactNode // Exploration actions content (right column usually)
  showDirections: boolean
  onToggleDirections: () => void
  onStay?: () => void
  onMove?: (direction: 'north' | 'south' | 'east' | 'west') => void
  onBack?: () => void
  title?: string
}

export function ActionsLayout({
  children,
  exploration,
  showDirections,
  onToggleDirections,
  onStay,
  onMove,
  onBack,
  title,
}: ActionsLayoutProps) {
  return (
    <BasePanel title={title} className="bg-black/80 shadow-xl backdrop-blur-md">
      <div className="flex min-h-full flex-col justify-end gap-4">
        {showDirections ? (
          <>
            <div className="mb-4">
              <GameButton onClick={onStay ?? onToggleDirections} icon={Home} className="w-full">
                <span>Zůstat ve městě</span>
              </GameButton>
            </div>

            <div className="grid grid-cols-1 gap-3 pb-1 md:grid-cols-2">
              <GameButton
                onClick={() => onMove?.('north')}
                icon={ArrowUp}
                className="border-game-gold relative h-24 w-full overflow-hidden p-4 text-left"
              >
                <div
                  className="absolute inset-0 z-0 opacity-40 transition-opacity group-hover:opacity-60"
                  style={{
                    backgroundImage: 'url(/assets/locations/mountains-background.jpg)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                />
                <div className="absolute inset-0 z-10 bg-black/60" />
                <div className="relative z-20 flex flex-col gap-1">
                  <span className="text-game-gold text-lg font-bold uppercase">Sever</span>
                  <span className="text-game-gold-muted text-xs">Hory, Doly</span>
                </div>
              </GameButton>

              <GameButton
                onClick={() => onMove?.('south')}
                icon={ArrowDown}
                className="border-game-gold relative h-24 w-full overflow-hidden p-4 text-left"
              >
                <div
                  className="absolute inset-0 z-0 opacity-40 transition-opacity group-hover:opacity-60"
                  style={{
                    backgroundImage: 'url(/assets/locations/plains-background.jpg)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                />
                <div className="absolute inset-0 z-10 bg-black/60" />
                <div className="relative z-20 flex flex-col gap-1">
                  <span className="text-game-gold text-lg font-bold uppercase">Jih</span>
                  <span className="text-game-gold-muted text-xs">Pláně, Farmy</span>
                </div>
              </GameButton>

              <GameButton
                onClick={() => onMove?.('east')}
                icon={ArrowRight}
                className="border-game-gold relative h-24 w-full overflow-hidden p-4 text-left"
              >
                <div
                  className="absolute inset-0 z-0 opacity-40 transition-opacity group-hover:opacity-60"
                  style={{
                    backgroundImage: 'url(/assets/locations/desert-background.jpg)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                />
                <div className="absolute inset-0 z-10 bg-black/60" />
                <div className="relative z-20 flex flex-col gap-1">
                  <span className="text-game-gold text-lg font-bold uppercase">Východ</span>
                  <span className="text-game-gold-muted text-xs">Poušť, Oáza</span>
                </div>
              </GameButton>

              <GameButton
                onClick={() => onMove?.('west')}
                icon={ArrowLeftIcon}
                className="border-game-gold relative h-24 w-full overflow-hidden p-4 text-left"
              >
                <div
                  className="absolute inset-0 z-0 opacity-40 transition-opacity group-hover:opacity-60"
                  style={{
                    backgroundImage: 'url(/assets/locations/forest-background.jpg)', // Assuming forest exist
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                />
                <div className="absolute inset-0 z-10 bg-black/60" />
                <div className="relative z-20 flex flex-col gap-1">
                  <span className="text-game-gold text-lg font-bold uppercase">Západ</span>
                  <span className="text-game-gold-muted text-xs">Temný les</span>
                </div>
              </GameButton>
            </div>
          </>
        ) : (
          <div className="grid grid-cols-1 gap-3 pb-1 md:grid-cols-2">
            {/* Left Column - Exploration & Info */}
            <div className="flex flex-col justify-between space-y-2">
              <div className="space-y-2">
                <div className="text-game-copper-muted mb-1 text-xs font-bold tracking-wider uppercase">
                  Průzkum
                </div>
                {exploration}
              </div>
            </div>

            {/* Right Column - Main Actions */}
            <div className="space-y-2">
              <div className="text-game-copper-muted mb-1 text-xs font-bold tracking-wider uppercase">
                Akce
              </div>
              {children}
            </div>

            {/* Back Button (Full Width below columns if back action exists) */}
            {onBack && (
              <div className="col-span-full pt-2">
                <GameButton onClick={onBack} icon={ArrowLeftIcon} className="w-full">
                  Vrátit se do města
                </GameButton>
              </div>
            )}
          </div>
        )}
      </div>
    </BasePanel>
  )
}
