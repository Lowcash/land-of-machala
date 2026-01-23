import { QuestClient } from '@/components/features/Quest'
import { getQuestPageData } from '@/lib/loaders/quest-loader'
import { redirect } from 'next/navigation'

export const dynamic = 'force-dynamic'

export default async function QuestsPage() {
  const data = await getQuestPageData()

  if (!data) redirect('/onboarding')

  return <QuestClient quests={data.quests} characterId={data.characterId} />
}
