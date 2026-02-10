import * as React from 'react'
import { Button } from '@/components/ui/core/button'
import { Badge } from '@/components/ui/core/badge'

import { HStack, VStack } from '@/components/ui/core/stack'
import { Text } from '@/components/ui/core/typography'

interface ChoiceProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'className'> {
  index: number | string
  title: string
  description?: string
}

const Choice = React.forwardRef<HTMLButtonElement, ChoiceProps>(
  ({ index, title, description, ...props }, ref) => {
    const letter = typeof index === 'number' ? String.fromCharCode(65 + index) : index

    return (
      <Button
        ref={ref}
        variant="choice"
        {...props}
      >
        <HStack align="center" gap="md">
          <Badge
            variant="secondary"
            mode="outline"
            className="h-8 w-8 text-sm group-hover:border-(--color-primary) group-hover:text-(--color-primary)"
          >
            {letter}
          </Badge>
          <VStack gap="none">
            <Text 
              font="body" 
              className="text-base font-medium text-(--color-ivory) group-hover:text-(--color-primary) transition-colors"
            >
              {title}
            </Text>
            {description && (
              <Text 
                variant="muted" 
                className="text-xs text-(--color-secondary)/80"
              >
                {description}
              </Text>
            )}
          </VStack>
        </HStack>
      </Button>
    )
  }
)
Choice.displayName = 'Choice'

export { Choice }
