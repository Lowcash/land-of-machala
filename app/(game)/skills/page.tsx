import { GameFooter, GameHeader } from '@/components/features/Game'
import { SkillsClient } from '@/components/features/Skills'
import { PageLayout } from '@/components/layout/PageLayout'
import { getSkillsPageData } from '@/lib/loaders/skills-loader'
import { TrendingUp } from 'lucide-react'
import { redirect } from 'next/navigation'

export const dynamic = 'force-dynamic'

export default async function SkillsPage() {
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
      <SkillsClient
        skills={data.skills}
        talentPoints={data.talentPoints}
        characterId={data.characterId}
      />
    </PageLayout>
  )
}
