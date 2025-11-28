import { cn } from '@/lib/utils'

const MainComponent = (p: React.HTMLAttributes<HTMLElement> & { layout: 'center' | 'spaced' }) => (
  <>
    <aside className='fixed top-12 -z-50 h-[calc(100vh-48px-176px)] w-screen bg-cover bg-center bg-no-repeat' />
    <main
      {...p}
      className={cn(
        'container mx-auto flex h-screen w-screen flex-col items-center justify-center gap-2 overflow-hidden px-2 pt-[56px] pb-[184px] sm:gap-4',
        p.layout === 'center' ? 'justify-center' : 'justify-between',
        p.className,
      )}
    />
  </>
)
MainComponent.displayName = 'Main'
export const Main = MainComponent

export const Header = ({ children }: React.PropsWithChildren) => (
  <header className='bg-custom-yellow-2 fixed top-0 flex h-12 w-full items-center p-2'>
    <div className='container mx-auto flex items-center justify-between'>{children}</div>
  </header>
)

export const Footer = ({ children }: React.HTMLAttributes<HTMLElement>) => (
  <footer className='bg-custom-yellow-2 fixed bottom-0 h-44 w-full'>
    <div className='container mx-auto flex h-full w-[23rem] items-center justify-between gap-4 p-2 sm:w-[30rem]'>
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
  <div {...p} className={cn('bg-custom-gold-1 shadow-side flex flex-col rounded-md border-2 p-2', p.className)} />
)

const CardInner = (p: React.HTMLAttributes<HTMLDivElement>) => (
  <div {...p} className={cn('flex flex-col gap-1', p.className)} />
)
CardInner.displayName = 'Card.Inner'
Card.Inner = CardInner
