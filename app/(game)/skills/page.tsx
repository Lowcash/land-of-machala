import { SkillsClient } from '@/components/features/Skills'
import { getSkillsPageData } from '@/lib/loaders/skills-loader'
import { redirect } from 'next/navigation'

export const dynamic = 'force-dynamic'

export default async function SkillsPage() {
  const data = await getSkillsPageData()

  if (!data) redirect('/onboarding')

  return (
    <SkillsClient
      skills={data.skills}
      talentPoints={data.talentPoints}
      characterId={data.characterId}
    />
  )
}
