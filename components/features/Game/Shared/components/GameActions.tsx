import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import {
  ArrowDown,
  ArrowLeft as ArrowLeftIcon,
  ArrowRight,
  ArrowUp,
  Home,
  type LucideIcon,
} from 'lucide-react'
import type { ReactNode } from 'react'

interface GameActionsProps {
  children?: ReactNode
  exploration?: ReactNode
  showDirections: boolean
  onToggleDirections: () => void
  onStay?: () => void
  onMove?: (direction: 'north' | 'south' | 'east' | 'west') => void
  onBack?: () => void
  title?: string
  icon?: LucideIcon
}

export function GameActions({
  children,
  exploration,
  showDirections,
  onToggleDirections,
  onStay,
  onMove,
  onBack,
  title,
  icon: Icon,
}: GameActionsProps) {
  return (
    <Card
      variant="game"
      className="relative flex min-h-0 flex-1 flex-col overflow-hidden border-2 bg-black/80 shadow-xl backdrop-blur-md"
    >
      {title && (
        <CardHeader className="shrink-0 border-b border-[#8b6f47] bg-black/40 px-3 py-3 sm:px-4 sm:py-4">
          <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
            {Icon && <Icon className="h-5 w-5" />}
            {title}
          </CardTitle>
        </CardHeader>
      )}

      <ScrollArea className="flex-1 px-4 py-4" showIndicators>
        <div className="flex min-h-full flex-col justify-end gap-4">
          {showDirections ? (
            <>
              <div className="mb-4">
                <Button
                  variant="game-primary"
                  onClick={onStay ?? onToggleDirections}
                  className="w-full gap-2"
                >
                  <Home className="h-4 w-4" />
                  <span>Zůstat ve městě</span>
                </Button>
              </div>

              <div className="grid grid-cols-1 gap-3 pb-1 md:grid-cols-2">
                <Button
                  variant="game-primary"
                  onClick={() => onMove?.('north')}
                  className="relative h-24 w-full justify-start overflow-hidden p-0 text-left hover:brightness-110"
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
                  <div className="relative z-20 flex flex-col gap-1 p-4">
                    <span className="text-game-gold flex items-center gap-2 text-lg font-bold uppercase">
                      <ArrowUp className="h-4 w-4" />
                      Sever
                    </span>
                    <span className="text-game-gold-muted text-xs normal-case">Hory, Doly</span>
                  </div>
                </Button>

                <Button
                  variant="game-primary"
                  onClick={() => onMove?.('south')}
                  className="relative h-24 w-full justify-start overflow-hidden p-0 text-left hover:brightness-110"
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
                  <div className="relative z-20 flex flex-col gap-1 p-4">
                    <span className="text-game-gold flex items-center gap-2 text-lg font-bold uppercase">
                      <ArrowDown className="h-4 w-4" />
                      Jih
                    </span>
                    <span className="text-game-gold-muted text-xs normal-case">Pláně, Farmy</span>
                  </div>
                </Button>

                <Button
                  variant="game-primary"
                  onClick={() => onMove?.('east')}
                  className="relative h-24 w-full justify-start overflow-hidden p-0 text-left hover:brightness-110"
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
                  <div className="relative z-20 flex flex-col gap-1 p-4">
                    <span className="text-game-gold flex items-center gap-2 text-lg font-bold uppercase">
                      <ArrowRight className="h-4 w-4" />
                      Východ
                    </span>
                    <span className="text-game-gold-muted text-xs normal-case">Poušť, Oáza</span>
                  </div>
                </Button>

                <Button
                  variant="game-primary"
                  onClick={() => onMove?.('west')}
                  className="relative h-24 w-full justify-start overflow-hidden p-0 text-left hover:brightness-110"
                >
                  <div
                    className="absolute inset-0 z-0 opacity-40 transition-opacity group-hover:opacity-60"
                    style={{
                      backgroundImage: 'url(/assets/locations/forest-background.jpg)',
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                    }}
                  />
                  <div className="absolute inset-0 z-10 bg-black/60" />
                  <div className="relative z-20 flex flex-col gap-1 p-4">
                    <span className="text-game-gold flex items-center gap-2 text-lg font-bold uppercase">
                      <ArrowLeftIcon className="h-4 w-4" />
                      Západ
                    </span>
                    <span className="text-game-gold-muted text-xs normal-case">Temný les</span>
                  </div>
                </Button>
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
                  <Button variant="game-primary" onClick={onBack} className="w-full gap-2">
                    <ArrowLeftIcon className="h-4 w-4" />
                    Vrátit se do města
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>
      </ScrollArea>
    </Card>
  )
}
