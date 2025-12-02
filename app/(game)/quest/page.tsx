import { showAssigned } from '@/app/actions/quest'
import { QuestClient } from './_client'

/**
 * Quest Page - Server Component with SSR Hydration
 * Fetches assigned quests on server for instant render
 */
export default async function QuestPage() {
  const [data] = await showAssigned({})
  return <QuestClient initialData={data} />
}
