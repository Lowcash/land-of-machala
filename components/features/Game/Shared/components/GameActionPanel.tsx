import type { ReactNode } from 'react'

import type { LucideIcon } from 'lucide-react'

import { Card, CardHeader, CardTitle } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'

interface GameActionPanelProps {
  title?: string
  icon?: LucideIcon
  children?: ReactNode
  mainContent?: ReactNode
  sideContent?: ReactNode
  sideTitle?: string
  mainTitle?: string
  footer?: ReactNode
}

export function GameActionPanel({
  title,
  icon: Icon,
  children,
  mainContent,
  sideContent,
  sideTitle = 'Průzkum',
  mainTitle = 'Akce',
  footer,
}: GameActionPanelProps) {
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
          {children ? (
            children
          ) : (
            <div className="grid grid-cols-1 gap-3 pb-1 md:grid-cols-2">
              {/* Left Column (Side Content) */}
              {sideContent && (
                <div className="flex flex-col justify-between space-y-2">
                  <div className="space-y-2">
                    <div className="text-game-copper-muted mb-1 text-xs font-bold tracking-wider uppercase">
                      {sideTitle}
                    </div>
                    {sideContent}
                  </div>
                </div>
              )}

              {/* Right Column (Main Content) */}
              {mainContent && (
                <div className="space-y-2">
                  <div className="text-game-copper-muted mb-1 text-xs font-bold tracking-wider uppercase">
                    {mainTitle}
                  </div>
                  {mainContent}
                </div>
              )}

              {/* Footer (Full Width) */}
              {footer && <div className="col-span-full pt-2">{footer}</div>}
            </div>
          )}
        </div>
      </ScrollArea>
    </Card>
  )
}
