import { Users } from 'lucide-react'

import { Card } from '@/components/ui/card'
import { StatCard } from '@/components/ui/display'
import { HStack, Stack, VStack } from '@/components/ui/stack'
import { GoldTitle } from '@/components/ui/typography'

// Mock data for now - could be fetched from DB in a real Server Component
async function getStats() {
  return [
    { label: 'Aktivní hráči', value: 1247, color: 'gold' as const },
    { label: 'Zabití bossů', value: 89, color: 'danger' as const },
    { label: 'Top level', value: 87, color: 'success' as const },
    { label: 'Questy', value: '12k+', color: 'magic' as const },
  ]
}

/**
 * Server statistics display for the authentication pages.
 * Shows global game metrics.
 */
export async function ServerStats() {
  const stats = await getStats()

  return (
    <Card variant="game">
      <VStack backdrop fullWidth>
        <Card.Content>
          <VStack gap="lg" fullWidth>
            <HStack gap="sm" align="center">
              <Users className="text-game-gold h-5 w-5" />
              <GoldTitle>STATISTIKY SERVERU</GoldTitle>
            </HStack>

            <Stack display="grid" gridCols="2" gap="md">
              {stats.map((stat) => (
                <StatCard key={stat.label} {...stat} />
              ))}
            </Stack>
          </VStack>
        </Card.Content>
      </VStack>
    </Card>
  )
}
