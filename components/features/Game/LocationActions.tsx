import { Fish, Home, MapPin, Pickaxe, Search, Swords } from 'lucide-react'
import { ActionBtn } from './ActionBtn'
import { GameLayout, GamePanel } from './GameLayout'

interface LocationActionsProps {
  onBack: () => void
  onCombat: () => void
  onMining?: () => void
  onFishing?: () => void
}

export function LocationActions({ onBack, onCombat, onMining, onFishing }: LocationActionsProps) {
  return (
    <GameLayout>
      <GamePanel title="Akce">
        <div className="space-y-1.5">
          <ActionBtn onClick={onBack} icon={Home}>
            <span>Vrátit se do města</span>
          </ActionBtn>
          <div className="mt-2 space-y-1.5 border-t border-[#8b6f47]/30 pt-2">
            <ActionBtn onClick={onCombat} icon={Swords}>
              Hledat <span className="text-[#ff6b6b]">nepřátele</span>
            </ActionBtn>

            {onMining && (
              <ActionBtn onClick={onMining} icon={Pickaxe}>
                <span className="text-[#ffd700]">Těžit</span> suroviny
              </ActionBtn>
            )}

            {onFishing && (
              <ActionBtn onClick={onFishing} icon={Fish}>
                <span className="text-[#69ccf0]">Rybařit</span> v řece
              </ActionBtn>
            )}

            <ActionBtn onClick={() => {}} icon={Search}>
              <span className="text-[#ffd700]">Prozkoumat</span> okolí
            </ActionBtn>
            <ActionBtn onClick={() => {}} icon={MapPin}>
              Hledat zajímavá <span className="text-[#ffd700]">místa</span>
            </ActionBtn>
          </div>
        </div>
      </GamePanel>
      <GamePanel title="Okolí">
        <div className="rounded border border-[#8b6f47] bg-black/60 p-3 text-xs text-[#8b7355]">
          Opustil jsi bezpečí města. Buď opatrný, nebezpečí může číhat za každým rohem.
        </div>
      </GamePanel>
    </GameLayout>
  )
}
