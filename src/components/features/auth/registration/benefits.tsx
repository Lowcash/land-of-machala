import { Card } from '@/components/ui/core/card'
import { List, ListItem } from '@/components/ui/core/list'
import { SparklesIcon } from '@/components/ui/icons'
import { MutedText } from '@/components/ui/prefabs/typography/shared'

interface RegistrationBenefitsProps {
  benefits: string[]
}

export function RegistrationBenefits({ benefits }: RegistrationBenefitsProps) {
  return (
    <Card padding="lg">
      <Card.Header>
        <Card.Title icon={<SparklesIcon size="md" />}>Začni své dobrodružství</Card.Title>
      </Card.Header>

      <Card.Content gap="md">
        <MutedText>Registrací získáš přístup do světa Machala, kde můžeš:</MutedText>

        <List>
          {benefits.map((benefit, i) => (
            <ListItem key={i}>
              <MutedText>{benefit}</MutedText>
            </ListItem>
          ))}
        </List>
      </Card.Content>
    </Card>
  )
}
