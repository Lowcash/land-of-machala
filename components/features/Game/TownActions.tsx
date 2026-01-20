'use client'

import {
    Beer,
    Building,
    Cross,
    Hammer,
    ScrollText,
    ShoppingBag,
    Swords
} from 'lucide-react'
import { useState } from 'react'
import { ActionBtn } from './ActionBtn'
import { ActionsLayout } from './ActionsLayout'

interface TownActionsProps {
  onSmith: () => void
  onBank: () => void
  onHealer: () => void
  onTavern: () => void
  onMarket: () => void
  onMove: (direction: 'north' | 'south' | 'east' | 'west') => void
  setInfoText: (text: string | null) => void
}

export function TownActions({
  onSmith,
  onBank,
  onHealer,
  onMove,
  onTavern,
  onMarket,
  setInfoText,
}: TownActionsProps) {
  const [showDirections, setShowDirections] = useState(false)

  const handleShowDirections = () => {
    setShowDirections(!showDirections)
    if (!showDirections) {
      setInfoText(
        '<span class="text-[#ff6b6b]">⚠️ Varování!</span> Za hradbami města čeká <span class="text-[#ff6b6b]">nebezpečí</span>. Připrav se na <span class="text-[#ffd700]">souboje</span> s nepřáteli. Každá výprava stojí energii.'
      )
    } else {
      setInfoText(null)
    }
  }

  const handleBulletinBoard = () => {
    const rumors = [
      "⚠️ <span class='text-[#ffd700]'>HLEDÁ SE:</span> Gobliní šaman, který krade slepice. Odměna: 50g u starosty.",
      "ℹ️ <span class='text-[#69ccf0]'>Zpráva:</span> Ceny železa klesly díky nové dodávce z hor.",
      "⚠️ <span class='text-[#ff6b6b]'>Varování:</span> V Temném lese byl spatřen obří pavouk.",
      "ℹ️ <span class='text-[#d4a574]'>Tip:</span> Léčitel vykupuje vzácné byliny za dvojnásobnou cenu.",
      "❓ <span class='text-[#c084fc]'>Záhada:</span> V noci se ze staré studny ozývá pláč.",
    ]
    const randomRumor = rumors[Math.floor(Math.random() * rumors.length)]
    if (randomRumor) setInfoText(randomRumor)
  }
  
  return (
    <ActionsLayout
      showDirections={showDirections}
      onToggleDirections={handleShowDirections}
      onMove={onMove}
      exploration={
        <>
            <ActionBtn onClick={handleShowDirections} icon={Swords}>
                <span className="text-[#ffd700]">Prozkoumat okolí</span>
            </ActionBtn>
            <ActionBtn onClick={handleBulletinBoard} icon={ScrollText}>
                Městská nástěnka
            </ActionBtn>
        </>
      }
    >
       <ActionBtn onClick={onHealer} icon={Cross}>
            Léčitel
        </ActionBtn>
        <ActionBtn onClick={onSmith} icon={Hammer}>
            Zbrojíř
        </ActionBtn>
        <ActionBtn onClick={onBank} icon={Building}>
            Banka
        </ActionBtn>
        <ActionBtn onClick={onTavern} icon={Beer}>
            Taverna
        </ActionBtn>
        <ActionBtn onClick={onMarket} icon={ShoppingBag}>
            Tržiště
        </ActionBtn>
    </ActionsLayout>
  )
}
