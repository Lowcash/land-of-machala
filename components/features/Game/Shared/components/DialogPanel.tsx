import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

interface DialogOption {
  id: string | number
  text: string
  action: () => void
  disabled?: boolean
  variant?: 'default' | 'primary' | 'secondary' | 'ghost'
}

interface DialogPanelProps {
  npcName: string
  npcAvatarSrc?: string
  dialogText: string
  options: DialogOption[]
}

export function DialogPanel({ npcName, npcAvatarSrc, dialogText, options }: DialogPanelProps) {
  return (
    <div className="flex flex-col gap-4">
      {/* NPC Message Bubble */}
      <div className="flex gap-3">
        <Avatar className="h-10 w-10 border border-[#8b6f47]">
          {npcAvatarSrc && <AvatarImage src={npcAvatarSrc} alt={npcName} />}
          <AvatarFallback className="bg-[#1a1510] text-[#8b7355]">
            {npcName.slice(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1 rounded-r-lg rounded-bl-lg border border-[#8b6f47]/30 bg-[#1a1510] p-3">
          <div className="mb-1 text-xs font-bold text-[#d4a574]">{npcName}</div>
          <p className="text-sm text-[#f5e6d3] italic">&quot;{dialogText}&quot;</p>
        </div>
      </div>

      {/* Response Options */}
      <Card className="space-y-2 border-[#8b6f47]/30 bg-black/40 p-3">
        <div className="mb-2 text-xs font-bold tracking-wider text-[#8b7355] uppercase">
          Tvoje odpověď
        </div>
        <div className="flex flex-col gap-2">
          {options.map((opt) => (
            <Button
              key={opt.id}
              variant={opt.variant === 'primary' ? 'game-primary' : 'game-secondary'}
              onClick={opt.action}
              disabled={opt.disabled}
              className="h-auto w-full justify-start py-2 text-left whitespace-normal"
            >
              <span className="mr-2 text-[#d4a574]">-</span> {opt.text}
            </Button>
          ))}
        </div>
      </Card>
    </div>
  )
}
