import { Card } from '@/components/ui/core/card'
import { List, ListItem } from '@/components/ui/core/list'
import { SparklesIcon } from '@/components/ui/icons'
import { MutedText } from '@/components/ui/prefabs/typography/shared'

interface BenefitsProps {
  title: string
  description: string
  benefits: string[]
  variant?: 'primary' | 'flat' | 'responsive'
}

export function Benefits({ title, description, benefits, variant = 'primary' }: BenefitsProps) {
  const content = (
    <Card.Content gap="md">
      <MutedText>{description}</MutedText>

      <List>
        {benefits.map((benefit, i) => (
          <ListItem key={i}>
            <MutedText>{benefit}</MutedText>
          </ListItem>
        ))}
      </List>
    </Card.Content>
  )

  if (variant === 'responsive') {
    return (
      <>
        {/* Mobile/Accordion: Flat view */}
        <Card variant="ghost" padding="md" md={{ display: 'none' }}>
          {content}
        </Card>

        {/* Desktop: Primary card view */}
        <Card variant="secondary" p="md" display="none" md={{ p: 'lg', display: 'flex' }}>
          <Card.Header>
            <Card.Title icon={<SparklesIcon size="md" />}>{title}</Card.Title>
          </Card.Header>
          {content}
        </Card>
      </>
    )
  }

  const isFlat = variant === 'flat'

  return (
    <Card variant={isFlat ? 'ghost' : 'secondary'} p="md" md={{ p: 'lg' }}>
      {!isFlat && (
        <Card.Header>
          <Card.Title icon={<SparklesIcon size="md" />}>{title}</Card.Title>
        </Card.Header>
      )}

      {content}
    </Card>
  )
}
