import type { LucideIcon } from 'lucide-react'

import { Card } from './card'
import { HStack } from './stack'
import { H3 } from './typography'

interface GameCardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'className'> {
  title?: string
  icon?: LucideIcon
  children: React.ReactNode
}

export function GameCard({ title, icon: Icon, children, ...props }: GameCardProps) {
  return (
    <Card variant="game" {...props}>
      <Card.Content>
        {title && (
          <HStack gap="sm" mb="md">
            {Icon && <Icon className="h-4 w-4 text-[#d4a574]" />}
            <H3 font="fantasy" color="copper">
              {title}
            </H3>
          </HStack>
        )}
        {children}
      </Card.Content>
    </Card>
  )
}
