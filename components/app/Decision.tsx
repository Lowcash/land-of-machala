import { memo } from 'react'
import { Card, List } from '@/styles/common'
import { Link } from '@/styles/typography'

export type DecisionSelectedEvent = (decision?: DecisionItem) => void

export type DecisionItem = { key: string; text?: string }

interface Props {
  top?: DecisionItem[]
  bottom?: DecisionItem[]

  onDecisionSelected?: DecisionSelectedEvent
}

export const Decision = memo(function Decision(p: Props) {
  return (
    <Card className='h-fit w-fit justify-between gap-8'>
      {(p.top?.length ?? 0) > 0 && (
        <List>
          {p.top?.map((x) => (
            <li key={x.key}>
              <Link onClick={() => p.onDecisionSelected?.(x)}>{x.text}</Link>
            </li>
          ))}
        </List>
      )}
      {(p.bottom?.length ?? 0) > 0 && (
        <List>
          {p.bottom?.map((x) => (
            <li key={x.key}>
              <Link onClick={() => p.onDecisionSelected?.(x)}>{x.text}</Link>
            </li>
          ))}
        </List>
      )}
    </Card>
  )
})
