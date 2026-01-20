'use client'

import { depositGoldAction, withdrawGoldAction } from '@/lib/actions/bank'
import { ArrowLeft, Coins, Vault } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState, useTransition } from 'react'
import { toast } from 'sonner'
import { ActionBtn } from './ActionBtn'
import { GamePanel } from './GameLayout'

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
      } catch (error) {
        toast.error('Došlo k chybě')
      }
    })
  }
  
  const subsections = [
    {
      title: 'STAV ÚČTU',
      content: (
        <div className="flex items-center justify-between rounded-lg border border-[#ffd700]/30 bg-black/40 p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#ffd700]/10">
                <Vault className="h-5 w-5 text-[#ffd700]" />
              </div>
              <div>
                <div className="text-[10px] text-[#8b7355] uppercase tracking-wider">
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
            <div className="text-right">
              <div className="text-[10px] text-[#8b7355] uppercase tracking-wider">U sebe</div>
              <div className="text-sm font-bold text-[#d4a574]">
                {gold} <span className="text-xs">zl</span>
              </div>
            </div>
          </div>
      )
    },
    {
      title: 'TRANSAKCE',
      content: (
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
                className="absolute right-2 top-2 text-[10px] text-[#8b7355] hover:text-[#ffd700]"
              >
                MAX
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <ActionBtn
                onClick={() => handleTransaction('deposit')}
                icon={Coins}
                color="text-[#ffd700]"
                border="hover:border-[#ffd700]"
                disabled={isPending}
              >
                Uložit
              </ActionBtn>
              <ActionBtn
                onClick={() => handleTransaction('withdraw')}
                icon={Coins}
                color="text-[#d4a574]"
                border="hover:border-[#d4a574]"
                disabled={isPending}
              >
                Vybrat
              </ActionBtn>
            </div>
          </div>
      )
    }
  ]

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-sm text-[#8b7355] transition-colors hover:text-[#d4a574]"
        >
          <ArrowLeft className="h-4 w-4" />
          Zpět do města
        </button>
      </div>

      <GamePanel subsections={subsections} />
    </div>
  )
}
