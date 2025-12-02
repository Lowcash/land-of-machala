'use client'

import { useEffect } from 'react'
import { AlertCircle, Home, RefreshCw } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function GameError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error('Game error:', error)
  }, [error])

  return (
    <div className='flex min-h-[600px] flex-col items-center justify-center gap-4 p-8'>
      <div className='text-destructive flex items-center gap-2'>
        <AlertCircle className='h-8 w-8' />
        <h2 className='text-2xl font-bold'>Herní chyba</h2>
      </div>

      <p className='text-muted-foreground max-w-md text-center'>
        Ve hře se vyskytla chyba. Zkuste obnovit hru nebo se vrátit na hlavní stránku.
      </p>

      {process.env.NODE_ENV === 'development' && (
        <details className='max-w-2xl rounded border p-4 text-sm'>
          <summary className='cursor-pointer font-semibold'>Debug info</summary>
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
        <Button onClick={() => reset()} variant='warning'>
          <RefreshCw className='mr-2 h-4 w-4' />
          Obnovit hru
        </Button>
        <Button onClick={() => (window.location.href = '/')} variant='default'>
          <Home className='mr-2 h-4 w-4' />
          Hlavní stránka
        </Button>
      </div>
    </div>
  )
}
