import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { NpcSpeechBubble } from '@/components/ui/display'
import { HStack, VStack } from '@/components/ui/stack'
import { Label } from '@/components/ui/typography'

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
    <VStack gap="md">
      {/* NPC Message Bubble */}
      <HStack gap="sm" align="start">
        <Avatar>
          {npcAvatarSrc && <AvatarImage src={npcAvatarSrc} alt={npcName} />}
          <AvatarFallback variant="muted">{npcName.slice(0, 2).toUpperCase()}</AvatarFallback>
        </Avatar>
        <NpcSpeechBubble name={npcName} text={dialogText} />
      </HStack>

      {/* Response Options */}
      <Card variant="muted">
        <Card.Content>
          <VStack gap="md">
            <Label color="muted" uppercase bold>
              Tvoje odpověď
            </Label>
            <VStack gap="sm">
              {options.map((opt) => (
                <Button
                  key={opt.id}
                  variant={opt.variant === 'primary' ? 'primary' : 'choice'}
                  onClick={opt.action}
                  disabled={opt.disabled}
                  label={opt.text}
                  icon={undefined}
                />
              ))}
            </VStack>
          </VStack>
        </Card.Content>
      </Card>
    </VStack>
  )
}
