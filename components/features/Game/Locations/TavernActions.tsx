'use client'

import { useState } from 'react'

import { ChevronRight, Dices } from 'lucide-react'

import { TAVERN_OPTIONS } from '@/lib/game/constants/interactive'
import { useTavernActions, useTavernGamble } from '@/lib/hooks/game'

import { Slider } from '@/components/ui/slider'

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

  // 4. Sub-components (Render helpers)
  const Die = ({ val, rolling }: { val: number; rolling: boolean }) => (
    <div
      className={`flex h-10 w-10 items-center justify-center rounded border-2 border-[#8b6f47] bg-[#f5e6d3] text-2xl font-bold text-black shadow-lg ${rolling ? 'animate-spin' : ''}`}
    >
      {rolling ? '?' : val}
    </div>
  )

  if (activeTab === 'gamble') {
    return (
      <LocationLayout
        title="U Hladového skřeta"
        description="Hlasitý smích, cinkání korbelů a vůně pečeného masa. Ideální místo pro odpočinek i hazard."
      >
        <div className="space-y-4">
          <LocationAction
            variant="compact"
            title="Zpět k baru"
            icon={ChevronRight}
            className="h-auto border-none bg-transparent p-0 text-[#8b7355] hover:bg-transparent hover:text-[#d4a574]"
            onClick={handleMenuTab}
          />

          <div className="flex flex-col items-center gap-4 rounded border border-[#8b6f47]/30 bg-black/40 p-3">
            <div className="flex w-full items-center justify-around py-2">
              <div className="flex flex-col items-center gap-1">
                <span className="text-[10px] font-bold text-[#ffd700] uppercase">Ty</span>
                <div className="flex gap-1.5">
                  <Die val={diceResult?.player[0] || 1} rolling={gameState === 'rolling'} />
                  <Die val={diceResult?.player[1] || 1} rolling={gameState === 'rolling'} />
                </div>
              </div>
              <div className="text-sm font-bold text-[#8b7355]">VS</div>
              <div className="flex flex-col items-center gap-1">
                <span className="text-[10px] font-bold text-[#ff6b6b] uppercase">Hostinský</span>
                <div className="flex gap-1.5">
                  <Die val={diceResult?.house[0] || 1} rolling={gameState === 'rolling'} />
                  <Die val={diceResult?.house[1] || 1} rolling={gameState === 'rolling'} />
                </div>
              </div>
            </div>

            <div className="w-full space-y-2 px-2">
              <div className="flex justify-between text-[10px]">
                <span className="text-[#8b7355]">Sázka:</span>
                <span className="font-bold text-[#ffd700]">{betAmount}g</span>
              </div>
              <Slider
                defaultValue={[betAmount]}
                max={Math.min(gold, 500)}
                min={10}
                step={10}
                onValueChange={(val) => val[0] !== undefined && setBetAmount(val[0])}
                disabled={gameState === 'rolling'}
              />
            </div>

            <LocationAction
              title={gameState === 'rolling' ? 'Hází se...' : 'Hrát kostky'}
              icon={Dices}
              onClick={rollDice}
              disabled={gameState === 'rolling' || gold < betAmount || isPending}
              className="w-full py-2"
            />
          </div>
        </div>
      </LocationLayout>
    )
  }

  // No additional logic needed here, it's all in hooks

  return (
    <LocationLayout
      title="U Hladového skřeta"
      description="Hlasitý smích, cinkání korbelů a vůně pečeného masa. Ideální místo pro odpočinek i hazard."
    >
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
        {TAVERN_OPTIONS.map((action) => (
          <LocationAction
            key={action.id}
            variant="large"
            title={action.title}
            description={action.description}
            icon={action.icon}
            onClick={getActionHandler(action.actionId)}
            disabled={isPending}
            className="bg-black/40 hover:bg-black/60"
          />
        ))}
      </div>
    </LocationLayout>
  )
}
