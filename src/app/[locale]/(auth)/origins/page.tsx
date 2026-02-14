import type { Metadata } from 'next'

import { OriginsView } from '@/components/features/auth/origins/view'

export const metadata: Metadata = {
  title: 'Vítej v Machale | Origins',
  description: 'Tvá legenda začíná právě teď.',
}

export default function OriginsPage() {
  return <OriginsView />
}
