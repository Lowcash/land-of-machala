import * as React from 'react'

import { Text } from '@/components/ui/core/typography'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="w-full border-t border-(--color-secondary)/20 py-6 text-center">
      <Text variant="small" className="text-(--color-secondary)/60">
        Verze 2.0 • © {year} Land of Machala
      </Text>
    </footer>
  )
}
