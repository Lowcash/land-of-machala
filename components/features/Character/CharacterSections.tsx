import { User } from 'lucide-react'

import type { CharacterData } from '@/lib/types/game'

import { SplitLayout } from '@/components/layout/SplitLayout'

import { EquipmentList } from './Equipment/EquipmentList'
import { StatsPanel } from './Profile/StatsPanel'

interface CharacterSectionsProps {
  character: CharacterData
}

export function CharacterSections({ character }: CharacterSectionsProps) {
  return (
    <SplitLayout
      asideWidth="lg"
      hideMobileAside={false}
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
