import Link from 'next/link'

import { ArrowLeft, Lock, MapPin, Skull, Target, Trophy } from 'lucide-react'

import { Card } from '@/components/ui/card'
import { BadgeGroup, DetailRow, SectionHeader, StatBadge } from '@/components/ui/display'
import { GameGrid } from '@/components/ui/game-grid'
import { ScrollArea } from '@/components/ui/scroll-area'
import { HStack, VStack } from '@/components/ui/stack'
import { Caption, P, Span } from '@/components/ui/typography'

import type { Location } from '../Shared/types'

interface LocationDetailsProps {
  location: Location
}

const TYPE_LABELS = {
  TOWN: 'Město',
  DUNGEON: 'Dungeon',
  WILDERNESS: 'Divočina',
  LANDMARK: 'Zajímavost',
}

const DANGER_LEVELS = {
  TOWN: 'Bezpečné',
  DUNGEON: 'Velmi nebezpečné',
  WILDERNESS: 'Střední',
  LANDMARK: 'Proměnlivé',
}

const REWARD_LEVELS = {
  TOWN: 'Obchod',
  DUNGEON: 'Vysoké',
  WILDERNESS: 'Střední',
  LANDMARK: 'Legendární',
}

export function LocationDetails({ location }: LocationDetailsProps) {
  const isUnlocked = location.level <= 5 // Simple unlock logic

  const getTypeColor = (type: Location['type']): 'gold' | 'danger' | 'nature' | 'magic' => {
    switch (type) {
      case 'TOWN':
        return 'gold'
      case 'DUNGEON':
        return 'danger'
      case 'WILDERNESS':
        return 'nature'
      case 'LANDMARK':
        return 'magic'
      default:
        return 'gold'
    }
  }

  return (
    <VStack position="relative" fullHeight overflow="hidden">
      <ScrollArea>
        <VStack gap="md" fullWidth>
          {/* Back button (mobile only) */}
          <VStack
            display="hidden-md"
            position="sticky"
            top="0"
            z="30"
            px="md"
            py="sm"
            border="game-b"
            bg="black-80"
            backdrop
          >
            <Link
              href="?"
              className="text-game-gold hover:text-game-gold-muted inline-flex items-center gap-2 text-sm transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Zpět na mapu
            </Link>
          </VStack>

          <VStack px="md" pb="md">
            <VStack gap="lg">
              {/* Location header */}
              <VStack gap="sm">
                <SectionHeader color="gold" align="left">
                  {location.name}
                </SectionHeader>
                <BadgeGroup>
                  <StatBadge
                    label={TYPE_LABELS[location.type]}
                    icon={MapPin}
                    color={getTypeColor(location.type)}
                  />
                  {location.level > 1 && (
                    <StatBadge label={`Lvl ${location.level}`} icon={Target} color="danger" />
                  )}
                </BadgeGroup>
              </VStack>

              {/* Description */}
              <Card variant="muted" textured>
                <Card.Content>
                  <VStack gap="xs">
                    <SectionHeader color="gold" align="left" size="sm">
                      Popis:
                    </SectionHeader>
                    <P color="muted">
                      {location.description || 'Tajemné místo čekající na prozkoumání.'}
                    </P>
                  </VStack>
                </Card.Content>
              </Card>

              {/* Information */}
              {isUnlocked ? (
                <Card variant="muted" textured>
                  <Card.Content>
                    <VStack gap="md">
                      <SectionHeader color="gold" align="left" size="sm">
                        Informace:
                      </SectionHeader>
                      <GameGrid columns={{ default: 1, sm: 2 }} fullHeight={false}>
                        <DetailRow
                          label={
                            <HStack gap="xs" align="center">
                              <Target className="text-game-copper-muted h-4 w-4" />
                              <Span color="muted">Doporučený level</Span>
                            </HStack>
                          }
                          value={`${location.level}+`}
                          py="xs"
                        />
                        <DetailRow
                          label={
                            <HStack gap="xs" align="center">
                              <Skull className="text-game-danger h-4 w-4" />
                              <Span color="muted">Nepřátelé</Span>
                            </HStack>
                          }
                          value={DANGER_LEVELS[location.type]}
                          py="xs"
                        />
                        <DetailRow
                          label={
                            <HStack gap="xs" align="center">
                              <Trophy className="text-game-gold h-4 w-4" />
                              <Span color="muted">Odměny</Span>
                            </HStack>
                          }
                          value={REWARD_LEVELS[location.type]}
                          py="xs"
                        />
                        <DetailRow
                          label={
                            <HStack gap="xs" align="center">
                              <MapPin className="text-game-info h-4 w-4" />
                              <Span color="muted">Pozice</Span>
                            </HStack>
                          }
                          value={`${location.positionX}, ${location.positionY}`}
                          py="xs"
                        />
                      </GameGrid>
                    </VStack>
                  </Card.Content>
                </Card>
              ) : (
                <Card variant="muted">
                  <Card.Content>
                    <VStack align="center" gap="sm" p="lg">
                      <Lock className="text-game-danger h-8 w-8" />
                      <VStack align="center" gap="none">
                        <P color="danger" bold uppercase letterSpacing="wider">
                          Uzamčená lokace
                        </P>
                        <Caption color="muted">
                          Dosáhni level {location.level} pro odemknutí
                        </Caption>
                      </VStack>
                    </VStack>
                  </Card.Content>
                </Card>
              )}
            </VStack>
          </VStack>
        </VStack>
      </ScrollArea>
    </VStack>
  )
}
