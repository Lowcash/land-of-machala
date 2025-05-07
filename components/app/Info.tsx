import { Card } from '@/styles/common'
import { Text } from '@/styles/typography'

interface Props {
  header?: string
  description?: string[]
}

export default function Info(p: Props) {
  return (
    <Card className='flex flex-col'>
      {p.header && <Text dangerouslySetInnerHTML={{ __html: p.header }} />}
      {p.description?.map((x, idx) => (
        <Text key={`InfoDescription_${idx}`} dangerouslySetInnerHTML={{ __html: x }} size='small' italic />
      ))}
    </Card>
  )
}
