'use client'

import { useState, useTransition } from 'react'

import { useRouter } from 'next/navigation'

import { BedDouble, Beer, ChevronRight, Dices, ScrollText } from 'lucide-react'
import { toast } from 'sonner'

import { rollDiceAction } from '@/lib/actions/game-actions'
import { buyRumorAction, buyStayAction } from '@/lib/actions/tavern'

import { Slider } from '@/components/ui/slider'

import { LocationAction } from '../Shared/components/LocationAction'
import { LocationLayout } from '../Shared/components/LocationLayout'

interface TavernActionsProps {
  gold: number
  onInfoAction: (text: string | null) => void
}

export function TavernActions({ gold, onInfoAction }: TavernActionsProps) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [activeTab, setActiveTab] = useState<'menu' | 'gamble'>('menu')
  const [betAmount, setBetAmount] = useState(10)
  const [diceResult, setDiceResult] = useState<{ player: number[]; house: number[] } | null>(null)
  const [gameState, setGameState] = useState<'idle' | 'rolling' | 'result'>('idle')
  const handleRumors = () => {
    if (gold < 5) {
      onInfoAction('Nemáš dost zlata na drink pro štamgasta! (5g)')
      return
    }

    startTransition(async () => {
      const [data, err] = await buyRumorAction()
      if (!err && data?.success) {
        onInfoAction(`${data.message} ${data.rumor}`)
        router.refresh()
      } else {
        toast.error(err?.message || data?.message || 'Nákup selhal')
      }
    })
  }

  const handleStay = () => {
    if (gold < 10) {
      onInfoAction('Nemáš dost zlata na pokoj! (10g)')
      return
    }

    startTransition(async () => {
      const [data, err] = await buyStayAction()
      if (!err && data?.success) {
        onInfoAction(data.message)
        router.refresh()
      } else {
        toast.error(err?.message || data?.message || 'Ubytování selhalo')
      }
    })
  }

  const rollDice = () => {
    if (gold < betAmount) {
      onInfoAction('Nemáš dost zlata na sázku!')
      return
    }

    startTransition(async () => {
      setGameState('rolling')
      try {
        const [result, err] = await rollDiceAction({ betAmount })
        if (err) throw err

        await new Promise((r) => setTimeout(r, 600))
        setDiceResult({ player: result.player, house: result.house })
        setGameState('result')
        if (result.result === 'win') {
          onInfoAction(`Vyhrál jsi ${result.goldChange}g!`)
        } else if (result.result === 'lose') {
          onInfoAction(`Prohrál jsi ${Math.abs(result.goldChange)}g.`)
        } else {
          onInfoAction('Remíza! Sázka se vrací.')
        }
      } catch (error) {
        onInfoAction(error instanceof Error ? error.message : 'Chyba při hře.')
      }
    })
  }

  const Die = ({ val, rolling }: { val: number; rolling: boolean }) => (
    <div
      className={`flex h-10 w-10 items-center justify-center rounded border-2 border-[#8b6f47] bg-[#f5e6d3] text-2xl font-bold text-black shadow-lg ${rolling ? 'animate-spin' : ''}`}
    >
      {rolling ? '?' : val}
    </div>
  )

  if (activeTab === 'gamble') {
    return (
      <div className="space-y-4">
        <LocationAction
          variant="compact"
          title="Zpět k baru"
          icon={ChevronRight}
          className="h-auto border-none bg-transparent p-0 text-[#8b7355] hover:bg-transparent hover:text-[#d4a574]"
          onClick={() => setActiveTab('menu')}
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
    )
  }

  return (
    <LocationLayout
      title="Hostinec 'U Hladového skřeta'"
      description="Uvnitř je rušno a zakouřeno. Hostinský právě utírá stůl a v rohu parta dobrodruhů hraje kostky."
    >
      <LocationAction
        variant="compact"
        title="Koupit"
        description="pivo"
        icon={Beer}
        rightElement={<span className="text-[10px] text-[#8b7355]">(5g)</span>}
        onClick={() => {}}
      />
      <LocationAction
        variant="compact"
        title="Odpočinout si"
        icon={BedDouble}
        rightElement={<span className="text-[10px] text-[#8b7355]">(10g)</span>}
        disabled={isPending}
        onClick={handleStay}
      />
      <LocationAction
        variant="compact"
        title="Drby a"
        description="zvěsti"
        icon={ScrollText}
        rightElement={<span className="text-[10px] text-[#8b7355]">(5g)</span>}
        onClick={handleRumors}
      />
      <LocationAction
        variant="compact"
        title="Hrát"
        description="kostky"
        icon={Dices}
        onClick={() => setActiveTab('gamble')}
      />
    </LocationLayout>
  )
}
