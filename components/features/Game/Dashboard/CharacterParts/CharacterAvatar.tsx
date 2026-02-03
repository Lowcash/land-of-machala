import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { MetricBadge } from '@/components/ui/display'
import { VStack } from '@/components/ui/stack'

interface CharacterAvatarProps {
  name: string
  level: number
  isEnemy: boolean
  image?: string
}

export function CharacterAvatar({ name, level, isEnemy, image }: CharacterAvatarProps) {
  return (
    <VStack position="relative" shrink="0">
      <Avatar size="lg" variant={isEnemy ? 'enemy' : 'default'}>
        <AvatarImage src={image || ''} alt={name} />
        <AvatarFallback name={name} variant={isEnemy ? 'enemy' : 'player'} />
      </Avatar>
      <MetricBadge position="absolute" right="-2" bottom="-2" variant={isEnemy ? 'danger' : 'gold'}>
        {level}
      </MetricBadge>
    </VStack>
  )
}
