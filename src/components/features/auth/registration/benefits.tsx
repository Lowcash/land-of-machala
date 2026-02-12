import { Card } from '@/components/ui/core/card'
import { List, ListItem } from '@/components/ui/core/list'
import { SparklesIcon } from '@/components/ui/icons'
import { MutedText } from '@/components/ui/prefabs/typography/shared'

interface RegistrationBenefitsProps {
  benefits: string[]
  minimal?: boolean
  forceMinimal?: boolean
}

export function RegistrationBenefits({
  benefits,
  minimal,
  forceMinimal,
}: RegistrationBenefitsProps) {
  const content = (
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
  )

  if (forceMinimal) {
    return (
      <Card variant="subtle" padding="md">
        {content}
      </Card>
    )
  }

  if (minimal) {
    return (
      <>
        {/* Mobile Accordion Mode */}
        <Card variant="subtle" padding="md" lg={{ display: 'none' }}>
          {content}
        </Card>

        {/* Desktop Normal Mode */}
        <Card variant="primary" display="none" lg={{ display: 'flex' }} padding="lg">
          <Card.Header>
            <Card.Title icon={<SparklesIcon size="md" />}>Začni své dobrodružství</Card.Title>
          </Card.Header>
          {content}
        </Card>
      </>
    )
  }

  return (
    <Card padding="lg">
      <Card.Header>
        <Card.Title icon={<SparklesIcon size="md" />}>Začni své dobrodružství</Card.Title>
      </Card.Header>
      {content}
    </Card>
  )
}
