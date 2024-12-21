import Action from './_components/Action'
import Info from './_components/Info'

export const dynamic = 'force-dynamic'

export default async function Page() {
  return (
    <section className={styles.page}>
      <Action />
      <Info />
    </section>
  )
}

const styles = {
  page: 'mx-[16rem] flex h-full w-full flex-col justify-start gap-4 p-4',
}
