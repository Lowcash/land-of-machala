import { cn } from '@/lib/utils'

import { Text } from '@/styles/text-server'
import { Root, Indicator } from '@radix-ui/react-progress'

export const ProgressRoot = (p: React.PropsWithChildren & Pick<React.ComponentProps<typeof Root>, 'value' | 'max'>) => (
  <Root {...p} className='relative h-6 w-full overflow-hidden rounded-full border border-black/10 bg-custom-gold-1' />
)

const VARIANT = {
  red: 'bg-red-800',
  green: 'bg-green-800',
  blue: 'bg-blue-800',
  gold: 'bg-custom-gold-2',
}

export type Variant = keyof typeof VARIANT

export interface IndicatorProps {
  variant: Variant
}

export const ProgressIndicator = ({
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

export const ProgressText = (p: React.PropsWithChildren) => (
  <Text className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform rounded-sm bg-white/45 px-1 shadow-sm'>
    <div className='mt-[3px]'>{p.children}</div>
  </Text>
)
