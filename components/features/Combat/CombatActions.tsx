import { ArrowLeft, Shield, Sparkles, Target, Zap } from 'lucide-react'

import { Button } from '@/components/ui/button'

interface CombatActionsProps {
  onAction: (action: 'attack' | 'defend' | 'special' | 'flee') => void
  isPending: boolean
}

export function CombatActions({ onAction, isPending }: CombatActionsProps) {
  return (
    <div className="space-y-4">
      <div className="space-y-1">
        <div className="text-game-gold mb-1 text-xs font-bold tracking-wider uppercase">Útok</div>
        <div className="space-y-2">
          <Button
            onClick={() => onAction('attack')}
            variant="game-primary"
            disabled={isPending}
            className="w-full justify-between"
          >
            <div className="flex items-center gap-2">
              <Zap className="h-4 w-4" />
              <span>Rychlý útok</span>
            </div>
            <span className="text-[10px] opacity-70">Základní</span>
          </Button>
          <Button
            onClick={() => onAction('attack')}
            variant="game-danger"
            disabled={isPending}
            className="w-full justify-between"
          >
            <div className="flex items-center gap-2">
              <Target className="h-4 w-4" />
              <span>Silný úder</span>
            </div>
            <span className="text-[10px]">Vysoké poškození</span>
          </Button>
          <Button
            onClick={() => onAction('special')}
            variant="game-secondary"
            disabled={isPending}
            className="border-game-magic text-game-magic hover:bg-game-magic/10 w-full justify-between"
          >
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4" />
              <span>Speciální schopnost</span>
            </div>
            <span className="text-[10px] opacity-70">-Mana</span>
          </Button>
        </div>
      </div>

      <div className="space-y-1">
        <div className="mb-1 text-xs font-bold tracking-wider text-[#8b7355] uppercase">
          Obrana & Taktika
        </div>
        <div className="space-y-2">
          <Button
            onClick={() => onAction('defend')}
            variant="game-secondary"
            disabled={isPending}
            className="w-full gap-2"
          >
            <Shield className="h-4 w-4" />
            <span>Obrana</span> <span className="ml-2 text-xs opacity-70">(Sníží poškození)</span>
          </Button>
          <Button
            onClick={() => onAction('flee')}
            variant="ghost"
            disabled={isPending}
            className="w-full gap-2 text-[#8b7355] hover:text-[#d4a574]"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Útěk</span>
          </Button>
        </div>
      </div>
    </div>
  )
}
