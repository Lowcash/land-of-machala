'use client'

import { GameFooter, GameHeader } from '@/components/features/Game'
import { SplitLayout } from '@/components/layout'
import { PageLayout } from '@/components/layout/PageLayout'
import { BookOpen } from 'lucide-react'
import { useState } from 'react'
import { SkillDetailPanel as SkillDetail } from './Detail/SkillDetailPanel'
import { SkillGrid } from './Grid/SkillGrid'
import type { MergedSkill, SkillCategory } from './Shared/types'

interface SkillsClientProps {
  characterId: string
  talentPoints: number
  skills: MergedSkill[]
}

export function SkillsClient({ characterId, talentPoints, skills }: SkillsClientProps) {
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
            talentPoints={talentPoints}
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
            characterId={characterId}
            talentPoints={talentPoints}
          />
        }
      />
    </PageLayout>
  )
}
