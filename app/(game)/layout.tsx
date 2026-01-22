import { GameLayout as Layout } from '@/components/layout/GameLayout'

export default function GameLayout({ children }: { children: React.ReactNode }) {
  return <Layout>{children}</Layout>
}
