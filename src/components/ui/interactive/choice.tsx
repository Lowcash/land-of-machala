import { type ButtonHTMLAttributes, forwardRef } from 'react'

import { Badge } from '@/components/ui/core/badge'
import { Button } from '@/components/ui/core/button'
import { HStack, VStack } from '@/components/ui/core/stack'
import { Text } from '@/components/ui/core/typography'

interface ChoiceItemProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className'> {
  index: number | string
  title: string
}

const ChoiceItem = forwardRef<HTMLButtonElement, ChoiceItemProps>(
  ({ index, title, ...props }, ref) => {
    const letter = typeof index === 'number' ? String.fromCharCode(65 + index) : index

    return (
      <Button ref={ref} variant="choice" {...props}>
        <HStack align="center" justify="center" gap="md" fullWidth>
          <Badge size="md" variant="primary">
            {letter}
          </Badge>
          <Text font="fantasy" className="leading-tight">
            {title}
          </Text>
        </HStack>
      </Button>
    )
  }
)
ChoiceItem.displayName = 'ChoiceItem'

interface ChoiceProps {
  children: React.ReactNode
}

const Choice = ({ children }: ChoiceProps) => {
  return (
    <VStack gap="md" fullWidth>
      {children}
    </VStack>
  )
}

export { Choice, ChoiceItem }
