import { type ComponentProps } from 'react'

import type { LucideIcon } from 'lucide-react'

import { Input } from '@/components/ui/input'
import { HStack, VStack } from '@/components/ui/stack'
import { DangerText, Label } from '@/components/ui/typography'

interface AuthInputProps extends ComponentProps<'input'> {
  id: string
  label: string
  icon: LucideIcon
  error?: string
  ref?: React.Ref<HTMLInputElement>
}

export function AuthInput({ id, label, icon: Icon, error, ref, ...props }: AuthInputProps) {
  return (
    <VStack fullWidth gap="xs">
      <HStack justify="between" align="center" fullWidth>
        <Label htmlFor={id} font="fantasy" color="gold-muted">
          {label}
        </Label>
        {error && <DangerText variant="caption">{error}</DangerText>}
      </HStack>
      <VStack position="relative" fullWidth _internalClassName="group">
        <VStack
          position="absolute"
          top="0"
          left="0"
          h="full"
          px="md"
          align="center"
          justify="center"
          interactive="none"
          _internalClassName="text-game-copper-muted transition-colors group-focus-within:text-game-gold"
        >
          <Icon className="h-4 w-4" />
        </VStack>
        <Input id={id} ref={ref} variant="game" inputSize="md" hasIcon error={!!error} {...props} />
      </VStack>
    </VStack>
  )
}
