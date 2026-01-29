'use client'

import { useEffect } from 'react'

import { AlertTriangle } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <div className="flex h-[calc(100vh-4rem)] items-center justify-center p-4">
      <Card variant="game" className="w-full max-w-md border-red-900/50 bg-black/80">
        <CardHeader className="text-center">
          <div className="flex justify-center pb-4">
            <AlertTriangle className="text-game-gold h-12 w-12" />
          </div>
          <CardTitle className="text-red-500">Magická anomálie</CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <p className="text-game-copper-muted mb-4">
            Něco se pokazilo v tkanivu reality. Vaše poslední akce nemohla být dokončena.
          </p>
          <p className="rounded border border-red-900/30 bg-black/50 p-2 font-mono text-xs text-red-400">
            {error.message || 'Neznámá chyba'}
          </p>
        </CardContent>
        <CardFooter className="justify-center">
          <Button variant="game-primary" onClick={() => reset()}>
            Zkusit znovu
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
