import { Card } from '@/components/ui/core/card'
import { List, ListItem } from '@/components/ui/core/list'
import { Heading } from '@/components/ui/core/typography'
import { SparklesIcon } from '@/components/ui/icons'
import { MutedText } from '@/components/ui/prefabs/typography/shared'

const BENEFITS = [
  'Vytvořit svého hrdinu z 6 ras a povolání',
  'Bojovat s monstry a získávat legendární předměty',
  'Plnit questy a odhalovat příběh země Machala',
  'Rozvíjet dovednosti ve 3 větvích talentů',
]

export function RegistrationBenefits() {
  return (
    <Card padding="lg">
      <Card.Header>
        <Card.Title icon={<SparklesIcon size="md" />}>Začni své dobrodružství</Card.Title>
      </Card.Header>

      <Card.Content gap="md">
        <MutedText>
          Registrací získáš přístup do světa Machala, kde můžeš:
        </MutedText>

        <List>
          {BENEFITS.map((benefit, i) => (
            <ListItem key={i}>
              <MutedText>{benefit}</MutedText>
            </ListItem>
          ))}
        </List>
      </Card.Content>
    </Card>
  )
}
