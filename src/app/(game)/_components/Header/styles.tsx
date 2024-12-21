export const OuterWrap = (p: React.HTMLAttributes<HTMLElement>) => (
  <header {...p} className='z-40 h-9 w-screen bg-custom-yellow-2' />
)

export const InnerWrap = (p: React.HTMLAttributes<HTMLDivElement>) => (
  <div {...p} className='ml-auto w-fit gap-2' />
)
