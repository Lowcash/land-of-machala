import { ArrowLeft, Gift, Scroll, Shield, Trophy, Users } from 'lucide-react'
import { ActionBtn } from './ActionBtn'

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
    <div className="space-y-4">
      <div className="mb-6 rounded-lg border border-slate-700/30 bg-slate-800/40 p-6 backdrop-blur-sm">
        <div className="mb-4 flex items-start gap-4">
          <div className="rounded-lg border border-purple-500/30 bg-purple-600/20 p-3">
            <Shield className="h-8 w-8 text-purple-400" />
          </div>
          <div className="flex-1">
            <h2 className="mb-2 text-xl text-purple-100">Guild Hall</h2>
            <p className="text-sm leading-relaxed text-slate-400">
              The Guild Hall is the heart of organized adventurers in Machala. Join guilds and
              factions to gain access to exclusive quests, powerful equipment, and valuable allies.
            </p>
          </div>
        </div>

        {/* Reputation Display */}
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

      <div className="border-t border-slate-700/30 pt-4">
        <ActionBtn icon={ArrowLeft} onClick={onBack}>
          Back to Town
        </ActionBtn>
      </div>
    </div>
  )
}
