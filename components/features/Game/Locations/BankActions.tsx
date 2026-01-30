'use client'

import { useState } from 'react'

import { Landmark, type LucideIcon } from 'lucide-react'

import { BANK_CONFIG } from '@/lib/game/constants/interactive'
import { useBankActions } from '@/lib/hooks/game'

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
  // 1. Hooks
  const [depositAmount, setDepositAmount] = useState('')
  const [withdrawAmount, setWithdrawAmount] = useState('')

  const { handleDeposit, handleWithdraw, isPending } = useBankActions({
    onSuccess: () => {
      setDepositAmount('')
      setWithdrawAmount('')
    },
  })

  // 2. Navigation State - None currently

  // 3. Handlers
  const onDeposit = () => handleDeposit(Number(depositAmount))
  const onWithdraw = () => handleWithdraw(Number(withdrawAmount))

  // 4. Sub-components (Render helpers)
  const BankOperationRow = ({
    title,
    amount,
    setAmount,
    maxAmount,
    onAction,
    actionConfig,
  }: {
    title: string
    amount: string
    setAmount: (val: string) => void
    maxAmount: number
    onAction: () => void
    actionConfig: { title: string; icon: LucideIcon }
  }) => (
    <div className="space-y-2">
      <Label className="text-game-copper-muted text-[10px] font-bold tracking-tight uppercase">
        {title}
      </Label>
      <div className="flex gap-2">
        <Input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Množství..."
          className="h-10 bg-black/40"
        />
        <LocationAction
          title={actionConfig.title}
          icon={actionConfig.icon}
          onClick={onAction}
          disabled={!amount || Number(amount) <= 0 || Number(amount) > maxAmount || isPending}
          loading={isPending}
          className="p-1"
        />
      </div>
    </div>
  )

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
          <BankOperationRow
            title={BANK_CONFIG.depositTitle}
            amount={depositAmount}
            setAmount={setDepositAmount}
            maxAmount={gold}
            onAction={onDeposit}
            actionConfig={BANK_CONFIG.depositAction}
          />

          <div className="-mt-2 text-right text-[10px] text-[#8b7355]">
            V měšci: <span className="text-[#ffd700]">{gold}g</span>
          </div>

          <BankOperationRow
            title={BANK_CONFIG.withdrawTitle}
            amount={withdrawAmount}
            setAmount={setWithdrawAmount}
            maxAmount={balance}
            onAction={onWithdraw}
            actionConfig={BANK_CONFIG.withdrawAction}
          />
        </div>
      </div>
    </LocationLayout>
  )
}
