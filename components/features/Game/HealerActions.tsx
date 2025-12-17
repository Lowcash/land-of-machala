'use client'

import { useState } from 'react';
import { Home, Heart, ScrollText, FlaskConical, ChevronRight, Sparkles, Zap } from 'lucide-react';
import { ActionBtn } from './ActionBtn';
import { GameLayout, GamePanel } from './GameLayout';

interface HealerActionsProps {
  onBack: () => void;
  gold: number;
  setGold: (gold: number | ((prev: number) => number)) => void;
  activeBuffs: any[];
  setActiveBuffs: (buffs: any) => void;
  setInfoText: (text: string) => void;
}

export function HealerActions({ onBack, gold, setGold, activeBuffs, setActiveBuffs, setInfoText }: HealerActionsProps) {
  const [mode, setMode] = useState<'services' | 'talk'>('services');
  const [message, setMessage] = useState('');

  const handleAction = (action: string, cost: number) => {
      if (gold < cost) {
          setMessage("Nemáš dost zlata!");
          setTimeout(() => setMessage(''), 3000);
          return;
      }
      
      setGold((prev: number) => prev - cost);
      
      if (action === 'Léčení') {
          setInfoText("Léčitel ti vyčistil rány. Cítíš se lépe. (HP doplněno)");
          // Note: Full HP restore logic should ideally be here or passed via prop, 
          // but for now we rely on the visual feedback and cost. 
          // To actually heal, we would need setHp prop.
      } else if (action === 'Požehnání síly') {
          setActiveBuffs((prev: any[]) => [...prev, { name: "Síla Býka", stat: "strength", val: 5 }]);
      } else if (action === 'Požehnání ochrany') {
          // Using Stamina because 'defense' is not a base stat in Game.tsx logic yet
          setActiveBuffs((prev: any[]) => [...prev, { name: "Výdrž kance", stat: "stamina", val: 5 }]);
      }

      setMessage(`Použil jsi službu: ${action} (-${cost}g)`);
      setTimeout(() => setMessage(''), 3000);
  };

  return (
    <GameLayout>
      <GamePanel title="Léčitel">
        <div className="space-y-3">
          <div className="bg-black/60 rounded border border-[#8b6f47] p-3 flex justify-between items-center">
             <span className="text-[#8b7355] text-sm">Tvé zlato:</span>
             <span className="text-[#ffd700] font-mono text-lg">{gold}g</span>
          </div>

          <div className="space-y-1.5">
            <ActionBtn onClick={onBack} icon={Home}>
              <span>Vrátit se do města</span>
            </ActionBtn>
            <div className="pt-2 mt-2 border-t border-[#8b6f47]/30 space-y-1.5">
              <ActionBtn 
                onClick={() => setMode('services')} 
                icon={Heart}
                className={mode === 'services' ? 'bg-[#ffd700]/10 border-[#ffd700]' : ''}
              >
                <span className="flex items-center justify-between w-full">
                    <span>Služby a lektvary</span>
                    <ChevronRight className="w-3.5 h-3.5 text-[#8b7355]" />
                </span>
              </ActionBtn>
              <ActionBtn 
                onClick={() => setMode('talk')} 
                icon={ScrollText}
                className={mode === 'talk' ? 'bg-[#ffd700]/10 border-[#ffd700]' : ''}
              >
                <span className="flex items-center justify-between w-full">
                    <span>Mluvit s léčitelem</span>
                    <ChevronRight className="w-3.5 h-3.5 text-[#8b7355]" />
                </span>
              </ActionBtn>
            </div>
          </div>
        </div>
      </GamePanel>

      <GamePanel title={mode === 'services' ? 'Nabídka služeb' : 'Rozhovor'}>
        {message && (
            <div className="bg-[#6fbf6f]/20 border border-[#6fbf6f] rounded p-2 mb-3 text-xs text-[#6fbf6f] flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              {message}
            </div>
        )}
        
        {activeBuffs.length > 0 && (
            <div className="bg-[#ffd700]/10 border border-[#ffd700]/30 rounded p-2 mb-3">
                <div className="text-[10px] text-[#ffd700] uppercase tracking-wide mb-1">Aktivní požehnání</div>
                {activeBuffs.map((b, i) => (
                    <div key={i} className="text-xs text-[#f5e6d3] flex items-center gap-2">
                        <Zap className="w-3 h-3 text-[#ffd700]" />
                        {b.name} (+{b.val} {b.stat})
                    </div>
                ))}
            </div>
        )}

        {mode === 'services' ? (
            <div className="space-y-2">
                <div className="p-3 bg-black/40 rounded border border-[#8b6f47]/30 flex justify-between items-center group hover:bg-[#6fbf6f]/5 transition-colors">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-[#6fbf6f]/20 rounded-full text-[#6fbf6f]">
                            <Heart className="w-4 h-4" />
                        </div>
                        <div>
                            <div className="text-[#f5e6d3] text-sm">Ošetření zranění</div>
                            <div className="text-[#8b7355] text-[10px]">Obnoví zdraví</div>
                        </div>
                    </div>
                    <button 
                        onClick={() => handleAction('Léčení', 50)}
                        className="px-3 py-1.5 bg-[#8b6f47] hover:bg-[#a8865d] text-white rounded text-xs border border-[#d4a574]/50 hover:border-[#ffd700]"
                    >
                        50g
                    </button>
                </div>

                <div className="p-3 bg-black/40 rounded border border-[#8b6f47]/30 flex justify-between items-center group hover:bg-[#ffd700]/5 transition-colors">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-[#ffd700]/20 rounded-full text-[#ffd700]">
                            <Sparkles className="w-4 h-4" />
                        </div>
                        <div>
                            <div className="text-[#f5e6d3] text-sm">Požehnání síly</div>
                            <div className="text-[#8b7355] text-[10px]">+5 Síla (Do odpočinku)</div>
                        </div>
                    </div>
                    <button 
                        onClick={() => handleAction('Požehnání síly', 100)}
                        className="px-3 py-1.5 bg-[#8b6f47] hover:bg-[#a8865d] text-white rounded text-xs border border-[#d4a574]/50 hover:border-[#ffd700]"
                    >
                        100g
                    </button>
                </div>
                
                 <div className="p-3 bg-black/40 rounded border border-[#8b6f47]/30 flex justify-between items-center group hover:bg-[#ffd700]/5 transition-colors">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-[#ffd700]/20 rounded-full text-[#ffd700]">
                            <Sparkles className="w-4 h-4" />
                        </div>
                        <div>
                            <div className="text-[#f5e6d3] text-sm">Požehnání výdrže</div>
                            <div className="text-[#8b7355] text-[10px]">+5 Stamina (Do odpočinku)</div>
                        </div>
                    </div>
                    <button 
                        onClick={() => handleAction('Požehnání ochrany', 100)}
                        className="px-3 py-1.5 bg-[#8b6f47] hover:bg-[#a8865d] text-white rounded text-xs border border-[#d4a574]/50 hover:border-[#ffd700]"
                    >
                        100g
                    </button>
                </div>

                <div className="p-3 bg-black/40 rounded border border-[#8b6f47]/30 flex justify-between items-center group hover:bg-[#69ccf0]/5 transition-colors">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-[#69ccf0]/20 rounded-full text-[#69ccf0]">
                            <FlaskConical className="w-4 h-4" />
                        </div>
                        <div>
                            <div className="text-[#f5e6d3] text-sm">Protijed</div>
                            <div className="text-[#8b7355] text-[10px]">Vyléčí otravu</div>
                        </div>
                    </div>
                    <button 
                        onClick={() => handleAction('Protijed', 20)}
                        className="px-3 py-1.5 bg-[#8b6f47] hover:bg-[#a8865d] text-white rounded text-xs border border-[#d4a574]/50 hover:border-[#ffd700]"
                    >
                        20g
                    </button>
                </div>
            </div>
        ) : (
            <div className="bg-black/60 rounded border border-[#8b6f47] p-4 space-y-4">
                <p className="text-sm text-[#d4a574] italic">
                    "Vítej, poutníku. Mé byliny jsou čerstvé a mé ruce pevné. Co tě trápí? Hledáš uzdravení těla, nebo snad potřebuješ pomoc s něčím... složitějším?"
                </p>
                <div className="space-y-2">
                    <button className="w-full text-left p-2 text-xs text-[#8b7355] hover:text-[#ffd700] border-b border-[#8b6f47]/30 hover:bg-white/5 transition-colors">
                        &gt; Slyšel jsem o problémech s bylinami (Quest)
                    </button>
                    <button className="w-full text-left p-2 text-xs text-[#8b7355] hover:text-[#ffd700] border-b border-[#8b6f47]/30 hover:bg-white/5 transition-colors">
                        &gt; Kde najdu vzácné ingredience?
                    </button>
                    <button className="w-full text-left p-2 text-xs text-[#8b7355] hover:text-[#ffd700] border-b border-[#8b6f47]/30 hover:bg-white/5 transition-colors">
                        &gt; Potřebuji jen ošetřit (Zpět k službám)
                    </button>
                </div>
            </div>
        )}
      </GamePanel>
    </GameLayout>
  );
}
