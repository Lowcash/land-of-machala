'use client'

import { useEffect } from 'react'

import { AlertCircle } from 'lucide-react'
import { useTranslations } from 'next-intl'

import { Button } from '@/components/ui/core/button'
import { Card } from '@/components/ui/core/card'
import { RefreshIcon } from '@/components/ui/icons'
import { StatusIcon } from '@/components/ui/prefabs/game/status-icon'
import { BrandedHero } from '@/components/ui/prefabs/layout/branded-hero'
import { MutedText } from '@/components/ui/prefabs/typography/shared'

/**
 * Global Error Boundary.
 * Strictly uses the 'Common' translation namespace to prevent asset/lore leakage.
 */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  const t = useTranslations('Common')

  useEffect(() => {
    // Report to error logging service if available
    console.error('Application Error:', error)
  }, [error])

  return (
    <Card.Root variant="primary" p="xl" gap="lg" align="center">
      <BrandedHero
        title={t('error')}
        description={t('error_description')}
        logo={<StatusIcon icon={AlertCircle} variant="danger" />}
      />

      {error.digest && (
        <MutedText align="center">{t('error_digest', { digest: error.digest })}</MutedText>
      )}

      <Card.Footer fullWidth justify="center">
        <Button variant="primary" onClick={() => reset()} icon={<RefreshIcon />}>
          {t('try_again')}
        </Button>
      </Card.Footer>
    </Card.Root>
  )
}
