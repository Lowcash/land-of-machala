import * as React from 'react'

import { Badge } from '@/components/ui/core/badge'
import { Button } from '@/components/ui/core/button'
import { HStack, VStack } from '@/components/ui/core/stack'
import { Text } from '@/components/ui/core/typography'
import { MutedText } from '@/components/ui/prefabs/typography/shared'

interface ChoiceProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'className'> {
  index: number | string
  title: string
  description?: string
}

const Choice = React.forwardRef<HTMLButtonElement, ChoiceProps>(
  ({ index, title, description, ...props }, ref) => {
    const letter = typeof index === 'number' ? String.fromCharCode(65 + index) : index

    return (
      <Button ref={ref} variant="choice" {...props}>
        <HStack align="center" gap="md">
          <Badge size="md">{letter}</Badge>
          <VStack gap="none">
            <Text font="body">{title}</Text>
            {description && <MutedText>{description}</MutedText>}
          </VStack>
        </HStack>
      </Button>
    )
  }
)
Choice.displayName = 'Choice'

export { Choice }
