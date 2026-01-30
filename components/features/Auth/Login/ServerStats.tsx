import { Users } from 'lucide-react'

// Mock data for now - could be fetched from DB in a real Server Component
async function getStats() {
  return {
    activePlayers: 1247,
    bossKills: 89,
    topLevel: 87,
    completedQuests: '12k+',
  }
}

export async function ServerStats() {
  const stats = await getStats()

  return (
    <div className="rounded-lg border border-[#8b6f47] bg-black/80 p-4 shadow-xl backdrop-blur-md">
      <h3
        className="font-fantasy mb-4 flex items-center gap-2 text-base text-[#ffd700] uppercase"
        style={{ fontFamily: 'var(--font-fantasy)' }}
      >
        <Users className="h-5 w-5" />
        STATISTIKY SERVERU
      </h3>
      <div className="grid grid-cols-2 gap-4">
        <StatItem label="Aktivní hráči" value={stats.activePlayers} color="text-[#ffd700]" />
        <StatItem label="Zabití bossů" value={stats.bossKills} color="text-[#ff6b6b]" />
        <StatItem label="Top level" value={stats.topLevel} color="text-[#6fbf6f]" />
        <StatItem label="Questy" value={stats.completedQuests} color="text-[#69ccf0]" />
      </div>
    </div>
  )
}

function StatItem({
  label,
  value,
  color,
}: {
  label: string
  value: string | number
  color: string
}) {
  return (
    <div className="rounded border border-[#8b6f47]/30 bg-black/40 p-3 transition-colors hover:border-[#8b6f47]/60">
      <div className="mb-1 text-xs text-[#8b7355]">{label}</div>
      <div className={`text-xl ${color}`} style={{ fontFamily: 'var(--font-fantasy)' }}>
        {value}
      </div>
    </div>
  )
}
