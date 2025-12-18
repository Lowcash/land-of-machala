'use client'

import { Tooltip } from '@/components/ui/CustomTooltip'
import { ScrollIndicator } from '@/components/ui/ScrollIndicator'
import {
  equipItemAction,
  sellItemAction,
  unequipItemAction,
  useItemAction,
} from '@/lib/actions/inventory'
import {
  ArrowLeft,
  Backpack,
  Check,
  Coins,
  Grid3x3,
  Heart,
  List,
  MapPin,
  Search,
  Shield,
  Sparkles,
  Sword,
  Zap,
} from 'lucide-react'
import { useRef, useState, useTransition } from 'react'
import { toast } from 'sonner'
import type { InventoryItemUI, ItemRarity, ItemType } from './types'

const ICON_MAP: Record<string, any> = {
  sword: Sword,
  shield: Shield,
  heart: Heart,
  zap: Zap,
  sparkles: Sparkles,
  backpack: Backpack,
}

function getIconFromName(iconName: string) {
  return ICON_MAP[iconName.toLowerCase()] || Sparkles
}

type InventoryClientProps = {
  initialInventory: InventoryItemUI[]
  gold: number
}

export function InventoryClient({ initialInventory, gold }: InventoryClientProps) {
  const itemsScrollRef = useRef<HTMLDivElement>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedType, setSelectedType] = useState<ItemType | 'all'>('all')
  const [selectedRarity, setSelectedRarity] = useState<ItemRarity | 'all'>('all')
  const [selectedItem, setSelectedItem] = useState<string | null>(null)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [sortBy, setSortBy] = useState<'name' | 'type' | 'rarity' | 'value'>('type')
  const [isPending, startTransition] = useTransition()

  // Mock location for now
  const [location] = useState({ x: 12, y: 8, z: 1 })

  const handleEquip = async (id: string) => {
    startTransition(async () => {
      const [, err] = await equipItemAction({ inventoryItemId: id })
      if (err) {
        toast.error('Chyba při nasazování předmětu')
        return
      }
      toast.success('Předmět nasazen')
    })
  }

  const handleUnequip = async (id: string) => {
    startTransition(async () => {
      const [, err] = await unequipItemAction({ inventoryItemId: id })
      if (err) {
        toast.error('Chyba při sundavání předmětu')
        return
      }
      toast.success('Předmět sundán')
    })
  }

  const handleUse = async (id: string) => {
    startTransition(async () => {
      const [, err] = await useItemAction({ inventoryItemId: id })
      if (err) {
        toast.error('Chyba při použití předmětu')
        return
      }
      toast.success('Předmět použit')
    })
  }

  const handleSell = async (id: string) => {
    startTransition(async () => {
      const [, err] = await sellItemAction({ inventoryItemId: id })
      if (err) {
        toast.error('Chyba při prodeji předmětu')
        return
      }
      toast.success('Předmět prodán')
      setSelectedItem(null) // Deselect if sold (might be gone)
    })
  }

  const getRarityColor = (rarity: ItemRarity) => {
    switch (rarity) {
      case 'common':
        return 'text-[#d4d4d4]'
      case 'uncommon':
        return 'text-[#6fbf6f]'
      case 'rare':
        return 'text-[#69ccf0]'
      case 'epic':
        return 'text-[#b66bd4]'
      case 'legendary':
        return 'text-[#ffd700]'
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
    }
  }

  const getRarityBg = (rarity: ItemRarity) => {
    switch (rarity) {
      case 'common':
        return 'bg-[#8b7355]/10'
      case 'uncommon':
        return 'bg-[#6fbf6f]/10'
      case 'rare':
        return 'bg-[#69ccf0]/10'
      case 'epic':
        return 'bg-[#b66bd4]/10'
      case 'legendary':
        return 'bg-[#ffd700]/10'
    }
  }

  const filteredInventory = initialInventory
    .filter((item) => selectedType === 'all' || item.type === selectedType)
    .filter((item) => selectedRarity === 'all' || item.rarity === selectedRarity)
    .filter((item) => item.name.toLowerCase().includes(searchQuery.toLowerCase()))
    .sort((a, b) => {
      if (sortBy === 'name') return a.name.localeCompare(b.name)
      if (sortBy === 'type') return a.type.localeCompare(b.type)
      if (sortBy === 'rarity') {
        const rarityOrder = { common: 0, uncommon: 1, rare: 2, epic: 3, legendary: 4 }
        return rarityOrder[b.rarity as ItemRarity] - rarityOrder[a.rarity as ItemRarity]
      }
      if (sortBy === 'value') return (b.value || 0) - (a.value || 0)
      return 0
    })

  const selectedItemData = initialInventory.find((i) => i.id === selectedItem)

  return (
    <div className="flex w-full flex-1 overflow-hidden">
      {/* Main Content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Filters */}
        <div className="border-b border-[#8b6f47] bg-black/70 p-3 backdrop-blur-sm">
          <div className="mx-auto max-w-5xl">
            {/* Info Bar (Gold & Location) */}
            <div className="mb-3 flex items-center justify-between rounded border border-[#8b6f47] bg-black/40 px-3 py-2">
              <div className="flex items-center gap-2">
                <div className="flex h-6 w-6 items-center justify-center rounded-full border border-[#ffd700] bg-[#ffd700]/20">
                  <Coins className="h-3.5 w-3.5 text-[#ffd700]" />
                </div>
                <span
                  className="font-bold text-[#ffd700]"
                  style={{ fontFamily: 'var(--font-fantasy)' }}
                >
                  {gold}g
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-[#8b7355]">Lokace:</span>
                <div
                  className="flex items-center gap-1 text-[#d4a574]"
                  style={{ fontFamily: 'var(--font-fantasy)' }}
                >
                  <span>X: {location.x}</span>
                  <span className="text-[#8b6f47]">•</span>
                  <span>Y: {location.y}</span>
                  <span className="text-[#8b6f47]">•</span>
                  <span>Z: {location.z}</span>
                </div>
                <MapPin className="h-4 w-4 text-[#8b6f47]" />
              </div>
            </div>

            {/* Search and view controls */}
            <div className="mb-3 flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-[#8b7355]" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Hledat předměty..."
                  className="w-full rounded border border-[#8b6f47] bg-black/60 py-2 pr-3 pl-10 text-sm text-[#f5e6d3] focus:border-[#ffd700] focus:outline-none"
                />
              </div>
              <button
                onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
                className="rounded border border-[#8b6f47] bg-black/60 px-3 py-2 transition-colors hover:border-[#ffd700]"
              >
                {viewMode === 'grid' ? (
                  <List className="h-4 w-4 text-[#d4a574]" />
                ) : (
                  <Grid3x3 className="h-4 w-4 text-[#d4a574]" />
                )}
              </button>
            </div>

            {/* Type filters */}
            <div className="mb-2 flex flex-wrap gap-2">
              {['all', 'weapon', 'armor', 'consumable', 'material', 'quest'].map((type) => (
                <button
                  key={type}
                  onClick={() => setSelectedType(type as any)}
                  className={`rounded border px-3 py-1 text-xs transition-colors ${
                    selectedType === type
                      ? 'border-[#ffd700] bg-[#8b6f47] text-white'
                      : 'border-[#8b6f47] bg-black/40 text-[#d4a574] hover:border-[#d4a574]'
                  }`}
                >
                  {type === 'all'
                    ? 'Vše'
                    : type === 'weapon'
                      ? 'Zbraně'
                      : type === 'armor'
                        ? 'Zbroj'
                        : type === 'consumable'
                          ? 'Spotřební'
                          : type === 'material'
                            ? 'Materiály'
                            : 'Quest'}
                </button>
              ))}
            </div>

            {/* Rarity and sort */}
            <div className="flex flex-wrap gap-2">
              <select
                value={selectedRarity}
                onChange={(e) => setSelectedRarity(e.target.value as any)}
                className="rounded border border-[#8b6f47] bg-black/60 px-3 py-1 text-xs text-[#d4a574] focus:border-[#ffd700] focus:outline-none"
              >
                <option value="all">Všechny kvality</option>
                <option value="common">Běžné</option>
                <option value="uncommon">Neobvyklé</option>
                <option value="rare">Vzácné</option>
                <option value="epic">Epické</option>
                <option value="legendary">Legendární</option>
              </select>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="rounded border border-[#8b6f47] bg-black/60 px-3 py-1 text-xs text-[#d4a574] focus:border-[#ffd700] focus:outline-none"
              >
                <option value="type">Seřadit podle typu</option>
                <option value="name">Seřadit podle jména</option>
                <option value="rarity">Seřadit podle kvality</option>
                <option value="value">Seřadit podle hodnoty</option>
              </select>
            </div>
          </div>
        </div>

        {/* Items */}
        <div className="relative flex flex-1 flex-col overflow-hidden">
          <ScrollIndicator targetRef={itemsScrollRef} position="bottom" />
          <div className="scrollbar-custom flex-1 overflow-y-auto p-4" ref={itemsScrollRef}>
            <div className="w-full">
              {viewMode === 'grid' ? (
                <div
                  className="grid grid-cols-5 gap-2 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10"
                  style={{ gridAutoRows: '1fr' }}
                >
                  {filteredInventory.map((item) => {
                    const Icon = getIconFromName(item.iconName)
                    const tooltipContent = (
                      <div>
                        <div
                          className={`${getRarityColor(item.rarity)} mb-1`}
                          style={{ fontFamily: 'var(--font-fantasy)' }}
                        >
                          {item.name}
                        </div>
                        {item.description && (
                          <div className="mb-1 text-[#8b7355]">{item.description}</div>
                        )}
                        {item.attack && <div className="text-[#ff6b6b]">Útok: +{item.attack}</div>}
                        {item.defense && (
                          <div className="text-[#69ccf0]">Obrana: +{item.defense}</div>
                        )}
                        {item.value && <div className="text-[#ffd700]">Hodnota: {item.value}g</div>}
                      </div>
                    )
                    return (
                      <Tooltip key={item.id} content={tooltipContent} position="top" delay={300}>
                        <button
                          onClick={() => setSelectedItem(item.id)}
                          className={`relative flex aspect-square w-full flex-col items-center justify-center rounded border-2 p-1.5 transition-all sm:p-2 ${getRarityBorder(
                            item.rarity
                          )} ${getRarityBg(item.rarity)} ${
                            selectedItem === item.id ? 'scale-105 shadow-lg' : 'hover:scale-105'
                          }`}
                        >
                          <Icon
                            className={`h-5 w-5 sm:h-6 sm:w-6 ${getRarityColor(item.rarity)}`}
                          />
                          {item.equipped && (
                            <Check className="absolute top-0.5 right-0.5 h-2.5 w-2.5 text-[#6fbf6f] sm:top-1 sm:right-1 sm:h-3 sm:w-3" />
                          )}
                          {item.quantity > 1 && (
                            <span
                              className="absolute right-0.5 bottom-0.5 rounded bg-black/60 px-0.5 text-[9px] text-[#ffd700] sm:right-1 sm:bottom-1 sm:px-1 sm:text-[10px]"
                              style={{ fontFamily: 'var(--font-fantasy)' }}
                            >
                              {item.quantity}
                            </span>
                          )}
                        </button>
                      </Tooltip>
                    )
                  })}
                </div>
              ) : (
                <div className="space-y-2">
                  {filteredInventory.map((item) => {
                    const Icon = getIconFromName(item.iconName)
                    return (
                      <button
                        key={item.id}
                        onClick={() => setSelectedItem(item.id)}
                        className={`flex w-full items-center gap-3 rounded border p-3 transition-all ${
                          selectedItem === item.id
                            ? `border-2 ${getRarityBorder(item.rarity)} bg-black/60`
                            : 'border-[#8b6f47] bg-black/40 hover:bg-black/60'
                        }`}
                      >
                        <div
                          className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded border-2 ${getRarityBorder(
                            item.rarity
                          )} ${getRarityBg(item.rarity)}`}
                        >
                          <Icon className={`h-6 w-6 ${getRarityColor(item.rarity)}`} />
                        </div>
                        <div className="min-w-0 flex-1 text-left">
                          <h3
                            className={`truncate text-sm ${getRarityColor(item.rarity)}`}
                            style={{ fontFamily: 'var(--font-fantasy)' }}
                          >
                            {item.name} {item.quantity > 1 && `(${item.quantity})`}
                          </h3>
                          <p className="text-xs text-[#8b7355]">
                            {item.type === 'weapon'
                              ? 'Zbraň'
                              : item.type === 'armor'
                                ? 'Zbroj'
                                : item.type === 'consumable'
                                  ? 'Spotřební'
                                  : item.type === 'material'
                                    ? 'Materiál'
                                    : 'Quest'}
                          </p>
                        </div>
                        {item.equipped && (
                          <Check className="h-5 w-5 flex-shrink-0 text-[#6fbf6f]" />
                        )}
                        <span
                          className="flex-shrink-0 text-sm text-[#ffd700]"
                          style={{ fontFamily: 'var(--font-fantasy)' }}
                        >
                          {item.value}g
                        </span>
                      </button>
                    )
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Item Details Sidebar */}
      {selectedItemData ? (
        <>
          {/* Mobile fullscreen overlay */}
          <div className="fixed inset-0 z-50 flex flex-col bg-black/95 backdrop-blur-md md:hidden">
            <div className="flex flex-shrink-0 items-center justify-between border-b border-[#8b6f47] bg-black/80 px-3 py-2 backdrop-blur-md">
              <h2 className="text-lg text-[#ffd700]" style={{ fontFamily: 'var(--font-medieval)' }}>
                Detail předmětu
              </h2>
              <button
                onClick={() => setSelectedItem(null)}
                className="flex items-center gap-2 rounded border border-[#8b6f47] bg-black/60 px-3 py-1.5 transition-colors hover:border-[#ffd700]"
              >
                <ArrowLeft className="h-4 w-4 text-[#d4a574]" />
                <span className="text-sm text-[#d4a574]">Zpět</span>
              </button>
            </div>

            <div className="scrollbar-custom flex-1 overflow-y-auto p-4">
              <ItemDetailContent
                item={selectedItemData}
                getRarityBorder={getRarityBorder}
                getRarityBg={getRarityBg}
                getRarityColor={getRarityColor}
                onEquip={handleEquip}
                onUnequip={handleUnequip}
                onUse={handleUse}
                onSell={handleSell}
                isPending={isPending}
              />
            </div>
          </div>

          {/* Desktop sidebar */}
          <div className="scrollbar-custom hidden w-80 overflow-y-auto border-l border-[#8b6f47] bg-black/90 p-4 backdrop-blur-md md:block">
            <ItemDetailContent
              item={selectedItemData}
              getRarityBorder={getRarityBorder}
              getRarityBg={getRarityBg}
              getRarityColor={getRarityColor}
              onEquip={handleEquip}
              onUnequip={handleUnequip}
              onUse={handleUse}
              onSell={handleSell}
              isPending={isPending}
            />
          </div>
        </>
      ) : (
        <div className="hidden w-80 border-l border-[#8b6f47] bg-black/90 p-4 backdrop-blur-md md:block">
          <div className="flex h-full items-center justify-center">
            <div className="text-center">
              <Backpack className="mx-auto mb-4 h-16 w-16 text-[#8b6f47]" />
              <h3
                className="mb-2 text-lg text-[#d4a574]"
                style={{ fontFamily: 'var(--font-fantasy)' }}
              >
                Vyber předmět
              </h3>
              <p className="text-sm leading-relaxed text-[#8b7355]">
                Klikni na předmět v inventáři pro zobrazení detailů.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function ItemDetailContent({
  item,
  getRarityBorder,
  getRarityBg,
  getRarityColor,
  onEquip,
  onUnequip,
  onUse,
  onSell,
  isPending,
}: {
  item: InventoryItemUI
  getRarityBorder: (r: ItemRarity) => string
  getRarityBg: (r: ItemRarity) => string
  getRarityColor: (r: ItemRarity) => string
  onEquip: (id: string) => void
  onUnequip: (id: string) => void
  onUse: (id: string) => void
  onSell: (id: string) => void
  isPending: boolean
}) {
  const Icon = getIconFromName(item.iconName)
  return (
    <>
      <div
        className={`mx-auto mb-4 flex aspect-square w-full max-w-[200px] items-center justify-center rounded border-2 ${getRarityBorder(
          item.rarity
        )} ${getRarityBg(item.rarity)}`}
      >
        <Icon className={`h-24 w-24 ${getRarityColor(item.rarity)}`} />
      </div>

      <div className="mb-4">
        <h2
          className={`mb-1 text-xl ${getRarityColor(item.rarity)}`}
          style={{ fontFamily: 'var(--font-fantasy)' }}
        >
          {item.name}
        </h2>
        <div className="mb-2 flex items-center gap-2">
          <span
            className={`rounded px-2 py-0.5 text-xs ${getRarityBg(item.rarity)} ${getRarityColor(
              item.rarity
            )}`}
          >
            {item.rarity === 'common'
              ? 'Běžné'
              : item.rarity === 'uncommon'
                ? 'Neobvyklé'
                : item.rarity === 'rare'
                  ? 'Vzácné'
                  : item.rarity === 'epic'
                    ? 'Epické'
                    : 'Legendární'}
          </span>
          {item.level > 0 && <span className="text-xs text-[#8b7355]">Lvl {item.level}</span>}
        </div>
        {item.description && (
          <p className="mb-3 text-sm text-[#f5e6d3] italic">&quot;{item.description}&quot;</p>
        )}
      </div>

      {/* Stats */}
      {(item.attack || item.defense || item.magic || item.speed || item.healing || item.mana) && (
        <div className="mb-3 rounded border border-[#8b6f47] bg-black/60 p-3">
          <h3 className="mb-2 text-sm text-[#d4a574]">Statistiky:</h3>
          <div className="space-y-1.5">
            {item.attack && (
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <Sword className="h-4 w-4 text-[#ff6b6b]" />
                  <span className="text-[#8b7355]">Útok:</span>
                </div>
                <span className="text-[#ff6b6b]">+{item.attack}</span>
              </div>
            )}
            {item.defense && (
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4 text-[#69ccf0]" />
                  <span className="text-[#8b7355]">Obrana:</span>
                </div>
                <span className="text-[#69ccf0]">+{item.defense}</span>
              </div>
            )}
            {/* Add other stats similarly */}
          </div>
        </div>
      )}

      {/* Info */}
      <div className="mb-3 rounded border border-[#8b6f47] bg-black/60 p-3">
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-[#8b7355]">Typ:</span>
            <span className="text-[#f5e6d3]">
              {item.type === 'weapon'
                ? 'Zbraň'
                : item.type === 'armor'
                  ? 'Zbroj'
                  : item.type === 'consumable'
                    ? 'Spotřební'
                    : item.type === 'material'
                      ? 'Materiál'
                      : 'Quest'}
            </span>
          </div>
          {item.slot && (
            <div className="flex justify-between">
              <span className="text-[#8b7355]">Pozice:</span>
              <span className="text-[#f5e6d3]">{item.slot}</span>
            </div>
          )}
          <div className="flex justify-between">
            <span className="text-[#8b7355]">Hodnota:</span>
            <span className="text-[#ffd700]">{item.value || 0}g</span>
          </div>
          {item.quantity > 1 && (
            <div className="flex justify-between">
              <span className="text-[#8b7355]">Množství:</span>
              <span className="text-[#f5e6d3]">{item.quantity}</span>
            </div>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="space-y-2">
        {(item.type === 'weapon' || item.type === 'armor') && (
          <button
            onClick={() => (item.equipped ? onUnequip(item.id) : onEquip(item.id))}
            disabled={isPending}
            className="w-full rounded border border-[#ffd700] bg-gradient-to-r from-[#8b6f47] to-[#6d5a3e] px-3 py-2 text-sm text-white transition-all hover:from-[#a8865d] hover:to-[#a8865d] disabled:opacity-50"
          >
            {item.equipped ? 'Sundat' : 'Nasadit'}
          </button>
        )}
        {item.type === 'consumable' && (
          <button
            onClick={() => onUse(item.id)}
            disabled={isPending}
            className="w-full rounded border border-[#6fbf6f] bg-gradient-to-r from-[#2d5c2d] to-[#1f4a1f] px-3 py-2 text-sm text-white transition-all hover:from-[#3a6f3a] hover:to-[#2d5c2d] disabled:opacity-50"
          >
            Použít
          </button>
        )}
        {item.type !== 'quest' && (
          <button
            onClick={() => onSell(item.id)}
            disabled={isPending}
            className="w-full rounded border border-[#d4a574] bg-gradient-to-r from-[#5c3a2d] to-[#4a2f1f] px-3 py-2 text-sm text-white transition-all hover:from-[#6f4a3a] hover:to-[#5c3a2d] disabled:opacity-50"
          >
            Prodat za {Math.floor((item.value || 0) * 0.5)}g
          </button>
        )}
      </div>
    </>
  )
}
