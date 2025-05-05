import { cn } from '@/lib/utils'
import { clamp } from '@/lib/utils'

import { Text } from '@/styles/typography'
import { Root, Indicator } from '@radix-ui/react-progress'

const MIN_PERCENT = 0
const MAX_PERCENT = 100

interface Props extends IndicatorProps {
  value: number
  max: number
}

export default function Progress(p: React.PropsWithChildren<Props>) {
  const valueInRange = clamp(p.value, MIN_PERCENT, MAX_PERCENT)
  const maxInRange = clamp(p.max, MIN_PERCENT, MAX_PERCENT)

  const indicatorValue = MAX_PERCENT - (valueInRange / maxInRange) * MAX_PERCENT

  return (
    <Progress.Root {...p} value={valueInRange} max={maxInRange}>
      <Progress.Indicator variant={p.variant} style={{ transform: `translateX(-${indicatorValue}%)` }} />
      {p.children && <Progress.Text>{p.children}</Progress.Text>}
    </Progress.Root>
  )
}

Progress.Root = (p: React.PropsWithChildren & Pick<React.ComponentProps<typeof Root>, 'value' | 'max'>) => (
  <Root {...p} className='relative h-4 w-full overflow-hidden rounded-sm border border-black/10 bg-custom-gold-1' />
)

const VARIANT = {
  red: 'bg-red-800',
  green: 'bg-green-800',
  blue: 'bg-blue-800',
  gold: 'bg-custom-gold-2',
}

type Variant = keyof typeof VARIANT

interface IndicatorProps {
  variant: Variant
}

Progress.Indicator = ({
  variant = 'gold',
  ...p
}: React.PropsWithChildren<IndicatorProps> & { style?: React.CSSProperties }) => (
  <Indicator
    {...p}
    className={cn(
      'h-full w-full flex-1 transition-all [&>*]:absolute [&>*]:left-1/2 [&>*]:top-1/2 [&>*]:-translate-x-1/2 [&>*]:-translate-y-1/2 [&>*]:transform',
      VARIANT[variant],
    )}
  />
)

Progress.Text = (p: React.PropsWithChildren) => (
  <Text className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform whitespace-nowrap rounded-sm bg-white/45 px-1 text-sm shadow-sm'>
    <div className='mt-[3px]'>{p.children}</div>
  </Text>
)
