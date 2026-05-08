import clsx from 'clsx'

import { Box } from '@/components/ui/core/box'
import { Inline, Stack } from '@/components/ui/core/layout'
import { BodyText, DisplayValue } from '@/components/ui/core/typography'

type PrologueChoiceCardProps = {
  description: string
  isActive: boolean
  onSelect: () => void
  optionLabel: string
  title: string
}

const PROLOGUE_CHOICE_CARD_CLASS = 'flex w-full cursor-pointer items-start transition'

export function PrologueChoiceCard({
  description,
  isActive,
  onSelect,
  optionLabel,
  title,
}: PrologueChoiceCardProps) {
  return (
    <button
      className={clsx(
        PROLOGUE_CHOICE_CARD_CLASS,
        isActive
          ? 'border-primary bg-primary/10 shadow-(--shadow-ring-primary)'
          : 'border-outline-variant/40 bg-surface-container-low/60 hover:border-primary/40 hover:bg-surface-container/70'
      )}
      onClick={onSelect}
      type="button"
    >
      <Inline align="start" fullWidth>
        <Box shrink={false}>
          <DisplayValue tone="primary">{optionLabel}</DisplayValue>
        </Box>
        <Box grow>
          <Stack>
            <DisplayValue>{title}</DisplayValue>
            <BodyText tone="muted">{description}</BodyText>
          </Stack>
        </Box>
      </Inline>
    </button>
  )
}
