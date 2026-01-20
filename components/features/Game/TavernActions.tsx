'use client'

import { BedDouble, Beer, ChevronRight, Dices, ScrollText } from 'lucide-react'
import { useState } from 'react'
import { ActionBtn } from './ActionBtn'
import { ActionsLayout } from './ActionsLayout'
import { GamePanel } from './GameLayout'

interface TavernActionsProps {
  onBack: () => void
  onRest: () => void
  gold: number
  setGold: (gold: number | ((prev: number) => number)) => void
  setInfoText: (text: string) => void
}

export function TavernActions({ onBack, onRest, gold, setGold, setInfoText }: TavernActionsProps) {
  const [activeTab, setActiveTab] = useState<'menu' | 'gamble'>('menu')
  const [betAmount, setBetAmount] = useState(10)
  const [diceResult, setDiceResult] = useState<{ player: number[]; house: number[] } | null>(null)
  const [gameState, setGameState] = useState<'idle' | 'rolling' | 'result'>('idle')

  const handleRumors = () => {
    if (gold < 5) {
      setInfoText('Nemáš dost zlata na drink pro štamgasta! (5g)')
      return
    }
    setGold((prev: number) => Math.max(0, prev - 5))
    const rumors = [
      'Opilý trpaslík ti prozradil, že v horách našel žílu zlata, ale vyhnali ho obři.',
      'Zaslechl jsi, že starosta má tajný tunel z radnice rovnou do banky.',
      'Někdo říkal, že v noci vylézají z kanálů obří krysy s červenýma očima.',
      'Hostinský prý míchá pivo s vodou z řeky, proto je tak levné.',
    ]
    const rumor = rumors[Math.floor(Math.random() * rumors.length)]
    setInfoText(`Koupil jsi rundu (5g). ${rumor}`)
  }

  const rollDice = () => {
    if (gold < betAmount) {
      setInfoText('Nemáš dost zlata na sázku!')
      return
    }

    setGameState('rolling')
    setGold((prev) => prev - betAmount)

    // Animation delay
    setTimeout(() => {
      const p1 = Math.floor(Math.random() * 6) + 1
      const p2 = Math.floor(Math.random() * 6) + 1
      const h1 = Math.floor(Math.random() * 6) + 1
      const h2 = Math.floor(Math.random() * 6) + 1

      const playerSum = p1 + p2
      const houseSum = h1 + h2

      setDiceResult({ player: [p1, p2], house: [h1, h2] })
      setGameState('result')

      if (playerSum > houseSum) {
        const win = betAmount * 2
        setGold((prev) => prev + win)
        setInfoText(`Vyhrál jsi ${win}g!`)
      } else if (playerSum < houseSum) {
        setInfoText(`Prohrál jsi ${betAmount}g.`)
      } else {
        setGold((prev) => prev + betAmount)
        setInfoText('Remíza! Sázka se vrací.')
      }
    }, 600)
  }

  const Die = ({ val, rolling }: { val: number; rolling: boolean }) => (
    <div
      className={`flex h-10 w-10 items-center justify-center rounded border-2 border-[#8b6f47] bg-[#f5e6d3] text-2xl font-bold text-black shadow-lg ${rolling ? 'animate-spin' : ''}`}
    >
      {rolling ? '?' : val}
    </div>
  )

  const renderDiceGame = () => (
    <div className="flex flex-col items-center gap-4 rounded border border-[#8b6f47] bg-black/60 p-4">
      <div className="mb-2 flex w-full items-center justify-between text-xs text-[#8b7355]">
        <span>
          Tvé zlato: <span className="text-[#ffd700]">{gold}g</span>
        </span>
      </div>

      <div className="flex w-full items-center justify-center gap-8 rounded border border-[#8b6f47]/30 bg-black/40 p-4">
        <div className="flex flex-col items-center gap-2">
          <span className="text-xs font-bold tracking-wider text-[#ffd700] uppercase">Ty</span>
          <div className="flex gap-2">
            <Die val={diceResult?.player[0] || 1} rolling={gameState === 'rolling'} />
            <Die val={diceResult?.player[1] || 1} rolling={gameState === 'rolling'} />
          </div>
          <span className="font-mono text-sm text-[#d4a574]">
            {gameState === 'result' && diceResult?.player
              ? diceResult.player[0]! + diceResult.player[1]!
              : '-'}
          </span>
        </div>

        <div className="text-xl font-bold text-[#8b7355]">VS</div>

        <div className="flex flex-col items-center gap-2">
          <span className="text-xs font-bold tracking-wider text-[#ff6b6b] uppercase">
            Hostinský
          </span>
          <div className="flex gap-2">
            <Die val={diceResult?.house[0] || 1} rolling={gameState === 'rolling'} />
            <Die val={diceResult?.house[1] || 1} rolling={gameState === 'rolling'} />
          </div>
          <span className="font-mono text-sm text-[#d4a574]">
            {gameState === 'result' && diceResult?.house
              ? diceResult.house[0]! + diceResult.house[1]!
              : '-'}
          </span>
        </div>
      </div>

      <div className="w-full space-y-2">
        <div className="flex justify-between text-xs">
          <span className="text-[#8b7355]">Sázka:</span>
          <span className="text-[#ffd700]">{betAmount}g</span>
        </div>
        <input
          type="range"
          min="10"
          max={Math.min(gold, 500)}
          step="10"
          value={betAmount}
          onChange={(e) => setBetAmount(Number(e.target.value))}
          disabled={gameState === 'rolling'}
          className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-[#8b6f47]/30 accent-[#ffd700]"
        />
        <div className="flex justify-between text-[10px] text-[#8b7355]">
          <span>10g</span>
          <span>{Math.min(gold, 500)}g</span>
        </div>
      </div>

      <button
        onClick={rollDice}
        disabled={gameState === 'rolling' || gold < betAmount}
        className="w-full rounded border border-[#ffe4b5] bg-linear-to-r from-[#ffd700] to-[#b8860b] py-3 font-bold tracking-wider text-black uppercase transition-transform hover:scale-[1.02] disabled:opacity-50 disabled:grayscale"
      >
        {gameState === 'rolling' ? 'Kostky se kutálí...' : 'Hodit kostkami'}
      </button>
    </div>
  )

  return (
    <>
      {activeTab === 'gamble' ? (
        <GamePanel title="KOSTKY">
          <button
            onClick={() => setActiveTab('menu')}
            className="mb-4 flex items-center gap-2 text-sm text-[#8b7355] transition-colors hover:text-[#d4a574]"
          >
            <ChevronRight className="h-4 w-4 rotate-180" />
            Zpět k baru
          </button>
          {renderDiceGame()}
        </GamePanel>
      ) : (
        <ActionsLayout
          title="Taverna"
          onBack={onBack}
          showDirections={false}
          onToggleDirections={() => {}}
          exploration={
            <div className="space-y-4">
              <div className="flex items-center gap-2 rounded border border-[#ffd700]/30 bg-[#ffd700]/10 p-3 text-[#ffd700]">
                <span className="text-xs tracking-wider text-[#8b7355] uppercase">Tvé zlato:</span>
                <span className="font-bold">{gold}g</span>
              </div>
              <div className="rounded border border-[#8b6f47] bg-black/60 p-3 text-xs text-[#8b7355]">
                Hlasitý smích a cinkání hrnčků naplněuje tavernu &quot;U Zlomeného meče&quot;. Je to
                jediné místo, kde se v tomhle městě dá opravdu odpočinout a načerpat novou energii
                na další výpravy.
              </div>
            </div>
          }
        >
          <div className="space-y-1.5 pt-2">
            <ActionBtn onClick={() => {}} icon={Beer}>
              Koupit <span className="text-[#ffd700]">pivo</span> (5g)
            </ActionBtn>
            <ActionBtn onClick={onRest} icon={BedDouble}>
              <span className="text-[#ffd700]">Odpočinout si</span> (10g)
            </ActionBtn>
            <ActionBtn onClick={handleRumors} icon={ScrollText}>
              Koupit rundu a <span className="text-[#ffd700]">zvědět drby</span> (5g)
            </ActionBtn>
            <ActionBtn onClick={() => setActiveTab('gamble')} icon={Dices}>
              Hrát <span className="text-[#ffd700]">kostky</span>
            </ActionBtn>
          </div>
        </ActionsLayout>
      )}
    </>
  )
}
