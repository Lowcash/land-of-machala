import { cn } from '@/lib/utils'

export const Main = (p: React.HTMLAttributes<HTMLElement> & { layout: 'center' | 'spaced' }) => (
  <main
    {...p}
    className={cn(
      'container mx-auto flex w-screen flex-col items-center justify-center gap-4 overflow-hidden p-2',
      p.layout === 'center' ? 'justify-center' : 'justify-between',
      p.layout === 'center' ? 'h-screen' : 'h-[calc(100vh-80px-64px)]', // TODO just temporary - simulates diff between landing a game layout
      p.className,
    )}
  />
)

export const List = (p: React.HTMLAttributes<HTMLUListElement>) => (
  <ul {...p} className={cn('list-disc pl-4', p.className)} />
)

export const Card = (p: React.HTMLAttributes<HTMLDivElement>) => (
  <div {...p} className={cn('flex flex-col rounded-md border-2 bg-custom-gold-1 p-2 shadow-side', p.className)} />
)

Card.Inner = (p: React.HTMLAttributes<HTMLDivElement>) => (
  <div {...p} className={cn('flex flex-col gap-1', p.className)} />
)
