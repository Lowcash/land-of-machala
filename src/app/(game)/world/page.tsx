import Action from './_components/Action'
import Info from './_components/Info'

export const dynamic = 'force-dynamic'

export default async function Page() {
  return (
    <div className={styles.page}>
      <Action />
      <Info />
    </div>
  )
}

const styles = {
  page: 'flex h-full flex-col justify-start gap-4 p-4',
}
