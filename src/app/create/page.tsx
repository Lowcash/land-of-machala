import Form from '@/app/create/_form'
import { Card } from '@/styles/common-server'

export default function Page() {
  return (
    <Card className={styles.card}>
      <Form />
    </Card>
  )
}

const styles = {
  card: 'w-64 m-auto',
}
