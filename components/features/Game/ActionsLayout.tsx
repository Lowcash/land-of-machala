'use client'

import { ArrowDown, ArrowLeft as ArrowLeftIcon, ArrowRight, ArrowUp, Home } from 'lucide-react'
import type { ReactNode } from 'react'
import { ActionBtn, DirectionBtn } from './ActionBtn'
import { GamePanel } from './GameLayout'

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
    <GamePanel title={title}>
      <div className="flex min-h-full flex-col justify-end gap-4">
        {showDirections ? (
          <>
            <div className="mb-4">
              <ActionBtn onClick={onStay ?? onToggleDirections} icon={Home}>
                <span>Zůstat ve městě</span>
              </ActionBtn>
            </div>

            <div className="grid grid-cols-1 gap-3 pb-1 md:grid-cols-2">
              <DirectionBtn
                onClick={() => onMove?.('north')}
                icon={ArrowUp}
                image="/assets/locations/mountains-background.jpg"
              >
                <span className="text-[#ffd700]">Sever</span> - Hory
              </DirectionBtn>
              <DirectionBtn
                onClick={() => onMove?.('south')}
                icon={ArrowDown}
                image="/assets/locations/plains-background.jpg"
              >
                <span className="text-[#ffd700]">Jih</span> - Pláně
              </DirectionBtn>
              <DirectionBtn
                onClick={() => onMove?.('east')}
                icon={ArrowRight}
                image="/assets/locations/desert-background.jpg"
              >
                <span className="text-[#ffd700]">Východ</span> - Poušť
              </DirectionBtn>
              <ActionBtn onClick={() => onMove?.('west')} icon={ArrowLeftIcon}>
                <span className="text-[#ffd700]">Západ</span> - Les
              </ActionBtn>
            </div>
          </>
        ) : (
          <div className="grid grid-cols-1 gap-3 pb-1 md:grid-cols-2">
            {/* Left Column - Exploration & Info */}
            <div className="flex flex-col justify-between space-y-2">
              <div className="space-y-2">
                <div className="mb-1 text-xs font-bold tracking-wider text-[#8b7355] uppercase">
                  Průzkum
                </div>
                {exploration}
              </div>
            </div>

            {/* Right Column - Main Actions */}
            <div className="space-y-2">
              <div className="mb-1 text-xs font-bold tracking-wider text-[#8b7355] uppercase">
                Akce
              </div>
              {children}
            </div>

            {/* Back Button (Full Width below columns if back action exists) */}
            {onBack && (
              <div className="col-span-full pt-2">
                <ActionBtn onClick={onBack} icon={ArrowLeftIcon}>
                  Vrátit se do města
                </ActionBtn>
              </div>
            )}
          </div>
        )}
      </div>
    </GamePanel>
  )
}
