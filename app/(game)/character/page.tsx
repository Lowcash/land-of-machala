import { redirect } from 'next/navigation'

import { User } from 'lucide-react'

import { getCharacterPageData } from '@/lib/loaders/character-loader'

import { Character } from '@/components/features/Character'
import { GameFooter, GameHeader } from '@/components/features/Game'
import { PageLayout } from '@/components/layout/PageLayout'

export const dynamic = 'force-dynamic'

export default async function CharacterPage() {
  const data = await getCharacterPageData()

  if (!data) redirect('/onboarding')

  return (
    <PageLayout
      header={
        <GameHeader
          title="Hrdina"
          icon={User}
          characterId={data.characterId}
          backLink={{ href: '/game', label: 'Zpět do hry' }}
        />
      }
      footer={<GameFooter />}
      maxWidth="lg"
    >
      <Character character={data.clientProps.character} inventory={data.clientProps.inventory} />
    </PageLayout>
  )
}
