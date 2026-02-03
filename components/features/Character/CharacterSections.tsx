import { User } from 'lucide-react'

import type { CharacterData } from '@/lib/types/game'

import { SplitLayout } from '@/components/layout/SplitLayout'
import { AvatarContainer, ProfileHeader } from '@/components/ui/display'
import { VStack } from '@/components/ui/stack'

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
        <VStack fullHeight overflow="scroll" p="md">
          <VStack gap="lg">
            <ProfileHeader
              avatar={
                <AvatarContainer size="lg" border="gold">
                  <User className="text-game-gold h-10 w-10 opacity-50" />
                </AvatarContainer>
              }
              title={character.name}
              subtitle={`${character.level} • ${character.race || 'Člověk'} • ${character.class || 'Válečník'}`}
            />

            <EquipmentList equipped={[]} />
          </VStack>
        </VStack>
      }
      aside={
        <VStack fullHeight overflow="scroll" p="md">
          <StatsPanel character={character} totalAttack={0} totalDefense={0} />
        </VStack>
      }
    />
  )
}
