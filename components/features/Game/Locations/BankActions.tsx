'use client'

import { useState, useTransition } from 'react'

import { useRouter } from 'next/navigation'

import { ArrowRight, Coins, Landmark } from 'lucide-react'
import { toast } from 'sonner'

import { depositGoldAction, withdrawGoldAction } from '@/lib/actions/bank'

import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

import { LocationAction } from '../Shared/components/LocationAction'
import { LocationLayout } from '../Shared/components/LocationLayout'

interface BankActionsProps {
  gold: number
  balance: number
}

export function BankActions({ gold, balance }: BankActionsProps) {
  const [depositAmount, setDepositAmount] = useState('')
  const [withdrawAmount, setWithdrawAmount] = useState('')
  const [isPending, startTransition] = useTransition()
  const router = useRouter()

  const handleDeposit = () => {
    const amount = Number(depositAmount)
    if (amount <= 0 || amount > gold) return

    startTransition(async () => {
      const [data, err] = await depositGoldAction({ amount })
      if (!err && data?.success) {
        toast.success(data.message)
        setDepositAmount('')
        router.refresh()
      } else {
        toast.error(err?.message || data?.message || 'Vklad selhal')
      }
    })
  }

  const handleWithdraw = () => {
    const amount = Number(withdrawAmount)
    if (amount <= 0 || amount > balance) return

    startTransition(async () => {
      const [data, err] = await withdrawGoldAction({ amount })
      if (!err && data?.success) {
        toast.success(data.message)
        setWithdrawAmount('')
        router.refresh()
      } else {
        toast.error(err?.message || data?.message || 'Výběr selhal')
      }
    })
  }

  return (
    <LocationLayout
      title="Strážnice pokladů"
      description="Tvé zlato je u nás v bezpečí, poutníku. Žádné poplatky, čistá důvěra."
    >
      <div className="space-y-4 px-1">
        <Card variant="game" className="bg-black/40 p-3">
          <div className="text-game-gold text-[10px] font-bold tracking-wider uppercase opacity-70">
            Zůstatek v bance
          </div>
          <div className="flex items-center gap-2">
            <Landmark className="h-4 w-4 text-[#ffd700]" />
            <span className="text-xl font-bold text-[#f5e6d3]">{balance}g</span>
          </div>
        </Card>

        <div className="space-y-3">
          <div className="space-y-2">
            <Label className="text-game-copper-muted text-[10px] font-bold tracking-tight uppercase">
              Uložit zlato
            </Label>
            <div className="flex gap-2">
              <Input
                type="number"
                value={depositAmount}
                onChange={(e) => setDepositAmount(e.target.value)}
                placeholder="Množství..."
                className="h-10 bg-black/40"
              />
              <LocationAction
                title="Vložit"
                icon={ArrowRight}
                onClick={handleDeposit}
                disabled={!depositAmount || Number(depositAmount) <= 0 || isPending}
                loading={isPending}
                className="p-1"
              />
            </div>
            <div className="text-right text-[10px] text-[#8b7355]">
              V měšci: <span className="text-[#ffd700]">{gold}g</span>
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-game-copper-muted text-[10px] font-bold tracking-tight uppercase">
              Vybrat zlato
            </Label>
            <div className="flex gap-2">
              <Input
                type="number"
                value={withdrawAmount}
                onChange={(e) => setWithdrawAmount(e.target.value)}
                placeholder="Množství..."
                className="h-10 bg-black/40"
              />
              <LocationAction
                title="Vybrat"
                icon={Coins}
                onClick={handleWithdraw}
                disabled={!withdrawAmount || Number(withdrawAmount) <= 0 || isPending}
                loading={isPending}
                className="p-1"
              />
            </div>
          </div>
        </div>
      </div>
    </LocationLayout>
  )
}
