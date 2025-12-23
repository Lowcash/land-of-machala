import { ArrowLeft, Gift, Scroll, Shield, Trophy, Users } from 'lucide-react'
import { ActionBtn } from './ActionBtn'
import { GameLayout, GamePanel } from './GameLayout'

interface GuildHallActionsProps {
  onBack: () => void
  onOpenFactions?: () => void
  setInfoText: (text: string) => void
  playerReputation?: number
}

export function GuildHallActions({
  onBack,
  onOpenFactions,
  setInfoText,
  playerReputation = 0,
}: GuildHallActionsProps) {
  return (
    <GameLayout>
      <GamePanel title="Guild Hall">
        <div className="space-y-4">
          <div className="mb-2 flex items-center justify-between rounded border border-purple-500/30 bg-black/40 p-2">
            <ActionBtn icon={ArrowLeft} onClick={onBack}>
              Back to Town
            </ActionBtn>
          </div>

          <div className="rounded-lg border border-purple-500/30 bg-purple-900/20 p-4">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-sm text-purple-200">Total Reputation</span>
              <span className="text-lg text-purple-100">{playerReputation}</span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-slate-900/60">
              <div
                className="h-full bg-gradient-to-r from-purple-600 to-purple-400"
                style={{ width: `${Math.min((playerReputation / 1000) * 100, 100)}%` }}
              />
            </div>
          </div>

          <div className="grid gap-3">
            <ActionBtn
              icon={Users}
              onClick={() => {
                setInfoText('Opening faction overview...')
                onOpenFactions?.()
              }}
            >
              View Factions - Manage your guild memberships and reputation
            </ActionBtn>

            <ActionBtn
              icon={Scroll}
              onClick={() => {
                setInfoText('Opening faction quest board...')
                onOpenFactions?.()
              }}
            >
              Faction Quests - Accept quests from your guilds
            </ActionBtn>

            <ActionBtn
              icon={Trophy}
              onClick={() => {
                setInfoText('The Hall of Fame chronicles the greatest heroes...')
              }}
            >
              Hall of Fame - View legendary guild members (Coming Soon)
            </ActionBtn>

            <ActionBtn
              icon={Gift}
              onClick={() => {
                setInfoText('No rewards available at this time.')
              }}
            >
              Guild Rewards - Claim rewards for your achievements (Coming Soon)
            </ActionBtn>
          </div>
        </div>
      </GamePanel>

      <GamePanel title="Guild Information">
        <div className="flex gap-3 rounded border border-purple-500/30 bg-black/60 p-3 text-xs leading-relaxed text-purple-200">
          <div className="flex h-[40px] min-w-[40px] items-center justify-center rounded-full border border-purple-500/30 bg-purple-600/20">
            <Shield className="h-5 w-5 text-purple-400" />
          </div>
          <div>
            The Guild Hall is the heart of organized adventurers in Machala. Join guilds and
            factions to gain access to exclusive quests, powerful equipment, and valuable allies.
          </div>
        </div>
      </GamePanel>
    </GameLayout>
  )
}
