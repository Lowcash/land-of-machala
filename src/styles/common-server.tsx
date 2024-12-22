import { cn } from '@/lib/utils'

export const Main = (p: React.HTMLAttributes<HTMLElement>) => (
  <main {...p} className={cn('flex flex-1 items-center justify-center overflow-hidden', p.className)} />
)

export const Content = (p: React.HTMLAttributes<HTMLElement>) => (
  <section {...p} className={cn('mx-[16rem] flex h-full w-full flex-col justify-start gap-4 p-4', p.className)} />
)

export const List = (p: React.HTMLAttributes<HTMLUListElement>) => (
  <ul {...p} className={cn('list-disc pl-4', p.className)} />
)

export const Card = (p: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    {...p}
    className={cn(
      'flex flex-col gap-4 overflow-hidden rounded-md border-2 bg-custom-gold-1 p-4 shadow-side',
      p.className,
    )}
  />
)

Card.Inner = (p: React.HTMLAttributes<HTMLDivElement>) => <div {...p} className='flex flex-col gap-1 overflow-hidden' />
