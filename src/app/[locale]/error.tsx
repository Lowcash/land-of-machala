'use client'

import { useEffect } from 'react'

import { AlertCircle, RefreshCcw } from 'lucide-react'
import { useTranslations } from 'next-intl'

import { Button } from '@/components/ui/core/button'
import { Card } from '@/components/ui/core/card'
import { VStack } from '@/components/ui/core/stack'
import { Text as CoreText } from '@/components/ui/core/typography'
import { BrandedHero } from '@/components/ui/prefabs/branded-hero'
import { StatusIcon } from '@/components/ui/prefabs/status-icon'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  const t = useTranslations('Common')

  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <VStack minHeight="dvh" fullWidth justify="center" align="center" p="md">
      <Card.Root variant="primary" p="xl" gap="lg" align="center">
        <BrandedHero
          title={t('error')}
          description={t('error_description')}
          logo={<StatusIcon icon={AlertCircle} variant="danger" />}
        />

        {error.digest && (
          <VStack fullWidth align="center" p="xs">
            <CoreText variant="small" color="secondary" className="font-mono opacity-50">
              Digest: {error.digest}
            </CoreText>
          </VStack>
        )}

        <Card.Footer fullWidth justify="center">
          <Button
            variant="primary"
            onClick={() => reset()}
            icon={<RefreshCcw className="h-4 w-4" />}
          >
            {t('try_again')}
          </Button>
        </Card.Footer>
      </Card.Root>
    </VStack>
  )
}
