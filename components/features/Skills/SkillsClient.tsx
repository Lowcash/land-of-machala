'use client'

import { GameFooter, GameHeader } from '@/components/features/Game'
import { SplitLayout } from '@/components/layout'
import { BookOpen } from 'lucide-react'
import { useState } from 'react'
import type { CharacterData, MergedSkill, SkillCategory } from '../Character/Shared/types'
import { SkillDetail } from './Detail/SkillDetail'
import { SkillGrid } from './Grid/SkillGrid'

interface SkillsClientProps {
  character: CharacterData
  skills: MergedSkill[]
}

export function SkillsClient({ character, skills }: SkillsClientProps) {
  const [selectedCategory, setSelectedCategory] = useState<SkillCategory>('all')
  const [selectedSkillId, setSelectedSkillId] = useState<string | null>(null)

  const selectedSkill = skills.find((s) => s.id === selectedSkillId) || null

  return (
    <PageLayout
      header={<GameHeader title="Dovednosti" icon={BookOpen} />}
      footer={<GameFooter />}
      backgroundImage="/assets/locations/forest.jpg"
      showInfoLog={false}
    >
      <SplitLayout
        asideWidth="lg"
        hideMobileAside={!selectedSkillId}
        main={
          <SkillGrid
            skills={skills}
            talentPoints={character.talentPoints}
            selectedCategory={selectedCategory}
            onSelectCategoryAction={setSelectedCategory}
            selectedSkill={selectedSkillId}
            onSelectSkillAction={setSelectedSkillId}
          />
        }
        aside={
          <SkillDetail
            skill={selectedSkill}
            onClose={() => setSelectedSkillId(null)}
            characterId={character.id}
            talentPoints={character.talentPoints}
          />
        }
      />
    </PageTemplate>
  )
}
