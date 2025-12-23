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
import { GameLayout, GamePanel } from './GameLayout'

interface TownActionsProps {
  onExplore: () => void
  onSmith: () => void
  onBank: () => void
  onHealer: () => void
  onTavern: () => void
  onMarket: () => void
  onGuildHall: () => void
  onMove: (direction: 'north' | 'south' | 'east' | 'west') => void
  setInfoText: (text: string | null) => void
}

export function TownActions({
  onExplore,
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
    <GameLayout>
      <GamePanel title={showDirections ? 'Kam se vydat?' : 'Co chceš dělat?'}>
        <div className="space-y-1.5">
          {!showDirections ? (
            <ActionBtn onClick={handleShowDirections} icon={Swords}>
              Opustit město a <span className="text-[#ffd700]">prozkoumat okolí</span>
            </ActionBtn>
          ) : (
            <>
              <ActionBtn onClick={handleStayInTown} icon={Home}>
                <span>Zůstat ve městě</span>
              </ActionBtn>

              <div className="mt-2 space-y-1.5 border-t border-[#8b6f47]/30 pt-2">
                <DirectionBtn
                  onClick={() => onMove('north')}
                  icon={ArrowUp}
                  image="/assets/locations/mountains-background.jpg"
                >
                  Vydat se na <span className="text-[#ffd700]">sever</span> - horské průsmyky
                </DirectionBtn>
                <DirectionBtn
                  onClick={() => onMove('south')}
                  icon={ArrowDown}
                  image="/assets/locations/plains-background.jpg"
                >
                  Vydat se na <span className="text-[#ffd700]">jih</span> - zelené pláně
                </DirectionBtn>
                <DirectionBtn
                  onClick={() => onMove('east')}
                  icon={ArrowRight}
                  image="/assets/locations/desert-background.jpg"
                >
                  Vydat se na <span className="text-[#ffd700]">východ</span> - vyprahlá poušť
                </DirectionBtn>
                <ActionBtn onClick={() => onMove('west')} icon={ArrowLeftIcon}>
                  Vydat se na <span className="text-[#ffd700]">západ</span> - temný les
                </ActionBtn>
                <ActionBtn onClick={onExplore} icon={Swords}>
                  Jen se <span className="text-[#ffd700]">rozhlédnout</span> (Stojí energii)
                </ActionBtn>
              </div>
            </>
          )}
        </div>
      </GamePanel>

      <GamePanel title="Místa ve městě">
        <div className="space-y-1.5">
          <ActionBtn onClick={onHealer} icon={Cross}>
            Navštívit <span className="text-[#ffd700]">léčitele</span> pro pomoc a léčení
          </ActionBtn>
          <ActionBtn onClick={onSmith} icon={Hammer}>
            Navštívit <span className="text-[#ffd700]">zbrojíře a kováře</span> pro zbraně
          </ActionBtn>
          <ActionBtn onClick={onBank} icon={Building}>
            Jít do <span className="text-[#ffd700]">banky</span> a uložit cennosti
          </ActionBtn>
          <ActionBtn onClick={onTavern} icon={Beer}>
            Navštívit <span className="text-[#ffd700]">tavernu</span> a odpočinout si
          </ActionBtn>
          <ActionBtn onClick={onMarket} icon={ShoppingBag}>
            Prozkoumat <span className="text-[#ffd700]">tržiště</span> a obchodovat
          </ActionBtn>
          {/* <ActionBtn onClick={onGuildHall} icon={Users}>
            Vstoupit do <span className="text-[#ffd700]">cechovní síně</span>
          </ActionBtn> */}

          <div className="mt-2 border-t border-[#8b6f47]/30 pt-2">
            <ActionBtn onClick={handleBulletinBoard} icon={ScrollText}>
              Přečíst si <span className="text-[#ffd700]">městskou vývěsku</span>
            </ActionBtn>
          </div>
        </div>
      </GamePanel>
    </GameLayout>
  )
}
