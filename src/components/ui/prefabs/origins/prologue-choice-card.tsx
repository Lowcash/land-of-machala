import { BodyText, DisplayValue, IconLabel } from '@/components/ui/core/typography'

type PrologueChoiceCardProps = {
  description: string
  isActive: boolean
  optionLabel: string
  title: string
  onSelect: () => void
}

export function PrologueChoiceCard({
  description,
  isActive,
  onSelect,
  optionLabel,
  title,
}: PrologueChoiceCardProps) {
  return (
    <button
      className={[
        'flex w-full cursor-pointer items-start gap-3 rounded-2xl border p-3 text-left transition md:gap-4 md:p-3.5',
        isActive
          ? 'border-primary bg-primary/10 shadow-[0_0_0_1px_rgba(255,205,107,0.22)]'
          : 'border-outline-variant/40 bg-surface-container-low/60 hover:border-primary/40 hover:bg-surface-container/70',
      ].join(' ')}
      onClick={onSelect}
      type="button"
    >
      <IconLabel
        align="start"
        icon={
          <DisplayValue size="lg" tone="primary">
            {optionLabel}
          </DisplayValue>
        }
        width="full"
      >
        <span className="space-y-0.5">
          <DisplayValue size="lg">{title}</DisplayValue>
          <BodyText size="sm" tone="muted">
            {description}
          </BodyText>
        </span>
      </IconLabel>
    </button>
  )
}
