import { cn } from '@/lib/utils'

export const Main = (p: React.HTMLAttributes<HTMLElement> & { layout: 'center' | 'spaced' }) => (
  <main
    {...p}
    className={cn(
      'container mx-auto flex w-screen flex-col items-center justify-center gap-2 overflow-hidden px-2 pb-24 pt-14 sm:gap-4',
      p.layout === 'center' ? 'justify-center' : 'justify-between',
      p.layout === 'center' ? 'h-screen' : 'h-[calc(100vh-48px)]', // TODO just temporary - simulates diff between landing a game layout and header
      p.className,
    )}
  />
)

export const Header = ({ children }: React.PropsWithChildren) => (
  <header className='fixed top-0 flex h-12 w-full items-center bg-custom-yellow-2 p-2'>
    <div className='container mx-auto flex items-center justify-between'>{children}</div>
  </header>
)

export const Footer = ({ children }: React.PropsWithChildren) => (
  <footer className='fixed bottom-0 h-44 w-full bg-custom-yellow-2'>
    <div className='container mx-auto grid h-full grid-cols-12 grid-rows-3 items-center justify-center p-2'>
      {children}
    </div>
  </footer>
)

export const Hero = (p: React.HTMLAttributes<HTMLElement>) => (
  <section {...p} className={cn('container mx-auto flex w-full items-start justify-between gap-2', p.className)} />
)

export const Detail = (p: React.HTMLAttributes<HTMLElement>) => (
  <section
    {...p}
    className={cn('items-startgap-2 container mx-auto flex w-full flex-1 flex-col gap-2 sm:gap-4', p.className)}
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
