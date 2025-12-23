import { ArrowLeft, Flame, Hammer, Sparkles, Zap } from 'lucide-react'
import { ActionBtn } from './ActionBtn'
import { GameLayout, GamePanel } from './GameLayout'

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
    <GameLayout>
      <GamePanel title="Workshop Services">
        <div className="space-y-4">
          <div className="mb-2 flex items-center justify-between rounded border border-yellow-500/30 bg-black/40 p-2">
            <ActionBtn icon={ArrowLeft} onClick={onBack}>
              Back to Town
            </ActionBtn>
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
        </div>
      </GamePanel>

      <GamePanel title="Craftsman's Workshop">
        <div className="flex gap-3 rounded border border-yellow-500/30 bg-black/60 p-3 text-xs leading-relaxed text-yellow-100">
          <div className="flex h-[40px] min-w-[40px] items-center justify-center rounded-full border border-yellow-500/30 bg-yellow-600/20">
            <Hammer className="h-5 w-5 text-yellow-400" />
          </div>
          <div>
            Welcome to the workshop! Here you can craft new items, enchant your equipment, and
            create powerful potions. Master crafters can create legendary weapons and armor.
          </div>
        </div>
      </GamePanel>
    </GameLayout>
  )
}
