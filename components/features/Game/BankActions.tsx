'use client'

import { ArrowDownToLine, ArrowUpFromLine, Backpack, Coins, Home } from 'lucide-react'
import { useState } from 'react'
import { ActionBtn } from './ActionBtn'
import { GameLayout, GamePanel } from './GameLayout'

interface Item {
  id: string
  name: string
  type: string
  value?: number
  equipped?: boolean
}

interface BankActionsProps {
  onBack: () => void
  gold: number
  setGold: (val: number | ((p: number) => number)) => void
  bankGold: number
  setBankGold: (val: number | ((p: number) => number)) => void
  bankItems: Item[]
  setBankItems: (items: Item[] | ((p: Item[]) => Item[])) => void
  inventory: Item[]
  setInventory: (items: Item[] | ((p: Item[]) => Item[])) => void
}

export function BankActions({
  onBack,
  gold,
  setGold,
  bankGold,
  setBankGold,
  bankItems,
  setBankItems,
  inventory,
  setInventory,
}: BankActionsProps) {
  const [tab, setTab] = useState<'items' | 'gold'>('gold')
  const [amount, setAmount] = useState(0)
  const [message, setMessage] = useState('')

  const showMessage = (msg: string) => {
    setMessage(msg)
    setTimeout(() => setMessage(''), 3000)
  }

  const handleDeposit = () => {
    if (amount > 0 && amount <= gold) {
      setGold((prev: number) => prev - amount)
      setBankGold((prev: number) => prev + amount)
      showMessage(`Vložil jsi ${amount}g do banky!`)
      setAmount(0)
    } else {
      showMessage('Neplatná částka!')
    }
  }

  const handleWithdraw = () => {
    if (amount > 0 && amount <= bankGold) {
      setBankGold((prev: number) => prev - amount)
      setGold((prev: number) => prev + amount)
      showMessage(`Vybral jsi ${amount}g z banky!`)
      setAmount(0)
    } else {
      showMessage('Neplatná částka!')
    }
  }

  const handleDepositItem = (item: Item) => {
    if (item.equipped) {
      showMessage('Nemůžeš uložit vybavený předmět!')
      return
    }
    setInventory((prev: Item[]) => prev.filter((i) => i.id !== item.id))
    setBankItems((prev: Item[]) => [...prev, item])
    showMessage(`Uložil jsi ${item.name} do trezoru.`)
  }

  const handleWithdrawItem = (item: Item) => {
    setBankItems((prev: Item[]) => prev.filter((i) => i.id !== item.id))
    setInventory((prev: Item[]) => [...prev, item])
    showMessage(`Vybral jsi ${item.name} z trezoru.`)
  }

  const handleQuickAmount = (percentage: number) => {
    if (tab === 'gold') {
      setAmount(Math.floor(gold * percentage))
    }
  }

  return (
    <GameLayout>
      <GamePanel title="Banka Machaly">
        <div className="space-y-1.5">
          {/* Header with back button */}
          <div className="mb-2 flex items-center justify-between rounded border border-[#8b6f47]/30 bg-black/40 p-2">
            <ActionBtn onClick={onBack} icon={Home}>
              <span>Vrátit se do města</span>
            </ActionBtn>
            <div className="flex items-center gap-2 px-3 font-mono text-[#ffd700]">
              <Coins className="h-4 w-4" />
              {gold}
            </div>
          </div>

          {/* Tab switcher */}
          <div className="mb-3 flex gap-2 rounded border border-[#8b6f47]/30 bg-black/40 p-1">
            <button
              onClick={() => setTab('gold')}
              className={`flex-1 rounded px-3 py-2 text-xs font-semibold transition-colors ${
                tab === 'gold'
                  ? 'bg-[#8b6f47] text-[#f5e6d3]'
                  : 'text-[#8b7355] hover:text-[#f5e6d3]'
              }`}
            >
              <Coins className="mx-auto mb-1 h-4 w-4" />
              Zlato
            </button>
            <button
              onClick={() => setTab('items')}
              className={`flex-1 rounded px-3 py-2 text-xs font-semibold transition-colors ${
                tab === 'items'
                  ? 'bg-[#8b6f47] text-[#f5e6d3]'
                  : 'text-[#8b7355] hover:text-[#f5e6d3]'
              }`}
            >
              <Backpack className="mx-auto mb-1 h-4 w-4" />
              Trezor
            </button>
          </div>

          {/* Message */}
          {message && (
            <div className="mb-3 rounded border border-[#6fbf6f] bg-[#6fbf6f]/20 p-2 text-xs text-[#6fbf6f]">
              {message}
            </div>
          )}

          {/* Gold Tab */}
          {tab === 'gold' && (
            <div className="space-y-3">
              {/* Balance Display */}
              <div className="rounded border border-[#8b6f47] bg-black/60 p-3">
                <div className="mb-3 space-y-1 text-xs">
                  <div className="flex justify-between">
                    <span className="text-[#8b7355]">V kapse:</span>
                    <span className="text-[#ffd700]">{gold}g</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#8b7355]">V bance:</span>
                    <span className="text-[#6fbf6f]">{bankGold}g</span>
                  </div>
                  <div className="mt-2 flex justify-between border-t border-[#8b6f47]/30 pt-2 font-bold">
                    <span className="text-[#d4a574]">Celkem:</span>
                    <span className="text-[#ffd700]">{gold + bankGold}g</span>
                  </div>
                </div>

                {/* Amount input */}
                <div className="mb-2">
                  <label className="mb-1 block text-xs text-[#8b7355]">Částka:</label>
                  <input
                    type="number"
                    value={amount || ''}
                    onChange={(e) => setAmount(Math.max(0, parseInt(e.target.value) || 0))}
                    placeholder="0"
                    className="w-full rounded border border-[#8b6f47] bg-black/60 px-3 py-2 text-sm text-[#f5e6d3] focus:border-[#ffd700] focus:outline-none"
                  />
                </div>

                {/* Quick amount buttons */}
                <div className="mb-3 flex gap-1">
                  {[0.25, 0.5, 0.75, 1].map((pct) => (
                    <button
                      key={pct}
                      onClick={() => handleQuickAmount(pct)}
                      className="flex-1 rounded border border-[#8b6f47]/50 bg-black/40 py-1 text-[10px] text-[#8b7355] transition-colors hover:border-[#ffd700] hover:text-[#ffd700]"
                    >
                      {pct === 1 ? 'Max' : `${pct * 100}%`}
                    </button>
                  ))}
                </div>

                {/* Action buttons */}
                <div className="flex gap-2">
                  <button
                    onClick={handleDeposit}
                    disabled={amount <= 0 || amount > gold}
                    className="flex flex-1 items-center justify-center gap-2 rounded border border-[#ffd700] bg-[#8b6f47] py-2 text-xs text-white transition-colors hover:bg-[#ffd700] hover:text-black disabled:cursor-not-allowed disabled:border-[#8b6f47]/30 disabled:bg-black/60 disabled:text-[#8b7355]"
                  >
                    <ArrowDownToLine className="h-3 w-3" />
                    Vložit
                  </button>
                  <button
                    onClick={handleWithdraw}
                    disabled={amount <= 0 || amount > bankGold}
                    className="flex flex-1 items-center justify-center gap-2 rounded border border-[#69ccf0] bg-[#2a4a5a] py-2 text-xs text-white transition-colors hover:bg-[#69ccf0] hover:text-black disabled:cursor-not-allowed disabled:border-[#8b6f47]/30 disabled:bg-black/60 disabled:text-[#8b7355]"
                  >
                    <ArrowUpFromLine className="h-3 w-3" />
                    Vybrat
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Items Tab */}
          {tab === 'items' && (
            <div className="space-y-3">
              {/* Bank Items */}
              <div>
                <div className="mb-1 text-xs text-[#d4a574]">Uložené v bance:</div>
                <div className="scrollbar-custom max-h-37.5 overflow-y-auto rounded border border-[#8b6f47] bg-black/60 p-2">
                  {bankItems.length === 0 ? (
                    <div className="p-2 text-xs text-[#8b7355] italic">Prázdný trezor</div>
                  ) : (
                    bankItems.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center justify-between border-b border-[#8b6f47]/20 px-1 py-1.5 text-xs last:border-0 hover:bg-white/5"
                      >
                        <span className="text-[#f5e6d3]">{item.name}</span>
                        <button
                          onClick={() => handleWithdrawItem(item)}
                          className="rounded bg-[#8b6f47] px-2 py-0.5 text-[10px] text-white transition-colors hover:bg-[#a8865d]"
                        >
                          Vybrat
                        </button>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Inventory Items */}
              <div>
                <div className="mb-1 text-xs text-[#d4a574]">V batohu (k uložení):</div>
                <div className="scrollbar-custom max-h-37.5 overflow-y-auto rounded border border-[#8b6f47] bg-black/60 p-2">
                  {inventory.filter((i) => !i.equipped).length === 0 ? (
                    <div className="p-2 text-xs text-[#8b7355] italic">
                      Žádné předměty k uložení
                    </div>
                  ) : (
                    inventory
                      .filter((i) => !i.equipped)
                      .map((item) => (
                        <div
                          key={item.id}
                          className="flex items-center justify-between border-b border-[#8b6f47]/20 px-1 py-1.5 text-xs last:border-0 hover:bg-white/5"
                        >
                          <span className="text-[#f5e6d3]">{item.name}</span>
                          <button
                            onClick={() => handleDepositItem(item)}
                            className="rounded border border-[#8b6f47] bg-[#2a2a2a] px-2 py-0.5 text-[10px] text-[#d4a574] transition-colors hover:border-[#ffd700]"
                          >
                            Uložit
                          </button>
                        </div>
                      ))
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </GamePanel>

      <GamePanel title="Bankéř">
        <div className="flex gap-3 rounded border border-[#8b6f47] bg-black/60 p-3 text-xs leading-relaxed text-[#8b7355]">
          <div className="flex h-10 min-w-10 items-center justify-center rounded-full border border-[#8b6f47] bg-[#8b6f47]/20">
            <Coins className="h-5 w-5 text-[#f5e6d3]" />
          </div>
          <div>
            {tab === 'gold'
              ? '"Tvé peníze jsou u nás v naprostém bezpečí. Můžeš vložit nebo vybrat zlato, jak potřebuješ."'
              : '"Trezor je nejbezpečnější místo pro tvé cennosti. Žádný zloděj se sem nedostane!"'}
          </div>
        </div>
      </GamePanel>
    </GameLayout>
  )
}
