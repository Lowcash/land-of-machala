import { ArrowLeft, Flame, Hammer, Sparkles, Zap } from 'lucide-react'
import { ActionBtn } from './ActionBtn'

interface WorkshopActionsProps {
  onBack: () => void
  onOpenCrafting: () => void
  onOpenEnchanting: () => void
  setInfoText: (text: string) => void
}

export function WorkshopActions({
  onBack,
  onOpenCrafting,
  onOpenEnchanting,
  setInfoText,
}: WorkshopActionsProps) {
  return (
    <div className="space-y-4">
      <div className="mb-6 rounded-lg border border-slate-700/30 bg-slate-800/40 p-6 backdrop-blur-sm">
        <div className="mb-4 flex items-start gap-4">
          <div className="rounded-lg border border-yellow-500/30 bg-yellow-600/20 p-3">
            <Hammer className="h-8 w-8 text-yellow-400" />
          </div>
          <div className="flex-1">
            <h2 className="mb-2 text-xl text-yellow-100">Craftsman's Workshop</h2>
            <p className="text-sm leading-relaxed text-slate-400">
              Welcome to the workshop! Here you can craft new items, enchant your equipment, and
              create powerful potions. Master crafters can create legendary weapons and armor.
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-3">
        <ActionBtn
          icon={Hammer}
          onClick={() => {
            setInfoText('Opening crafting station...')
            onOpenCrafting()
          }}
        >
          Crafting Station - Forge weapons, armor, and items
        </ActionBtn>

        <ActionBtn
          icon={Sparkles}
          onClick={() => {
            setInfoText('Approaching the enchanting altar...')
            onOpenEnchanting()
          }}
        >
          Enchanting Altar - Add magical properties to your equipment
        </ActionBtn>

        <ActionBtn
          icon={Flame}
          onClick={() => {
            setInfoText('The alchemy lab is still being prepared...')
          }}
        >
          Alchemy Lab - Brew potions and elixirs (Coming Soon)
        </ActionBtn>

        <ActionBtn
          icon={Zap}
          onClick={() => {
            setInfoText('Coming soon: Equipment upgrades!')
          }}
        >
          Upgrade Station - Improve existing equipment (Coming Soon)
        </ActionBtn>
      </div>

      <div className="border-t border-slate-700/30 pt-4">
        <ActionBtn icon={ArrowLeft} onClick={onBack}>
          Back to Town
        </ActionBtn>
      </div>
    </div>
  )
}
