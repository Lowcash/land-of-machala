'use client'

import { useEffect } from 'react'
import { AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    // Log error to console (prepare for Sentry)
    console.error('Root error boundary:', error)
  }, [error])

  return (
    <div className='flex min-h-screen flex-col items-center justify-center gap-4 p-8'>
      <div className='flex items-center gap-2 text-destructive'>
        <AlertCircle className='h-10 w-10' />
        <h1 className='text-3xl font-bold'>Aplikace narazila na chybu</h1>
      </div>

      <p className='max-w-md text-center text-lg text-muted-foreground'>
        Omlouváme se za nepříjemnosti. Zkuste prosím obnovit stránku.
      </p>

      {process.env.NODE_ENV === 'development' && (
        <details className='max-w-2xl rounded border p-4 text-sm'>
          <summary className='cursor-pointer font-semibold'>Technické detaily (development only)</summary>
          <div className='mt-2 space-y-2'>
            <p>
              <strong>Error:</strong> {error.message}
            </p>
            {error.digest && (
              <p>
                <strong>Digest:</strong> {error.digest}
              </p>
            )}
            <pre className='overflow-auto text-xs'>{error.stack}</pre>
          </div>
        </details>
      )}

      <div className='flex gap-2'>
        <Button onClick={() => reset()} size='lg' variant='warning'>
          Zkusit znovu
        </Button>
        <Button onClick={() => (window.location.href = '/')} size='lg' variant='default'>
          Zpět na hlavní stránku
        </Button>
      </div>
    </div>
  )
}
