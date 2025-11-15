import { Card } from '@/styles/common'
import { Text } from '@/styles/typography'

interface Props {
  headers?: string[]
  descriptions?: string[]
}

export default function Info(p: Props) {
  return (
    <Card className='flex flex-col'>
      {p.headers?.map((x, idx) => <Text key={`InfoHeader_${idx}`} dangerouslySetInnerHTML={{ __html: x }} />)}
      {p.descriptions?.map((x, idx) => (
        <Text key={`InfoDescription_${idx}`} dangerouslySetInnerHTML={{ __html: x }} size='small' italic />
      ))}
    </Card>
  )
}
