'use client'

import {
    ArrowDown,
    ArrowLeft as ArrowLeftIcon,
    ArrowRight,
    ArrowUp,
    Beer,
    Building,
    Cross,
    Hammer,
    Home,
    ScrollText,
    ShoppingBag,
    Swords,
} from 'lucide-react'
import { useState } from 'react'
import { ActionBtn, DirectionBtn } from './ActionBtn'
import { GamePanel } from './GameLayout'

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
    setShowDirections(true)
    setInfoText(
      '<span class="text-[#ff6b6b]">⚠️ Varování!</span> Za hradbami města čeká <span class="text-[#ff6b6b]">nebezpečí</span>. Připrav se na <span class="text-[#ffd700]">souboje</span> s nepřáteli. Každý výprava stojí energii.'
    )
  }

  const handleStayInTown = () => {
    setShowDirections(false)
    setInfoText(null)
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
    <GamePanel>
      <div className="flex min-h-full flex-col justify-end gap-4">
        {showDirections ? (
           <>
              <div className="mb-4">
                 <ActionBtn onClick={handleStayInTown} icon={Home}>
                    <span>Zůstat ve městě</span>
                 </ActionBtn>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pb-1">
                <DirectionBtn
                  onClick={() => onMove('north')}
                  icon={ArrowUp}
                  image="/assets/locations/mountains-background.jpg"
                >
                  <span className="text-[#ffd700]">Sever</span> - Hory
                </DirectionBtn>
                <DirectionBtn
                  onClick={() => onMove('south')}
                  icon={ArrowDown}
                  image="/assets/locations/plains-background.jpg"
                >
                  <span className="text-[#ffd700]">Jih</span> - Pláně
                </DirectionBtn>
                <DirectionBtn
                  onClick={() => onMove('east')}
                  icon={ArrowRight}
                  image="/assets/locations/desert-background.jpg"
                >
                  <span className="text-[#ffd700]">Východ</span> - Poušť
                </DirectionBtn>
                <ActionBtn onClick={() => onMove('west')} icon={ArrowLeftIcon}>
                   <span className="text-[#ffd700]">Západ</span> - Les
                </ActionBtn>
              </div>
            </>
        ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pb-1">
               {/* Left Column - Town Services */}
               <div className="space-y-2">
                 <div className="text-xs font-bold text-[#8b7355] uppercase tracking-wider mb-1">Služby</div>
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
               </div>

               {/* Right Column - Exploration & Info */}
               <div className="space-y-2">
                 <div className="text-xs font-bold text-[#8b7355] uppercase tracking-wider mb-1">Průzkum</div>
                 <ActionBtn onClick={handleShowDirections} icon={Swords}>
                   <span className="text-[#ffd700]">Prozkoumat okolí</span>
                 </ActionBtn>
                 <ActionBtn onClick={handleBulletinBoard} icon={ScrollText}>
                   Městská nástěnka
                 </ActionBtn>
               </div>
             </div>
        )}
      </div>
    </GamePanel>
  )
}
