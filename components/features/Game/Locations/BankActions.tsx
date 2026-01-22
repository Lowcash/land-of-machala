'use client'

import { GameButton } from '@/components/ui/game/GameButton'
import { depositGoldAction, withdrawGoldAction } from '@/lib/actions/bank'
import { Coins, Vault } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState, useTransition } from 'react'
import { toast } from 'sonner'
import { ActionsLayout } from '../Layout/ActionsLayout'

interface BankActionsProps {
  balance: number
  gold: number
  characterId: string
  onBack: () => void
}

export function BankActions({ balance, gold, characterId, onBack }: BankActionsProps) {
  const [amount, setAmount] = useState('')
  const [isPending, startTransition] = useTransition()
  const router = useRouter()

  const handleTransaction = async (type: 'deposit' | 'withdraw') => {
    if (!amount) return

    const value = parseInt(amount)
    if (isNaN(value) || value <= 0) {
      toast.error('Zadej platnou částku')
      return
    }

    startTransition(async () => {
      try {
        const action = type === 'deposit' ? depositGoldAction : withdrawGoldAction
        const result = await action(characterId, value)

        if (result.success) {
          toast.success(result.message)
          setAmount('')
          router.refresh()
        } else {
          toast.error(result.message)
        }
      } catch {
        toast.error('Došlo k chybě')
      }
    })
  }

  return (
    <ActionsLayout
      title="Banka"
      onBack={onBack}
      showDirections={false}
      onToggleDirections={() => {}}
      exploration={
        <div className="rounded border border-[#ffd700]/30 bg-black/40 p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#ffd700]/10">
              <Vault className="h-5 w-5 text-[#ffd700]" />
            </div>
            <div>
              <div className="text-[10px] tracking-wider text-[#8b7355] uppercase">
                Uloženo v bance
              </div>
              <div
                className="text-xl font-bold text-[#ffd700]"
                style={{ fontFamily: 'var(--font-fantasy)' }}
              >
                {balance} <span className="text-xs text-[#d4a574]">zl</span>
              </div>
            </div>
          </div>
        </div>
      }
    >
      <div className="space-y-3">
        <div className="relative">
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Zadej částku..."
            className="w-full rounded border border-[#8b6f47] bg-black/60 p-2 text-[#d4a574] placeholder-[#8b7355] focus:border-[#ffd700] focus:outline-none"
            style={{ fontFamily: 'var(--font-fantasy)' }}
          />
          <button
            onClick={() => setAmount(gold.toString())}
            className="absolute top-2 right-2 text-[10px] text-[#8b7355] hover:text-[#ffd700]"
          >
            MAX
          </button>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <GameButton
            onClick={() => handleTransaction('deposit')}
            icon={Coins}
            variant="primary"
            disabled={isPending}
            className="w-full text-[#ffd700] hover:border-[#ffd700]"
          >
            Uložit
          </GameButton>
          <GameButton
            onClick={() => handleTransaction('withdraw')}
            icon={Coins}
            variant="primary"
            disabled={isPending}
            className="w-full text-[#d4a574] hover:border-[#d4a574]"
          >
            Vybrat
          </GameButton>
        </div>
      </div>
    </ActionsLayout>
  )
}
