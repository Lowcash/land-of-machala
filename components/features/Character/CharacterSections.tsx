'use client'

import { SplitLayout } from '@/components/layout/SplitLayout'
import { User } from 'lucide-react'
import type { CharacterData } from '../Character/Shared/types'
import { EquipmentList } from './Equipment/EquipmentList'
import { StatsPanel } from './Profile/StatsPanel'

interface CharacterSectionsProps {
  character: CharacterData
}

export function CharacterSections({ character }: CharacterSectionsProps) {
  // Can add sub-tabs here if needed
  return (
    <SplitLayout
      asideWidth="lg"
      hideMobileAside={false} // Always show stats on mobile too? Or stack them?
      // Actually Character profile usually stacks on mobile.
      // SplitLayout hides aside on mobile by default if not tailored.
      // Let's check SplitLayout impl: it hides if hideMobileAside is true.
      // If we seek a stacked layout, SplitLayout might not be perfect or we set hideMobileAside=false
      // and let CSS handle stacking if it does (it currently is hidden md:block).
      // If we want stacked, we might strictly not use SplitLayout or accept the behavior.
      // Original usage used SplitView.
      main={
        <div className="h-full overflow-y-auto p-4">
          <div className="mb-6 flex items-center gap-4">
            <div className="border-game-gold h-20 w-20 shrink-0 overflow-hidden rounded-full border-2 bg-black">
              {/* Avatar placeholder */}
              <div className="flex h-full w-full items-center justify-center bg-[#1a1a1a]">
                <User className="text-game-gold h-10 w-10 opacity-50" />
              </div>
            </div>
            <div>
              <h1 className="font-medieval text-game-gold text-2xl font-bold">{character.name}</h1>
              <div className="text-game-copper-muted flex gap-2 text-sm">
                <span>Level {character.level}</span>
                <span>•</span>
                <span>{character.race || 'Člověk'}</span>
                <span>•</span>
                <span>{character.class || 'Válečník'}</span>
              </div>
            </div>
          </div>

          <EquipmentList equipped={[]} />
        </div>
      }
      aside={
        <div className="h-full overflow-y-auto p-4">
          <StatsPanel character={character} totalAttack={0} totalDefense={0} />
        </div>
      }
    />
  )
}
