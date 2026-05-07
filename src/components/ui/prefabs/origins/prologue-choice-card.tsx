import clsx from 'clsx'

import { Inline, Stack } from '@/components/ui/core/layout'
import { BodyText, DisplayValue } from '@/components/ui/core/typography'

type PrologueChoiceCardProps = {
  description: string
  isActive: boolean
  optionLabel: string
  title: string
  onSelect: () => void
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
          ? 'border-primary bg-primary/10 shadow-[0_0_0_1px_rgba(255,205,107,0.22)]'
          : 'border-outline-variant/40 bg-surface-container-low/60 hover:border-primary/40 hover:bg-surface-container/70'
      )}
      onClick={onSelect}
      type="button"
    >
      <Inline align="start" fullWidth>
        <div className="shrink-0">
          <DisplayValue tone="primary">{optionLabel}</DisplayValue>
        </div>
        <div className="flex-1">
          <Stack>
            <DisplayValue>{title}</DisplayValue>
            <BodyText tone="muted">{description}</BodyText>
          </Stack>
        </div>
      </Inline>
    </button>
  )
}
