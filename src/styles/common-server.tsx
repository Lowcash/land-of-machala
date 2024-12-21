import { cn } from '@/lib/utils'

export const Main = (p: React.HTMLAttributes<HTMLElement>) => (
  <main {...p} className={cn('flex flex-1 items-center justify-center', p.className)} />
)

export const Card = (p: React.HTMLAttributes<HTMLDivElement>) => (
  <div {...p} className={cn('rounded-md border-2 p-4 shadow-side', p.className)} />
)

export const List = (p: React.HTMLAttributes<HTMLUListElement>) => (
  <ul {...p} className={cn('list-disc pl-4', p.className)} />
)
