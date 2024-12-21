import { H3 } from '@/styles/text-server'

export const Content = (p: React.HTMLAttributes<HTMLDivElement>) => <div {...p} className='flex flex-col gap-4' />

export const SectionHeader = (p: React.HTMLAttributes<HTMLHeadingElement>) => (
  <H3 {...p} className='rounded-md bg-black/[0.1] p-2 text-gray-900' />
)

export const SectionItemsWrap = (p: React.HTMLAttributes<HTMLDivElement>) => (
  <div {...p} className='ml-4 flex min-h-8 flex-col justify-center border-l-2 border-black/10 pl-2' />
)
