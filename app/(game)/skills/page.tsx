import { SkillsClient } from '@/components/features/Skills'
import { PageTemplate } from '@/components/layout/PageTemplate'
import { getSkillsPageData } from '@/lib/loaders/skills-loader'
import { Zap } from 'lucide-react'
import { redirect } from 'next/navigation'

export const dynamic = 'force-dynamic'

export default async function SkillsPage() {
  const data = await getSkillsPageData()

  if (!data) redirect('/onboarding')

  return (
    <PageTemplate
      title="Dovednosti"
      icon={<Zap />}
      maxWidth="lg"
      backLink={{ href: '/game', label: 'Zpět do hry' }}
      characterId={data.characterId}
    >
      <SkillsClient
        skills={data.skills}
        talentPoints={data.talentPoints}
        characterId={data.characterId}
      />
    </PageTemplate>
  )
}
