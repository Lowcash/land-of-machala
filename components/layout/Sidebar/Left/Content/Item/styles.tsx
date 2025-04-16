import { cn } from '@/lib/utils'

export const Item = (p: React.HTMLAttributes<HTMLDivElement>) => (
  <div {...p} className={cn(p.className, 'inline-flex h-8 w-full items-center justify-between')} />
)
