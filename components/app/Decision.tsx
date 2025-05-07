import { Card, List } from '@/styles/common'
import { Link } from '@/styles/typography'

export type DecisionSelectedEvent = (decision?: DecisionItem) => void

export type DecisionItem = { key: string; text?: string }

interface Props {
  return?: DecisionItem
  decisions?: DecisionItem[]

  onDecisionSelected?: DecisionSelectedEvent
}

export default function Decision(p: Props) {
  return (
    <Card className='h-fit w-fit justify-between gap-8'>
      {p.return && (
        <List>
          <li>
            <Link onClick={() => p.onDecisionSelected?.(p.return)}>{p.return.text}</Link>
          </li>
        </List>
      )}
      {p.decisions && (
        <List>
          {p.decisions.map((x) => (
            <li key={x.key}>
              <Link onClick={() => p.onDecisionSelected?.(x)}>{x.text}</Link>
            </li>
          ))}
        </List>
      )}
    </Card>
  )
}
