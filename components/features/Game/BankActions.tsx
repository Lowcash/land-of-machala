'use client'

import { useState } from 'react';
import { Home, Backpack, Coins, ChevronRight, TrendingUp } from 'lucide-react';
import { ActionBtn } from './ActionBtn';
import { GameLayout, GamePanel } from './GameLayout';

interface Item {
  id: number;
  name: string;
  type: string;
  value?: number;
  [key: string]: any;
}

interface BankActionsProps {
  onBack: () => void;
  gold: number;
  setGold: (val: number | ((p: number) => number)) => void;
  bankGold: number;
  setBankGold: (val: number | ((p: number) => number)) => void;
  bankItems: Item[];
  setBankItems: (items: any) => void;
  inventory: Item[];
  setInventory: (items: any) => void;
  bankInvestment: number;
  setBankInvestment: (val: number | ((p: number) => number)) => void;
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
    bankInvestment,
    setBankInvestment
}: BankActionsProps) {
  const [selectedAction, setSelectedAction] = useState<'storage' | 'deposit' | 'withdraw' | 'invest'>('storage');
  const [amount, setAmount] = useState(0);
  const [message, setMessage] = useState('');

  const handleDepositGold = () => {
    if (amount > 0 && amount <= gold) {
      setGold((prev: number) => prev - amount);
      setBankGold((prev: number) => prev + amount);
      setMessage(`Vložil jsi ${amount}g do banky!`);
      setAmount(0);
      setTimeout(() => setMessage(''), 3000);
    }
  };

  const handleWithdrawGold = () => {
    if (amount > 0 && amount <= bankGold) {
      setBankGold((prev: number) => prev - amount);
      setGold((prev: number) => prev + amount);
      setMessage(`Vybral jsi ${amount}g z banky!`);
      setAmount(0);
      setTimeout(() => setMessage(''), 3000);
    }
  };

  const handleDepositItem = (item: Item) => {
     if (item.equipped) {
         setMessage("Nemůžeš uložit vybavený předmět!");
         setTimeout(() => setMessage(''), 3000);
         return;
     }
     setInventory((prev: Item[]) => prev.filter(i => i.id !== item.id));
     setBankItems((prev: Item[]) => [...prev, item]);
     setMessage(`Uložil jsi ${item.name} do trezoru.`);
     setTimeout(() => setMessage(''), 3000);
  };

  const handleWithdrawItem = (item: Item) => {
      setBankItems((prev: Item[]) => prev.filter(i => i.id !== item.id));
      setInventory((prev: Item[]) => [...prev, item]);
      setMessage(`Vybral jsi ${item.name} z trezoru.`);
      setTimeout(() => setMessage(''), 3000);
  };

  const handleInvest = () => {
      if (amount > 0 && amount <= gold) {
          setGold(g => g - amount);
          setBankInvestment(prev => prev + amount);
          setMessage(`Investoval jsi ${amount}g do fondu!`);
          setAmount(0);
          setTimeout(() => setMessage(''), 3000);
      }
  };

  const handleDivest = () => {
      if (amount > 0 && amount <= bankInvestment) {
          setBankInvestment(prev => prev - amount);
          setGold(g => g + amount);
          setMessage(`Vybral jsi ${amount}g z investic!`);
          setAmount(0);
          setTimeout(() => setMessage(''), 3000);
      }
  };

  return (
    <GameLayout>
      <GamePanel title="Akce">
        <div className="space-y-1.5">
          <ActionBtn onClick={onBack} icon={Home}>
            <span>Vrátit se do města</span>
          </ActionBtn>
          
          <div className="pt-2 mt-2 border-t border-[#8b6f47]/30 space-y-1.5">
            <ActionBtn 
              onClick={() => setSelectedAction('storage')} 
              icon={Backpack}
              className={selectedAction === 'storage' ? 'bg-black/60 border-[#ffd700]' : ''}
            >
              <span className="flex items-center justify-between w-full">
                <span>Trezor (Předměty)</span>
                <ChevronRight className="w-3.5 h-3.5 text-[#8b7355]" />
              </span>
            </ActionBtn>
            <ActionBtn 
              onClick={() => setSelectedAction('deposit')} 
              icon={Coins}
              className={selectedAction === 'deposit' ? 'bg-black/60 border-[#ffd700]' : ''}
            >
              <span className="flex items-center justify-between w-full">
                <span>Vložit zlato</span>
                <ChevronRight className="w-3.5 h-3.5 text-[#8b7355]" />
              </span>
            </ActionBtn>
            <ActionBtn 
              onClick={() => setSelectedAction('withdraw')} 
              icon={Coins}
              className={selectedAction === 'withdraw' ? 'bg-black/60 border-[#ffd700]' : ''}
            >
              <span className="flex items-center justify-between w-full">
                <span>Vybrat zlato</span>
                <ChevronRight className="w-3.5 h-3.5 text-[#8b7355]" />
              </span>
            </ActionBtn>
            <ActionBtn 
              onClick={() => setSelectedAction('invest')} 
              icon={TrendingUp}
              className={selectedAction === 'invest' ? 'bg-black/60 border-[#ffd700]' : ''}
            >
              <span className="flex items-center justify-between w-full">
                <span>Investice</span>
                <ChevronRight className="w-3.5 h-3.5 text-[#8b7355]" />
              </span>
            </ActionBtn>
          </div>
        </div>
      </GamePanel>
      
      <GamePanel title={selectedAction === 'storage' ? 'Trezor' : selectedAction === 'deposit' ? 'Vklad zlata' : selectedAction === 'withdraw' ? 'Výběr zlata' : 'Investiční fond'}>
          
          {message && (
            <div className="bg-[#6fbf6f]/20 border border-[#6fbf6f] rounded p-2 mb-3 text-xs text-[#6fbf6f]">
              {message}
            </div>
          )}
          
          {selectedAction === 'storage' && (
            <div className="space-y-4">
              {/* Bank Items */}
              <div className="bg-black/60 rounded border border-[#8b6f47] p-2 max-h-[150px] overflow-y-auto scrollbar-custom">
                <div className="text-xs text-[#d4a574] mb-2 sticky top-0 bg-black/80 p-1">Uložené v bance:</div>
                {bankItems.length === 0 ? (
                    <div className="text-xs text-[#8b7355] italic p-2">Prázdný trezor</div>
                ) : (
                    bankItems.map(item => (
                    <div key={item.id} className="flex items-center justify-between py-1 text-xs border-b border-[#8b6f47]/20 last:border-0 hover:bg-white/5 px-1">
                        <span className="text-[#f5e6d3]">{item.name}</span>
                        <button 
                        onClick={() => handleWithdrawItem(item)}
                        className="px-2 py-0.5 bg-[#8b6f47] hover:bg-[#a8865d] text-white rounded text-[10px] transition-colors"
                        >
                        Vybrat
                        </button>
                    </div>
                    ))
                )}
              </div>

              {/* Inventory Items */}
               <div className="bg-black/60 rounded border border-[#8b6f47] p-2 max-h-[150px] overflow-y-auto scrollbar-custom">
                <div className="text-xs text-[#d4a574] mb-2 sticky top-0 bg-black/80 p-1">V batohu (K uložení):</div>
                {inventory.filter(i => !i.equipped).length === 0 ? (
                    <div className="text-xs text-[#8b7355] italic p-2">Žádné předměty k uložení</div>
                ) : (
                    inventory.filter(i => !i.equipped).map(item => (
                    <div key={item.id} className="flex items-center justify-between py-1 text-xs border-b border-[#8b6f47]/20 last:border-0 hover:bg-white/5 px-1">
                        <span className="text-[#f5e6d3]">{item.name}</span>
                        <button 
                        onClick={() => handleDepositItem(item)}
                        className="px-2 py-0.5 bg-[#2a2a2a] border border-[#8b6f47] hover:border-[#ffd700] text-[#d4a574] rounded text-[10px] transition-colors"
                        >
                        Uložit
                        </button>
                    </div>
                    ))
                )}
              </div>
            </div>
          )}
          
          {(selectedAction === 'deposit' || selectedAction === 'withdraw' || selectedAction === 'invest') && (
            <div className="bg-black/60 rounded border border-[#8b6f47] p-3">
              {selectedAction === 'invest' ? (
                  <div className="mb-3 p-2 bg-[#ffd700]/10 border border-[#ffd700]/30 rounded text-xs text-[#d4a574] leading-relaxed">
                      Investiční fond Machaly garantuje <strong>5% zúročení</strong> každou noc strávenou v taverně.
                      Vaše peníze pracují, zatímco vy spíte!
                  </div>
              ) : null}

              <div className="mb-3 text-xs space-y-1">
                <div className="flex justify-between">
                  <span className="text-[#8b7355]">Tvé zlato:</span>
                  <span className="text-[#ffd700]">{gold}g</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#8b7355]">{selectedAction === 'invest' ? 'Investováno:' : 'V bance:'}</span>
                  <span className="text-[#ffd700]">{selectedAction === 'invest' ? bankInvestment : bankGold}g</span>
                </div>
              </div>
              
              <div className="mb-4">
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-[#8b7355]">Částka:</span>
                    <span className="text-[#ffd700]">{amount}g</span>
                  </div>
                  <input 
                    type="range"
                    min={0}
                    max={selectedAction === 'deposit' || selectedAction === 'invest' ? gold : (selectedAction === 'withdraw' ? bankGold : bankInvestment)}
                    value={amount}
                    onChange={(e) => setAmount(Number(e.target.value))}
                    className="w-full accent-[#ffd700] h-1.5 bg-[#8b6f47]/30 rounded-lg appearance-none cursor-pointer mb-2"
                  />
                  <input 
                    type="number" 
                    value={amount}
                    onChange={(e) => setAmount(Number(e.target.value))}
                    className="w-full px-2 py-1 bg-black/60 border border-[#8b6f47] rounded text-[#f5e6d3] text-sm focus:border-[#ffd700] outline-none"
                    placeholder="Kolik?"
                  />
              </div>

              <div className="flex gap-2">
                 {selectedAction === 'invest' ? (
                     <>
                        <button 
                            onClick={handleInvest}
                            disabled={amount <= 0 || amount > gold}
                            className="flex-1 px-3 py-2 bg-gradient-to-r from-[#8b6f47] to-[#6d5a3e] hover:from-[#a8865d] hover:to-[#a8865d] text-white rounded border border-[#ffd700] text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Investovat
                        </button>
                        <button 
                            onClick={handleDivest}
                            disabled={amount <= 0 || amount > bankInvestment}
                            className="flex-1 px-3 py-2 bg-black/60 hover:bg-black/40 text-[#ffd700] rounded border border-[#8b6f47] text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Vybrat
                        </button>
                     </>
                 ) : (
                    <button 
                        onClick={selectedAction === 'deposit' ? handleDepositGold : handleWithdrawGold}
                        disabled={amount <= 0}
                        className="w-full px-3 py-2 bg-gradient-to-r from-[#8b6f47] to-[#6d5a3e] hover:from-[#a8865d] hover:to-[#a8865d] text-white rounded border border-[#ffd700] text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {selectedAction === 'deposit' ? 'Vložit zlato' : 'Vybrat zlato'}
                    </button>
                 )}
              </div>
            </div>
          )}
      </GamePanel>
    </GameLayout>
  );
}
