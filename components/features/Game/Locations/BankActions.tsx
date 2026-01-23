'use client'

import { GameActionsPanel } from '@/components/features/Game/Layout/GameActionsPanel'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { ArrowRight, Coins, Landmark } from 'lucide-react'
import { useState } from 'react'

interface BankActionsProps {
  onBack: () => void
  characterId: string
}

export function BankActions({ onBack, characterId }: BankActionsProps) {
  const [depositAmount, setDepositAmount] = useState('')
  const [withdrawAmount, setWithdrawAmount] = useState('')
  const [bankBalance, setBalance] = useState(1000) // Mock
  const [gold, setGold] = useState(500) // Mock

  const handleDeposit = () => {
    const amount = Number(depositAmount)
    if (amount > 0 && amount <= gold) {
      setGold((g) => g - amount)
      setBalance((b) => b + amount)
      setDepositAmount('')
    }
  }

  const handleWithdraw = () => {
    const amount = Number(withdrawAmount)
    if (amount > 0 && amount <= bankBalance) {
      setBalance((b) => b - amount)
      setGold((g) => g + amount)
      setWithdrawAmount('')
    }
  }

  return (
    <GameActionsPanel
      title="Banka - Trezor"
      onBack={onBack}
      showDirections={false}
      onToggleDirections={() => {}}
      exploration={
        <div className="space-y-4">
          <Card variant="game" className="p-3">
            <div className="text-game-gold text-xs font-bold tracking-wider uppercase">
              V trezoru:
            </div>
            <div className="flex items-center gap-2">
              <Landmark className="h-4 w-4 text-[#ffd700]" />
              <span className="text-xl font-bold text-[#f5e6d3]">{bankBalance}g</span>
            </div>
          </Card>

          <Card
            variant="muted"
            className="border-game-copper/20 bg-black/40 p-3 text-[#8b7355] italic"
          >
            "Tvé zlato je u nás v bezpečí. Úrok 0%, poplatky 10%... dělám si legraci, příteli."
          </Card>
        </div>
      }
    >
      <div className="space-y-4 pt-2">
        <div className="space-y-2">
          <label className="text-game-copper-muted text-xs font-bold uppercase">Uložit zlato</label>
          <div className="flex gap-2">
            <Input
              type="number"
              value={depositAmount}
              onChange={(e) => setDepositAmount(e.target.value)}
              placeholder="Množství..."
              className="h-10"
            />
            <Button
              variant="game-secondary"
              onClick={handleDeposit}
              disabled={!depositAmount || Number(depositAmount) <= 0}
              className="shrink-0"
            >
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
          <div className="text-right text-[10px] text-[#8b7355]">
            U sebe máš: <span className="text-[#ffd700]">{gold}g</span>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-game-copper-muted text-xs font-bold uppercase">Vybrat zlato</label>
          <div className="flex gap-2">
            <Input
              type="number"
              value={withdrawAmount}
              onChange={(e) => setWithdrawAmount(e.target.value)}
              placeholder="Množství..."
              className="h-10"
            />
            <Button
              variant="game-secondary"
              onClick={handleWithdraw}
              disabled={!withdrawAmount || Number(withdrawAmount) <= 0}
              className="shrink-0"
            >
              <Coins className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </GameActionsPanel>
  )
}
