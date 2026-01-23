import { Character } from '@/components/features/Character'
import { GameFooter, GameHeader } from '@/components/features/Game'
import { PageTemplate } from '@/components/layout/PageTemplate'
import { getCharacterPageData } from '@/lib/loaders/character-loader'
import { User } from 'lucide-react'

export const dynamic = 'force-dynamic'

export default async function CharacterPage() {
  const data = await getCharacterPageData()

  if (!data) {
    return (
      <PageTemplate
        header={
          <GameHeader
            title="Hrdina"
            icon={User}
            backLink={{ href: '/game', label: 'Zpět do hry' }}
          />
        }
        footer={<GameFooter />}
        maxWidth="lg"
      >
        <div className="p-8 text-center text-[#d4a574]">
          Nebyla nalezena postava. Prosím vytvořte si novou postavu.
        </div>
      </PageTemplate>
    )
  }

  return (
    <PageTemplate
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
    </PageTemplate>
  )
}
