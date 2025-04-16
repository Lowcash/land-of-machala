import { Card } from '@/styles/common'

const InnerAction = (p: React.HTMLAttributes<HTMLDivElement>) => <div {...p} className='flex justify-between' />

export const Action = (p: React.PropsWithChildren) => (
  <Card>
    <InnerAction>{p.children}</InnerAction>
  </Card>
)
