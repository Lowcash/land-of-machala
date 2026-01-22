import { Character } from '@/components/features/Character'
import { PageTemplate } from '@/components/layout/PageTemplate'
import { getCharacterPageData } from '@/lib/loaders/character-loader'
import { User } from 'lucide-react'

export const dynamic = 'force-dynamic'

export default async function CharacterPage() {
  const data = await getCharacterPageData()

  if (!data) {
    return (
      <PageTemplate
        title="Hrdina"
        icon={<User />}
        maxWidth="lg"
        backLink={{ href: '/game', label: 'Zpět do hry' }}
      >
        <div className="p-8 text-center text-[#d4a574]">
          Nebyla nalezena postava. Prosím vytvořte si novou postavu.
        </div>
      </PageTemplate>
    )
  }

  return (
    <PageTemplate
      title="Hrdina"
      icon={<User />}
      maxWidth="lg"
      backLink={{ href: '/game', label: 'Zpět do hry' }}
      characterId={data.characterId}
    >
      <Character character={data.clientProps.character} inventory={data.clientProps.inventory} />
    </PageTemplate>
  )
}
