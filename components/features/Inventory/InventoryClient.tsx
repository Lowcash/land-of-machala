'use client'

import { ScrollIndicator } from '@/components/ui/ScrollIndicator'
import { equipItemAction, unequipItemAction, useItemAction } from '@/lib/actions/inventory'
import { ArrowLeft, Backpack, Check, Heart, Shield, Sparkles, Sword, Zap } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useRef, useState, useTransition } from 'react'
import { toast } from 'sonner'
import type { InventoryItemUI, ItemRarity } from './types'

const ICON_MAP: Record<string, any> = {
  sword: Sword,
  shield: Shield,
  heart: Heart,
  zap: Zap,
  sparkles: Sparkles,
  backpack: Backpack,
}

function getIconFromName(iconName: string) {
  return ICON_MAP[(iconName || '').toLowerCase()] || Sparkles
}

type InventoryClientProps = {
  initialInventory: InventoryItemUI[]
}

export function InventoryClient({ initialInventory }: InventoryClientProps) {
  const [inventory, setInventory] = useState(initialInventory)
  const [selectedItem, setSelectedItem] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()
  const scrollRef = useRef<HTMLDivElement>(null)
  const detailScrollRef = useRef<HTMLDivElement>(null)

  // Handle browser back button
  useEffect(() => {
    const handlePopState = () => {
      const params = new URLSearchParams(window.location.search)
      const itemId = params.get('itemId')
      if (itemId && inventory.find((i) => i.id === itemId)) {
        setSelectedItem(itemId)
      } else {
        setSelectedItem(null)
      }
    }

    handlePopState()
    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [inventory])

  const handleSelectItem = (id: string | null) => {
    if (id) {
      setSelectedItem(id)
      window.history.pushState({ itemId: id }, '', `?itemId=${id}`)
    } else {
      setSelectedItem(null)
      const url = new URL(window.location.href)
      url.searchParams.delete('itemId')
      window.history.pushState({}, '', url.toString())
    }
  }

  const handleBack = () => {
    window.history.back()
  }

  const handleEquip = async (id: string) => {
    startTransition(async () => {
      const [result, err] = await equipItemAction({ inventoryItemId: id })
      if (err) {
        toast.error('Chyba při nasazování předmětu')
        return
      }
      if (result?.success) {
        const itemToEquip = inventory.find((item) => item.id === id)
        setInventory((prev) =>
          prev.map((item) => {
            if (item.id === id) return { ...item, equipped: true }
            // Unequip other items of same type if needed
            if (itemToEquip && item.type === itemToEquip.type && item.id !== id) {
              return { ...item, equipped: false }
            }
            return item
          })
        )
        toast.success('Předmět nasazen')
      }
    })
  }

  const handleUnequip = async (id: string) => {
    startTransition(async () => {
      const [success, err] = await unequipItemAction({ inventoryItemId: id })
      if (err) {
        toast.error('Chyba při sundávání předmětu')
        return
      }
      if (success) {
        setInventory((prev) =>
          prev.map((item) => (item.id === id ? { ...item, equipped: false } : item))
        )
        toast.success('Předmět sundán')
      }
    })
  }

  const handleUse = async (id: string) => {
    startTransition(async () => {
      const [result, err] = await useItemAction({ inventoryItemId: id })
      if (err) {
        toast.error('Chyba při použití předmětu')
        return
      }
      if (result) {
        setInventory((prev) => {
          const item = prev.find((i) => i.id === id)
          if (item && item.quantity > 1) {
            return prev.map((i) => (i.id === id ? { ...i, quantity: i.quantity - 1 } : i))
          }
          return prev.filter((i) => i.id !== id)
        })
        toast.success('Předmět použit')
      }
    })
  }

  const getRarityColor = (rarity: ItemRarity) => {
    switch (rarity) {
      case 'common':
        return 'text-[#8b7355]'
      case 'uncommon':
        return 'text-[#6fbf6f]'
      case 'rare':
        return 'text-[#69ccf0]'
      case 'epic':
        return 'text-[#b66bd4]'
      case 'legendary':
        return 'text-[#ffd700]'
      default:
        return 'text-[#8b7355]'
    }
  }

  const getRarityBorder = (rarity: ItemRarity) => {
    switch (rarity) {
      case 'common':
        return 'border-[#8b7355]'
      case 'uncommon':
        return 'border-[#6fbf6f]'
      case 'rare':
        return 'border-[#69ccf0]'
      case 'epic':
        return 'border-[#b66bd4]'
      case 'legendary':
        return 'border-[#ffd700]'
      default:
        return 'border-[#8b7355]'
    }
  }

  const selectedItemData = inventory.find((i) => i.id === selectedItem)
  const filteredInventory = inventory

  return (
    <>
      <div className="flex w-full flex-1 overflow-hidden">
        {/* Main Inventory Grid */}
        <div
          className={`${
            selectedItem ? 'hidden md:flex' : 'flex'
          } flex-1 flex-col bg-black/70 backdrop-blur-sm`}
        >
          {/* Back to game link */}
          {/* Sticky Back Navigation */}
          <div className="sticky top-0 z-30 shrink-0 border-b border-[#8b6f47] bg-black/95 px-4 py-3 backdrop-blur-sm">
            <Link
              href="/game"
              className="inline-flex items-center gap-2 text-sm text-[#d4a574] transition-colors hover:text-[#ffd700]"
            >
              <ArrowLeft className="h-4 w-4" />
              Zpět do hry
            </Link>
          </div>

          {/* Toolbar - removed, gold now in header */}

          {/* Inventory Grid/List */}
          <div className="relative flex flex-1 flex-col overflow-hidden">
            <ScrollIndicator targetRef={scrollRef} position="both" />
            <div ref={scrollRef} className="scrollbar-custom flex-1 overflow-y-auto p-4">
              <div className="grid grid-cols-5 gap-2 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 xl:grid-cols-12">
                {filteredInventory.map((item) => {
                  const Icon = getIconFromName(item.iconName)
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleSelectItem(item.id)}
                      className={`group relative aspect-square rounded-lg border-2 p-2 transition-all ${
                        selectedItem === item.id
                          ? 'scale-105 border-[#ffd700] bg-black/60 shadow-[0_0_10px_rgba(255,215,0,0.3)]'
                          : `bg-black/40 hover:bg-black/60 ${getRarityBorder(item.rarity)}`
                      }`}
                    >
                      <div className="flex h-full w-full items-center justify-center">
                        <Icon className={`h-8 w-8 ${getRarityColor(item.rarity)}`} />
                      </div>

                      {item.quantity > 1 && (
                        <div className="absolute right-1 bottom-1 rounded border border-[#8b6f47] bg-black/80 px-1.5 py-0.5 text-[10px] font-bold text-white">
                          {item.quantity}
                        </div>
                      )}

                      {item.equipped && (
                        <div className="absolute top-1 right-1 rounded-full bg-[#ffd700] p-0.5 text-black shadow-sm">
                          <Check className="h-3 w-3" />
                        </div>
                      )}
                    </button>
                  )
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Desktop Detail Panel - Right Side */}
        <div className="hidden w-80 border-l border-[#8b6f47] bg-black/70 backdrop-blur-sm md:flex">
          {selectedItem && selectedItemData ? (
            <div className="relative flex-1 overflow-hidden">
              <ScrollIndicator targetRef={detailScrollRef} position="both" />
              <div ref={detailScrollRef} className="scrollbar-custom h-full overflow-y-auto p-6">
                <div className="mx-auto max-w-md space-y-6">
                  <div className="mx-auto max-w-md space-y-6">
                    {/* Header */}
                    <div className="text-center">
                      <div
                        className={`mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-full border-2 bg-black/40 ${getRarityBorder(
                          selectedItemData.rarity
                        )} shadow-[0_0_20px_rgba(0,0,0,0.5)]`}
                      >
                        {(() => {
                          const Icon = getIconFromName(selectedItemData.iconName)
                          return (
                            <Icon
                              className={`h-12 w-12 ${getRarityColor(selectedItemData.rarity)}`}
                            />
                          )
                        })()}
                      </div>
                      <h2
                        className={`text-2xl font-bold ${getRarityColor(selectedItemData.rarity)}`}
                        style={{ fontFamily: 'var(--font-medieval)' }}
                      >
                        {selectedItemData.name}
                      </h2>
                      <p className="text-[#8b7355]">{selectedItemData.type}</p>
                    </div>

                    {/* Stats */}
                    <div className="space-y-2 rounded border border-[#8b6f47] bg-black/40 p-4">
                      <div className="grid gap-2">
                        {selectedItemData.attack != null && selectedItemData.attack > 0 && (
                          <div className="flex justify-between text-sm">
                            <span className="text-[#8b7355]">Útok:</span>
                            <span className="text-[#d4a574]">+{selectedItemData.attack}</span>
                          </div>
                        )}
                        {selectedItemData.defense != null && selectedItemData.defense > 0 && (
                          <div className="flex justify-between text-sm">
                            <span className="text-[#8b7355]">Obrana:</span>
                            <span className="text-[#d4a574]">+{selectedItemData.defense}</span>
                          </div>
                        )}
                        {selectedItemData.magic != null && selectedItemData.magic > 0 && (
                          <div className="flex justify-between text-sm">
                            <span className="text-[#8b7355]">Magie:</span>
                            <span className="text-[#d4a574]">+{selectedItemData.magic}</span>
                          </div>
                        )}
                        {selectedItemData.speed != null && selectedItemData.speed > 0 && (
                          <div className="flex justify-between text-sm">
                            <span className="text-[#8b7355]">Rychlost:</span>
                            <span className="text-[#d4a574]">+{selectedItemData.speed}</span>
                          </div>
                        )}
                        {selectedItemData.healing != null && selectedItemData.healing > 0 && (
                          <div className="flex justify-between text-sm">
                            <span className="text-[#8b7355]">Léčení:</span>
                            <span className="text-[#d4a574]">+{selectedItemData.healing}</span>
                          </div>
                        )}
                        {selectedItemData.mana != null && selectedItemData.mana > 0 && (
                          <div className="flex justify-between text-sm">
                            <span className="text-[#8b7355]">Mana:</span>
                            <span className="text-[#d4a574]">+{selectedItemData.mana}</span>
                          </div>
                        )}
                      </div>
                      <div className="border-t border-[#8b6f47]/50 pt-2">
                        <p className="text-sm text-[#8b7355] italic">
                          "{selectedItemData.description}"
                        </p>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="grid gap-3">
                      {selectedItemData.type === 'consumable' ? (
                        <button
                          onClick={() => handleUse(selectedItemData.id)}
                          disabled={isPending}
                          className="w-full rounded border border-[#6fbf6f] bg-[#6fbf6f]/10 px-4 py-2 text-[#6fbf6f] transition-colors hover:bg-[#6fbf6f]/20 disabled:opacity-50"
                        >
                          Použít
                        </button>
                      ) : (
                        <button
                          onClick={() =>
                            selectedItemData.equipped
                              ? handleUnequip(selectedItemData.id)
                              : handleEquip(selectedItemData.id)
                          }
                          disabled={isPending}
                          className={`w-full rounded border px-4 py-2 transition-colors disabled:opacity-50 ${
                            selectedItemData.equipped
                              ? 'border-[#ff6b6b] bg-[#ff6b6b]/10 text-[#ff6b6b] hover:bg-[#ff6b6b]/20'
                              : 'border-[#ffd700] bg-[#ffd700]/10 text-[#ffd700] hover:bg-[#ffd700]/20'
                          }`}
                        >
                          {selectedItemData.equipped ? 'Sundat' : 'Nasadit'}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <div className="px-4 text-center">
                <Backpack className="mx-auto mb-4 h-16 w-16 text-[#8b6f47]" />
                <h3
                  className="mb-2 text-lg text-[#d4a574]"
                  style={{ fontFamily: 'var(--font-fantasy)' }}
                >
                  Vyber předmět
                </h3>
                <p className="text-sm leading-relaxed text-[#8b7355]">
                  Klikni na předmět v inventáři pro zobrazení detailů a akcí.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Fullscreen Overlay */}
      {selectedItem && selectedItemData && (
        <div className="fixed inset-0 z-50 flex flex-col bg-black/95 backdrop-blur-md md:hidden">
          <div className="flex shrink-0 items-center justify-between border-b border-[#8b6f47] bg-black/80 px-3 py-2 backdrop-blur-md">
            <h2 className="text-lg text-[#ffd700]" style={{ fontFamily: 'var(--font-medieval)' }}>
              Detail předmětu
            </h2>
            <button
              onClick={handleBack}
              className="flex items-center gap-2 rounded border border-[#8b6f47] bg-black/60 px-3 py-1.5 transition-colors hover:border-[#ffd700]"
            >
              <ArrowLeft className="h-4 w-4 text-[#d4a574]" />
              <span className="text-sm text-[#d4a574]">Zpět do inventáře</span>
            </button>
          </div>

          <div className="scrollbar-custom flex-1 overflow-y-auto p-4">
            <div className="mx-auto max-w-sm space-y-6">
              {/* Header */}
              <div className="text-center">
                <div
                  className={`mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-full border-2 bg-black/40 ${getRarityBorder(
                    selectedItemData.rarity
                  )} shadow-[0_0_20px_rgba(0,0,0,0.5)]`}
                >
                  {(() => {
                    const Icon = getIconFromName(selectedItemData.iconName)
                    return (
                      <Icon className={`h-12 w-12 ${getRarityColor(selectedItemData.rarity)}`} />
                    )
                  })()}
                </div>
                <h2
                  className={`text-2xl font-bold ${getRarityColor(selectedItemData.rarity)}`}
                  style={{ fontFamily: 'var(--font-medieval)' }}
                >
                  {selectedItemData.name}
                </h2>
                <p className="text-[#8b7355]">{selectedItemData.type}</p>
              </div>

              {/* Stats */}
              <div className="space-y-2 rounded border border-[#8b6f47] bg-black/40 p-4">
                <div className="grid gap-2">
                  {selectedItemData.attack != null && selectedItemData.attack > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-[#8b7355]">Útok:</span>
                      <span className="text-[#d4a574]">+{selectedItemData.attack}</span>
                    </div>
                  )}
                  {selectedItemData.defense != null && selectedItemData.defense > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-[#8b7355]">Obrana:</span>
                      <span className="text-[#d4a574]">+{selectedItemData.defense}</span>
                    </div>
                  )}
                  {selectedItemData.magic != null && selectedItemData.magic > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-[#8b7355]">Magie:</span>
                      <span className="text-[#d4a574]">+{selectedItemData.magic}</span>
                    </div>
                  )}
                  {selectedItemData.speed != null && selectedItemData.speed > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-[#8b7355]">Rychlost:</span>
                      <span className="text-[#d4a574]">+{selectedItemData.speed}</span>
                    </div>
                  )}
                  {selectedItemData.healing != null && selectedItemData.healing > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-[#8b7355]">Léčení:</span>
                      <span className="text-[#d4a574]">+{selectedItemData.healing}</span>
                    </div>
                  )}
                  {selectedItemData.mana != null && selectedItemData.mana > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-[#8b7355]">Mana:</span>
                      <span className="text-[#d4a574]">+{selectedItemData.mana}</span>
                    </div>
                  )}
                </div>
                <div className="border-t border-[#8b6f47]/50 pt-2">
                  <p className="text-sm text-[#8b7355] italic">"{selectedItemData.description}"</p>
                </div>
              </div>

              {/* Actions */}
              <div className="grid gap-3">
                {selectedItemData.type === 'consumable' ? (
                  <button
                    onClick={() => handleUse(selectedItemData.id)}
                    disabled={isPending}
                    className="w-full rounded border border-[#6fbf6f] bg-[#6fbf6f]/10 px-4 py-2 text-[#6fbf6f] transition-colors hover:bg-[#6fbf6f]/20 disabled:opacity-50"
                  >
                    Použít
                  </button>
                ) : (
                  <button
                    onClick={() =>
                      selectedItemData.equipped
                        ? handleUnequip(selectedItemData.id)
                        : handleEquip(selectedItemData.id)
                    }
                    disabled={isPending}
                    className={`w-full rounded border px-4 py-2 transition-colors disabled:opacity-50 ${
                      selectedItemData.equipped
                        ? 'border-[#ff6b6b] bg-[#ff6b6b]/10 text-[#ff6b6b] hover:bg-[#ff6b6b]/20'
                        : 'border-[#ffd700] bg-[#ffd700]/10 text-[#ffd700] hover:bg-[#ffd700]/20'
                    }`}
                  >
                    {selectedItemData.equipped ? 'Sundat' : 'Nasadit'}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
