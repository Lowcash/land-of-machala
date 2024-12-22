import { Card } from '@/styles/common-server'

const InnerAction = (p: React.HTMLAttributes<HTMLDivElement>) => <div {...p} className='flex justify-between' />

export const Action = (p: React.PropsWithChildren) => (
  <Card>
    <InnerAction>{p.children}</InnerAction>
  </Card>
)
