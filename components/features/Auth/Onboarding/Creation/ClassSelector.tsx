import { classes, isCasterClass, isTankClass } from '@/lib/game/onboarding'
import { cn } from '@/lib/utils'

import { Card } from '@/components/ui/card'
import { DetailRow } from '@/components/ui/display'
import { HStack, VStack } from '@/components/ui/stack'
import { Caption, Label, Span } from '@/components/ui/typography'

import { EntitySelector } from './EntitySelector'

interface SelectorProps {
  selectedId: string
  searchParams?: { [key: string]: string | string[] | undefined }
  isMobile?: boolean
}

export function ClassSelector({ selectedId, searchParams, isMobile }: SelectorProps) {
  return (
    <EntitySelector
      items={classes}
      selectedId={selectedId}
      paramName="class"
      searchParams={searchParams}
      isMobile={isMobile}
      title="Vyber své povolání"
      renderDetail={(c) => <ClassInfo classData={c} />}
    />
  )
}

function ClassInfo({ classData }: { classData: (typeof classes)[0] }) {
  const isCaster = isCasterClass(classData.id)
  const isTank = isTankClass(classData.id)

  return (
    <VStack gap="md" fullWidth>
      <VStack p="sm" fullWidth>
        <Card variant="muted" fullWidth>
          <Card.Content>
            <VStack gap="sm" fullWidth>
              <Caption color="gold-muted">{classData.desc}</Caption>

              <HStack>
                <VStack
                  rounded="sm"
                  border={isCaster ? 'magic' : isTank ? 'danger' : 'gold'}
                  bg={isCaster ? 'magic' : isTank ? 'danger' : 'gold'}
                  opacity="20"
                  px="sm"
                  py="xs"
                >
                  <Label
                    font="fantasy"
                    _internalClassName={cn(
                      isCaster ? 'text-game-magic' : isTank ? 'text-game-danger' : 'text-game-gold'
                    )}
                  >
                    {isCaster ? 'Kouzlící' : isTank ? 'Tank' : 'Hybrid'}
                  </Label>
                </VStack>
              </HStack>
            </VStack>
          </Card.Content>
        </Card>
      </VStack>

      <VStack border="game-t" pt="sm" gap="sm" fullWidth>
        <Label font="fantasy" color="gold">
          Bonusy povolání:
        </Label>
        <VStack gap="xs" fullWidth>
          {Object.entries(classData.statMod)
            .filter(([_, val]) => val !== 0)
            .map(([stat, val]) => (
              <DetailRow
                key={stat}
                label={stat}
                labelVariant="span"
                value={
                  <Span color={val > 0 ? 'success' : 'danger'} bold>
                    {val > 0 ? '+' : ''}
                    {val}
                  </Span>
                }
                className="capitalize"
              />
            ))}
        </VStack>
        <Caption color="muted" italic>
          {classData.bonuses}
        </Caption>
      </VStack>
    </VStack>
  )
}
