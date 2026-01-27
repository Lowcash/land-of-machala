import { redirect } from 'next/navigation'

import { TrendingUp } from 'lucide-react'

import { getSkillsPageData } from '@/lib/loaders/skills-loader'

import { GameFooter, GameHeader } from '@/components/features/Game'
import { Skills } from '@/components/features/Skills'
import { PageLayout } from '@/components/layout/PageLayout'

export const dynamic = 'force-dynamic'

export default async function SkillsPage({
  searchParams,
}: {
  searchParams: { skillId?: string; category?: string }
}) {
  const data = await getSkillsPageData()

  if (!data) redirect('/onboarding')

  return (
    <PageLayout
      header={
        <GameHeader
          title="Schopnosti"
          icon={TrendingUp}
          backLink={{ href: '/game', label: 'Zpět do hry' }}
        />
      }
      footer={<GameFooter />}
      maxWidth="lg"
    >
      <Skills skills={data.skills} talentPoints={data.talentPoints} searchParams={searchParams} />
    </PageLayout>
  )
}
