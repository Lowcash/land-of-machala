'use client'

import { useState } from 'react'

import { ChevronRight, Dices } from 'lucide-react'

import { TAVERN_OPTIONS } from '@/lib/game/constants/interactive'
import { useTavernActions, useTavernGamble } from '@/lib/hooks/game'

import { ActionGrid } from '@/components/ui/action'
import { Card } from '@/components/ui/card'
import { GameDie } from '@/components/ui/display'
import { Slider } from '@/components/ui/slider'
import { HStack, VStack } from '@/components/ui/stack'
import { Caption, MutedText, Span } from '@/components/ui/typography'

import { LocationAction } from '../Shared/components/LocationAction'
import { LocationLayout } from '../Shared/components/LocationLayout'

interface TavernActionsProps {
  gold: number
  onInfoAction: (text: string | null) => void
}

export function TavernActions({ gold, onInfoAction }: TavernActionsProps) {
  // 1. Hooks
  const { handleRumors, handleStay, handleDrink, isPending } = useTavernActions({
    gold,
    onInfoAction,
  })

  const { betAmount, setBetAmount, diceResult, gameState, rollDice } = useTavernGamble({
    gold,
    onInfoAction,
  })

  // 2. Navigation State
  const [activeTab, setActiveTab] = useState<'menu' | 'gamble'>('menu')

  // 3. Handlers
  const handleGambleTab = () => setActiveTab('gamble')
  const handleMenuTab = () => setActiveTab('menu')

  const getActionHandler = (id: string) => {
    switch (id) {
      case 'drink':
        return handleDrink
      case 'stay':
        return handleStay
      case 'rumors':
        return handleRumors
      case 'gamble':
        return handleGambleTab
      default:
        return () => {}
    }
  }

  if (activeTab === 'gamble') {
    return (
      <LocationLayout
        title="U Hladového skřeta"
        description="Hlasitý smích, cinkání korbelů a vůně pečeného masa. Ideální místo pro odpočinek i hazard."
      >
        <VStack gap="md">
          <LocationAction
            variant="ghost"
            title="Zpět k baru"
            icon={ChevronRight}
            onClick={handleMenuTab}
          />

          <Card variant="muted">
            <Card.Content>
              <VStack gap="md" align="center">
                <HStack fullWidth justify="around" align="center">
                  <VStack gap="xs" align="center">
                    <Caption color="gold" bold uppercase>
                      Ty
                    </Caption>
                    <HStack gap="sm">
                      <GameDie
                        value={diceResult?.player[0] || 1}
                        isRolling={gameState === 'rolling'}
                      />
                      <GameDie
                        value={diceResult?.player[1] || 1}
                        isRolling={gameState === 'rolling'}
                      />
                    </HStack>
                  </VStack>

                  <MutedText bold>VS</MutedText>

                  <VStack gap="xs" align="center">
                    <Caption color="danger" bold uppercase>
                      Hostinský
                    </Caption>
                    <HStack gap="sm">
                      <GameDie
                        value={diceResult?.house[0] || 1}
                        isRolling={gameState === 'rolling'}
                      />
                      <GameDie
                        value={diceResult?.house[1] || 1}
                        isRolling={gameState === 'rolling'}
                      />
                    </HStack>
                  </VStack>
                </HStack>

                <VStack gap="sm" fullWidth>
                  <HStack justify="between">
                    <Caption color="muted">Sázka:</Caption>
                    <Span color="gold" bold>
                      {betAmount}g
                    </Span>
                  </HStack>
                  <Slider
                    defaultValue={[betAmount]}
                    max={Math.min(gold, 500)}
                    min={10}
                    step={10}
                    onValueChange={(val) => val[0] !== undefined && setBetAmount(val[0])}
                    disabled={gameState === 'rolling'}
                  />
                </VStack>

                <LocationAction
                  title={gameState === 'rolling' ? 'Hází se...' : 'Hrát kostky'}
                  icon={Dices}
                  onClick={rollDice}
                  disabled={gameState === 'rolling' || gold < betAmount || isPending}
                  variant="compact"
                />
              </VStack>
            </Card.Content>
          </Card>
        </VStack>
      </LocationLayout>
    )
  }

  return (
    <LocationLayout
      title="U Hladového skřeta"
      description="Hlasitý smích, cinkání korbelů a vůně pečeného masa. Ideální místo pro odpočinek i hazard."
    >
      <ActionGrid columns={{ default: 1, sm: 2 }}>
        {TAVERN_OPTIONS.map((action) => (
          <LocationAction
            key={action.id}
            variant="large"
            title={action.title}
            description={action.description}
            icon={action.icon}
            onClick={getActionHandler(action.actionId)}
            disabled={isPending}
          />
        ))}
      </ActionGrid>
    </LocationLayout>
  )
}
