'use client'

import { Anvil, Coins, Hammer, Home, Shield, Store, Sword, TrendingUp, Wrench } from 'lucide-react'
import { useState } from 'react'
import { ActionBtn } from './ActionBtn'
import { GameLayout, GamePanel } from './GameLayout'

type ItemType = 'weapon' | 'armor' | 'consumable'

interface Item {
  id: number
  name: string
  type: ItemType
  icon: any
  price?: number
  attack?: number
  defense?: number
  durability?: number
  maxDurability?: number
  level?: number
  equipped?: boolean
  magic?: number
  speed?: number
  healing?: number
  mana?: number
  slot?: string
  strength?: number
  intelligence?: number
  agility?: number
  stamina?: number
}

interface SmithActionsProps {
  onBack: () => void
  gold: number
  setGold: (val: number | ((prev: number) => number)) => void
  inventory: Item[]
  setInventory: (val: Item[] | ((prev: Item[]) => Item[])) => void
  setInfoText: (text: string) => void
}

type TabMode = 'shop' | 'forge'
type ShopMode = 'default' | 'buy' | 'sell'
type ForgeMode = 'default' | 'crafting' | 'upgrade' | 'repair'

export function SmithActions({
  onBack,
  gold,
  setGold,
  inventory,
  setInventory,
  setInfoText,
}: SmithActionsProps) {
  const [tab, setTab] = useState<TabMode>('shop')
  const [shopMode, setShopMode] = useState<ShopMode>('default')
  const [forgeMode, setForgeMode] = useState<ForgeMode>('default')
  const [message, setMessage] = useState('')

  const showMessage = (msg: string) => {
    setMessage(msg)
    setTimeout(() => setMessage(''), 3000)
  }

  // SHOP (from ArmoryActions)
  const stock = [
    { name: 'Dřevěný meč', attack: 5, price: 50, type: 'weapon', icon: Sword },
    { name: 'Železný meč', attack: 12, price: 150, type: 'weapon', icon: Sword },
    { name: 'Dlouhý meč', attack: 15, price: 200, type: 'weapon', icon: Sword },
    { name: 'Bojová sekera', attack: 18, price: 300, type: 'weapon', icon: Sword },
    { name: 'Kožená zbroj', defense: 8, price: 100, type: 'armor', icon: Shield },
    { name: 'Řetězová zbroj', defense: 15, price: 250, type: 'armor', icon: Shield },
    { name: 'Ocelová zbroj', defense: 20, price: 400, type: 'armor', icon: Shield },
    { name: 'Platová zbroj', defense: 25, price: 600, type: 'armor', icon: Shield },
  ]

  const handleBuy = (template: any) => {
    if (gold < template.price) {
      showMessage('Nemáš dost zlata!')
      return
    }
    setGold((g) => g - template.price)
    const newItem = {
      ...template,
      id: Math.max(0, ...inventory.map((i) => i.id)) + 1 + Math.floor(Math.random() * 1000),
      durability: 100,
      maxDurability: 100,
      level: 0,
    }
    setInventory((prev) => [...prev, newItem])
    setInfoText(`Koupil jsi ${template.name}.`)
    showMessage(`Koupeno: ${template.name}`)
  }

  const handleSell = (item: Item) => {
    const price = Math.floor((item.price || 10) * 0.5)
    setGold((g) => g + price)
    setInventory((prev) => prev.filter((i) => i.id !== item.id))
    setInfoText(`Prodals ${item.name} za ${price} zlaťáků.`)
    showMessage(`Prodáno: ${item.name} (+${price}g)`)
  }

  // FORGE (from BlacksmithActions)
  const craftItems = [
    {
      name: 'Železný meč',
      price: 50,
      type: 'weapon',
      attack: 12,
      icon: Sword,
      desc: 'Základní zbraň. +12 Útok.',
    },
    {
      name: 'Ocelová zbroj',
      price: 120,
      type: 'armor',
      defense: 15,
      icon: Shield,
      desc: 'Pevná zbroj. +15 Obrana.',
    },
    {
      name: 'Válečné kladivo',
      price: 200,
      type: 'weapon',
      attack: 25,
      icon: Hammer,
      desc: 'Drtivá zbraň. +25 Útok.',
    },
  ]

  const handleCraft = (template: any) => {
    if (gold < template.price) {
      showMessage('Nemáš dost zlata!')
      return
    }
    setGold((g) => g - template.price)
    const newItem = {
      ...template,
      id: Math.max(0, ...inventory.map((i) => i.id)) + 1,
      durability: 100,
      maxDurability: 100,
      level: 0,
    }
    setInventory((prev) => [...prev, newItem])
    setInfoText(`Kovář pro tebe vykoval: ${template.name}`)
    showMessage(`Vyrobeno: ${template.name}`)
  }

  const getRepairCost = (item: Item) => {
    const current = item.durability ?? 100
    const max = item.maxDurability ?? 100
    const missing = max - current
    return Math.ceil(missing * 0.5) // 0.5 gold per durability point
  }

  const handleRepair = (item: Item) => {
    const cost = getRepairCost(item)
    if (cost === 0) return

    if (gold < cost) {
      showMessage('Nemáš dost zlata na opravu!')
      return
    }

    setGold((g) => g - cost)
    setInventory((prev) =>
      prev.map((i) => (i.id === item.id ? { ...i, durability: i.maxDurability ?? 100 } : i))
    )
    setInfoText(`Opravil jsi ${item.name}. Je jako nový!`)
    showMessage(`Opraveno: ${item.name} (-${cost}g)`)
  }

  const getUpgradeCost = (item: Item) => {
    const level = item.level ?? 0
    return 50 * (level + 1)
  }

  const handleUpgrade = (item: Item) => {
    const cost = getUpgradeCost(item)
    if (gold < cost) {
      showMessage('Nemáš dost zlata na vylepšení!')
      return
    }

    setGold((g) => g - cost)
    setInventory((prev) =>
      prev.map((i) => {
        if (i.id !== item.id) return i

        const newLevel = (i.level ?? 0) + 1
        const updates: any = { level: newLevel }

        const nameBase = i.name.replace(/\s\+\d+$/, '')
        updates.name = `${nameBase} +${newLevel}`

        if (i.attack) updates.attack = i.attack + 2
        if (i.defense) updates.defense = i.defense + 1

        return { ...i, ...updates }
      })
    )

    setInfoText(`Kovář vylepšil tvou výbavu! ${item.name} je nyní silnější.`)
    showMessage(`Vylepšeno! (-${cost}g)`)
  }

  const repairableItems = inventory.filter(
    (i) =>
      (i.type === 'weapon' || i.type === 'armor') &&
      (i.durability ?? 100) < (i.maxDurability ?? 100)
  )
  const upgradeableItems = inventory.filter((i) => i.type === 'weapon' || i.type === 'armor')

  const handleBackButton = () => {
    if (tab === 'shop' && shopMode !== 'default') {
      setShopMode('default')
    } else if (tab === 'forge' && forgeMode !== 'default') {
      setForgeMode('default')
    } else {
      onBack()
    }
  }

  const currentMode = tab === 'shop' ? shopMode : forgeMode
  const isInSubmenu = currentMode !== 'default'

  return (
    <GameLayout>
      <GamePanel
        title={
          tab === 'shop'
            ? shopMode === 'default'
              ? 'Zbrojíř'
              : shopMode === 'buy'
                ? 'Nákup'
                : 'Prodej'
            : forgeMode === 'default'
              ? 'Kovárna'
              : forgeMode === 'crafting'
                ? 'Kování předmětů'
                : forgeMode === 'upgrade'
                  ? 'Vylepšování'
                  : 'Opravy'
        }
      >
        <div className="space-y-1.5">
          {/* Tab switcher */}
          {!isInSubmenu && (
            <div className="mb-3 flex gap-2 rounded border border-[#8b6f47]/30 bg-black/40 p-1">
              <button
                onClick={() => setTab('shop')}
                className={`flex-1 rounded px-3 py-2 text-xs font-semibold transition-colors ${
                  tab === 'shop'
                    ? 'bg-[#8b6f47] text-[#f5e6d3]'
                    : 'text-[#8b7355] hover:text-[#f5e6d3]'
                }`}
              >
                <Store className="mx-auto mb-1 h-4 w-4" />
                Obchod
              </button>
              <button
                onClick={() => setTab('forge')}
                className={`flex-1 rounded px-3 py-2 text-xs font-semibold transition-colors ${
                  tab === 'forge'
                    ? 'bg-[#8b6f47] text-[#f5e6d3]'
                    : 'text-[#8b7355] hover:text-[#f5e6d3]'
                }`}
              >
                <Hammer className="mx-auto mb-1 h-4 w-4" />
                Kovárna
              </button>
            </div>
          )}

          {/* Header */}
          <div className="mb-2 flex items-center justify-between rounded border border-[#8b6f47]/30 bg-black/40 p-2">
            <ActionBtn onClick={handleBackButton} icon={isInSubmenu ? Anvil : Home}>
              <span>{isInSubmenu ? 'Zpět k výběru' : 'Vrátit se do města'}</span>
            </ActionBtn>
            <div className="flex items-center gap-2 px-3 font-mono text-[#ffd700]">
              <Coins className="h-4 w-4" />
              {gold}
            </div>
          </div>

          {/* Content */}
          <div className="mt-2 space-y-1.5 border-t border-[#8b6f47]/30 pt-2">
            {tab === 'shop' && (
              <>
                {shopMode === 'default' && (
                  <>
                    <ActionBtn onClick={() => setShopMode('buy')} icon={Store}>
                      Koupit <span className="text-[#ffd700]">zbraně a zbroje</span>
                    </ActionBtn>
                    <ActionBtn onClick={() => setShopMode('sell')} icon={Coins}>
                      Prodat <span className="text-[#69ccf0]">předměty</span>
                    </ActionBtn>
                  </>
                )}

                {shopMode === 'buy' && (
                  <div className="scrollbar-custom max-h-[300px] space-y-2 overflow-y-auto">
                    {stock.map((item, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleBuy(item)}
                        className="group w-full rounded border border-[#8b6f47]/50 bg-black/60 p-2 text-left transition-all hover:border-[#ffd700]"
                      >
                        <div className="mb-1 flex items-start justify-between">
                          <span className="flex items-center gap-2 text-sm font-bold text-[#f5e6d3] group-hover:text-[#ffd700]">
                            <item.icon className="h-4 w-4" />
                            {item.name}
                          </span>
                          <span className="text-xs text-[#ffd700]">{item.price}g</span>
                        </div>
                        <div className="flex gap-2 text-[10px] text-[#8b7355]">
                          {item.attack && (
                            <span>
                              Útok: <span className="text-[#ff6b6b]">+{item.attack}</span>
                            </span>
                          )}
                          {item.defense && (
                            <span>
                              Obrana: <span className="text-[#69ccf0]">+{item.defense}</span>
                            </span>
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                )}

                {shopMode === 'sell' && (
                  <div className="scrollbar-custom max-h-[300px] space-y-2 overflow-y-auto">
                    {inventory.filter((i) => i.type === 'weapon' || i.type === 'armor').length ===
                    0 ? (
                      <div className="p-4 text-center text-xs text-[#8b7355]">
                        Nemáš žádné vybavení k prodeji.
                      </div>
                    ) : (
                      inventory
                        .filter((i) => i.type === 'weapon' || i.type === 'armor')
                        .map((item) => {
                          const price = Math.floor((item.price || 10) * 0.5)
                          return (
                            <button
                              key={item.id}
                              onClick={() => handleSell(item)}
                              className="group w-full rounded border border-[#8b6f47]/50 bg-black/60 p-2 text-left transition-all hover:border-[#69ccf0]"
                            >
                              <div className="mb-1 flex items-start justify-between">
                                <span className="flex items-center gap-2 text-sm font-bold text-[#f5e6d3] group-hover:text-[#69ccf0]">
                                  <item.icon className="h-4 w-4" />
                                  {item.name}
                                </span>
                                <span className="text-xs text-[#69ccf0]">{price}g</span>
                              </div>
                              <div className="flex gap-2 text-[10px] text-[#8b7355]">
                                {item.attack && <span>Útok: +{item.attack}</span>}
                                {item.defense && <span>Obrana: +{item.defense}</span>}
                                {item.equipped && (
                                  <span className="text-[#6fbf6f]">(Nasazeno)</span>
                                )}
                              </div>
                            </button>
                          )
                        })
                    )}
                  </div>
                )}
              </>
            )}

            {tab === 'forge' && (
              <>
                {forgeMode === 'default' && (
                  <>
                    <ActionBtn onClick={() => setForgeMode('repair')} icon={Wrench}>
                      <div className="flex w-full items-center justify-between">
                        <span>Opravit výbavu</span>
                        {repairableItems.length > 0 && (
                          <span className="rounded-full bg-[#ff6b6b] px-1.5 text-xs text-white">
                            {repairableItems.length}
                          </span>
                        )}
                      </div>
                    </ActionBtn>
                    <ActionBtn onClick={() => setForgeMode('upgrade')} icon={TrendingUp}>
                      <span className="text-[#ffd700]">Vylepšit</span> zbraň nebo zbroj
                    </ActionBtn>
                    <ActionBtn onClick={() => setForgeMode('crafting')} icon={Hammer}>
                      <span className="text-[#ffd700]">Vykovat</span> nový předmět
                    </ActionBtn>
                  </>
                )}

                {forgeMode === 'crafting' && (
                  <div className="space-y-2">
                    {craftItems.map((item, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleCraft(item)}
                        className="group w-full rounded border border-[#8b6f47]/50 bg-black/60 p-2 text-left transition-all hover:border-[#ffd700]"
                      >
                        <div className="mb-1 flex items-start justify-between">
                          <span className="flex items-center gap-2 text-sm font-bold text-[#f5e6d3] group-hover:text-[#ffd700]">
                            <item.icon className="h-4 w-4" />
                            {item.name}
                          </span>
                          <span className="text-xs text-[#ffd700]">{item.price}g</span>
                        </div>
                        <p className="text-[10px] text-[#8b7355]">{item.desc}</p>
                      </button>
                    ))}
                  </div>
                )}

                {forgeMode === 'repair' && (
                  <div className="space-y-2">
                    {repairableItems.length === 0 ? (
                      <div className="p-4 text-center text-xs text-[#8b7355] italic">
                        Všechna tvá výbava je v perfektním stavu.
                      </div>
                    ) : (
                      repairableItems.map((item) => {
                        const cost = getRepairCost(item)
                        const current = item.durability ?? 100
                        const max = item.maxDurability ?? 100
                        const pct = Math.round((current / max) * 100)

                        return (
                          <div
                            key={item.id}
                            className="flex items-center justify-between rounded border border-[#8b6f47]/30 bg-black/40 p-2"
                          >
                            <div className="flex items-center gap-2">
                              <div className="relative">
                                <item.icon className="h-8 w-8 text-[#8b7355]" />
                                {item.equipped && (
                                  <div className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-[#6fbf6f]"></div>
                                )}
                              </div>
                              <div>
                                <div className="text-sm text-[#f5e6d3]">{item.name}</div>
                                <div className="text-[10px] text-[#8b7355]">
                                  Stav:{' '}
                                  <span className={pct < 50 ? 'text-[#ff6b6b]' : 'text-[#ffd700]'}>
                                    {current}/{max}
                                  </span>
                                </div>
                              </div>
                            </div>
                            <button
                              onClick={() => handleRepair(item)}
                              className="flex items-center gap-1 rounded border border-[#d4a574] bg-[#8b6f47] px-3 py-1 text-xs text-white hover:bg-[#6fbf6f]"
                            >
                              <Wrench className="h-3 w-3" />
                              {cost}g
                            </button>
                          </div>
                        )
                      })
                    )}
                  </div>
                )}

                {forgeMode === 'upgrade' && (
                  <div className="space-y-2">
                    <div className="mb-2 px-1 text-[10px] text-[#8b7355]">
                      Vylepšení zvyšuje statistiky předmětu. Cena roste s každou úrovní.
                    </div>
                    <div className="scrollbar-custom max-h-[300px] space-y-2 overflow-y-auto pr-1">
                      {upgradeableItems.map((item) => {
                        const cost = getUpgradeCost(item)
                        const level = item.level ?? 0
                        const nextLevel = level + 1

                        return (
                          <div
                            key={item.id}
                            className="rounded border border-[#8b6f47]/30 bg-black/40 p-2"
                          >
                            <div className="mb-2 flex items-start justify-between">
                              <div className="flex items-center gap-2">
                                <item.icon className="h-6 w-6 text-[#ffd700]" />
                                <div>
                                  <div className="text-sm font-bold text-[#f5e6d3]">
                                    {item.name}
                                  </div>
                                  <div className="flex gap-2 text-[10px] text-[#8b7355]">
                                    <span>Lvl {level}</span>
                                    {item.attack && (
                                      <span>
                                        Útok: {item.attack}{' '}
                                        <span className="text-[#6fbf6f]">+{nextLevel * 2}</span>
                                      </span>
                                    )}
                                    {item.defense && (
                                      <span>
                                        Obrana: {item.defense}{' '}
                                        <span className="text-[#6fbf6f]">+{nextLevel * 1}</span>
                                      </span>
                                    )}
                                  </div>
                                </div>
                              </div>
                              <div className="font-mono text-sm text-[#ffd700]">{cost}g</div>
                            </div>
                            <button
                              onClick={() => handleUpgrade(item)}
                              disabled={gold < cost}
                              className={`flex w-full items-center justify-center gap-2 rounded border py-1 text-xs ${
                                gold >= cost
                                  ? 'border-[#ffd700] bg-[#8b6f47] text-white hover:bg-[#ffd700] hover:text-black'
                                  : 'cursor-not-allowed border-[#8b6f47]/30 bg-black/60 text-[#8b7355]'
                              }`}
                            >
                              <TrendingUp className="h-3 w-3" />
                              Vylepšit na +{nextLevel}
                            </button>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </GamePanel>

      {message && (
        <div className="animate-in fade-in slide-in-from-top-4 fixed top-20 left-1/2 z-50 -translate-x-1/2 rounded bg-[#ffd700]/90 px-4 py-2 text-sm font-bold text-black shadow-lg">
          {message}
        </div>
      )}

      <GamePanel title={tab === 'shop' ? 'Zbrojíř' : 'Mistr Kovář'}>
        <div className="flex gap-3 rounded border border-[#8b6f47] bg-black/60 p-3 text-xs leading-relaxed text-[#8b7355]">
          <div className="flex h-[40px] min-w-[40px] items-center justify-center rounded-full border border-[#8b6f47] bg-[#8b6f47]/20">
            {tab === 'shop' ? (
              <Shield className="h-5 w-5 text-[#f5e6d3]" />
            ) : (
              <Hammer className="h-5 w-5 text-[#f5e6d3]" />
            )}
          </div>
          <div>
            {tab === 'shop'
              ? shopMode === 'default'
                ? '"Potřebuješ pořádnou ocel? Mám tu meče ostré jako břitva a zbroje, co vydrží úder draka."'
                : shopMode === 'buy'
                  ? '"Vybírej pečlivě. Tvůj život může záviset na kvalitě tvé zbroje."'
                  : '"Vykupuji jen kvalitní zboží. Žádný rezavý šrot."'
              : forgeMode === 'default'
                ? '"Vítej v mé dílně! Oheň je horký a ocel připravená. Potřebuješ něco opravit, nebo hledáš zbraň hodnou krále?"'
                : forgeMode === 'crafting'
                  ? '"Výborná volba. Mám tu nejlepší ocel z trpasličích dolů. Vyber si, co mám vykovat."'
                  : forgeMode === 'repair'
                    ? '"Ukaž mi to... hm, to je ošklivý šrám. Ale nic, co by pár úderů kladivem nespravilo."'
                    : '"Chceš to vylepšit? To bude drahé. Musím použít speciální techniky a magický prach."'}
          </div>
        </div>
      </GamePanel>
    </GameLayout>
  )
}
