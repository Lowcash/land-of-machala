import { Coins, Zap } from 'lucide-react'

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
    <div className="rounded border border-[#8b6f47] bg-black/60 p-4">
      <h3 className="mb-3 text-sm text-[#d4a574]" style={{ fontFamily: 'var(--font-fantasy)' }}>
        Odměny:
      </h3>
      <div className="flex flex-wrap gap-3">
        {rewardXp > 0 && (
          <div className="flex items-center gap-2 rounded border border-[#8b6f47] bg-black/40 px-3 py-2">
            <Zap className="h-4 w-4 text-[#ffd700]" />
            <span className="text-sm text-[#f5e6d3]">{rewardXp} XP</span>
          </div>
        )}
        {rewardGold > 0 && (
          <div className="flex items-center gap-2 rounded border border-[#8b6f47] bg-black/40 px-3 py-2">
            <Coins className="h-4 w-4 text-[#ffd700]" />
            <span className="text-sm text-[#f5e6d3]">{rewardGold} zlatých</span>
          </div>
        )}
        {Array.isArray(rewards) &&
          rewards.map((reward) =>
            reward.item ? (
              <div
                key={reward.id}
                className="flex items-center gap-2 rounded border border-[#8b6f47] bg-black/40 px-3 py-2"
              >
                <span className="text-sm text-[#69ccf0]">
                  {reward.quantity}x {reward.item.name}
                </span>
              </div>
            ) : null
          )}
      </div>
    </div>
  )
}
