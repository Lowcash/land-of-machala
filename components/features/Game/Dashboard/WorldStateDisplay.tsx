import type { WorldState } from '@/types/events'

import {
  getWorldTimeColor,
  getWorldTimeIcon,
  getWorldWeatherColor,
  getWorldWeatherIcon,
} from '@/lib/game/world'

import { Card } from '@/components/ui/card'
import { Divider } from '@/components/ui/display'
import { HStack } from '@/components/ui/stack'
import { Caption, Span, type TypographyProps } from '@/components/ui/typography'

interface WorldStateDisplayProps {
  worldState: WorldState
}

export function WorldStateDisplay({ worldState }: WorldStateDisplayProps) {
  const WeatherIcon = getWorldWeatherIcon(worldState.weather, worldState.timeOfDay)
  const TimeIcon = getWorldTimeIcon(worldState.hour)
  const timeColor = getWorldTimeColor(worldState.timeOfDay)
  const weatherColor = getWorldWeatherColor(worldState.weather)

  return (
    <Card variant="muted" backdrop="medium">
      <Card.Content>
        <HStack align="center" gap="md" px="md" py="xs">
          {/* Time */}
          <HStack align="center" gap="sm">
            <TimeIcon className={`h-4 w-4 ${timeColor}`} />
            <HStack align="center" gap="sm">
              <Span color={timeColor as TypographyProps['color']}>{worldState.timeOfDay}</Span>
              <Caption color="muted">Den {worldState.dayNumber}</Caption>
            </HStack>
          </HStack>

          <Divider orientation="vertical" className="h-4" />

          {/* Weather */}
          <HStack align="center" gap="sm">
            <WeatherIcon className={`h-4 w-4 ${weatherColor}`} />
            <Span color={weatherColor as TypographyProps['color']} uppercase>
              {worldState.weather}
            </Span>
          </HStack>

          {/* Effects indicator */}
          {worldState.weatherEffects.combatModifier !== undefined &&
            worldState.weatherEffects.combatModifier !== 0 && (
              <>
                <Divider orientation="vertical" className="h-4" />
                <Caption color="muted">
                  Boj {worldState.weatherEffects.combatModifier > 0 ? '+' : ''}
                  {worldState.weatherEffects.combatModifier}%
                </Caption>
              </>
            )}
        </HStack>
      </Card.Content>
    </Card>
  )
}
