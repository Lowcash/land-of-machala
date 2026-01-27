import { BookOpen } from 'lucide-react'

import { GameFooter, GameHeader } from '@/components/features/Game'
import { SplitLayout } from '@/components/layout'
import { PageLayout } from '@/components/layout/PageLayout'

import type { MergedSkill } from './Shared/types'
import { SkillDetailWrapper } from './SkillDetailWrapper'
import { SkillsGridWrapper } from './SkillsGridWrapper'

interface SkillsDashboardProps {
  talentPoints: number
  skills: MergedSkill[]
  searchParams: { skillId?: string; category?: string }
}

export async function SkillsDashboard({
  talentPoints,
  skills,
  searchParams,
}: SkillsDashboardProps) {
  const selectedSkillId = searchParams?.skillId || null

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
          <SkillsGridWrapper
            skills={skills}
            talentPoints={talentPoints}
            searchParams={searchParams}
          />
        }
        aside={
          <SkillDetailWrapper
            skill={selectedSkill}
            talentPoints={talentPoints}
            searchParams={searchParams}
          />
        }
      />
    </PageLayout>
  )
}
