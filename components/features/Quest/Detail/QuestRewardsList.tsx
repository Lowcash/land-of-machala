import { Box, Coins, Zap } from 'lucide-react'

import { Card } from '@/components/ui/card'
import { BadgeGroup, StatBadge } from '@/components/ui/display'
import { VStack } from '@/components/ui/stack'
import { SectionHeading } from '@/components/ui/typography'

interface Reward {
  id: string
  item?: {
    name: string
  } | null
  quantity: number
}

interface QuestRewardsListProps {
  rewardXp: number
  rewardGold: number
  rewards: Reward[]
}

export function QuestRewardsList({ rewardXp, rewardGold, rewards }: QuestRewardsListProps) {
  return (
    <Card variant="muted">
      <Card.Content>
        <VStack gap="md">
          <SectionHeading>Odměny:</SectionHeading>
          <BadgeGroup>
            {rewardXp > 0 && <StatBadge label={`${rewardXp} XP`} icon={Zap} color="gold" />}
            {rewardGold > 0 && (
              <StatBadge label={`${rewardGold} zlatých`} icon={Coins} color="gold" />
            )}
            {Array.isArray(rewards) &&
              rewards.map((reward) =>
                reward.item ? (
                  <StatBadge
                    key={reward.id}
                    label={`${reward.quantity}x ${reward.item.name}`}
                    icon={Box}
                    color="gold"
                  />
                ) : null
              )}
          </BadgeGroup>
        </VStack>
      </Card.Content>
    </Card>
  )
}
