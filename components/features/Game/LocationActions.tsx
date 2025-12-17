import { Home, Swords, Search, MapPin } from 'lucide-react';
import { ActionBtn } from './ActionBtn';
import { GameLayout, GamePanel } from './GameLayout';

interface LocationActionsProps {
  onBack: () => void;
  onCombat: () => void;
}

export function LocationActions({ onBack, onCombat }: LocationActionsProps) {
  return (
    <GameLayout>
      <GamePanel title="Akce">
        <div className="space-y-1.5">
          <ActionBtn onClick={onBack} icon={Home}>
            <span>Vrátit se do města</span>
          </ActionBtn>
          <div className="pt-2 mt-2 border-t border-[#8b6f47]/30 space-y-1.5">
            <ActionBtn onClick={onCombat} icon={Swords}>
              Hledat <span className="text-[#ff6b6b]">nepřátele</span>
            </ActionBtn>
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
        <div className="bg-black/60 rounded border border-[#8b6f47] p-3 text-xs text-[#8b7355]">
            Opustil jsi bezpečí města. Buď opatrný, nebezpečí může číhat za každým rohem.
        </div>
      </GamePanel>
    </GameLayout>
  );
}
