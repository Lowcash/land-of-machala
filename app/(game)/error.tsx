'use client'

import { useEffect } from 'react'

import { AlertTriangle } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { HStack, VStack } from '@/components/ui/stack'
import { P, Span } from '@/components/ui/typography'

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
    <VStack fullHeight align="center" justify="center" p="md" bg="black" backdrop>
      <VStack maxW="2xl" fullWidth>
        <Card variant="danger" textured>
          <Card.Header>
            <VStack align="center" gap="md" fullWidth>
              <AlertTriangle className="text-game-gold h-12 w-12 animate-pulse" />
              <Card.Title color="danger">Magická anomálie</Card.Title>
            </VStack>
          </Card.Header>
          <Card.Content>
            <VStack align="center" gap="md" fullWidth>
              <P color="copper" align="center">
                Něco se pokazilo v tkanivu reality. Vaše poslední akce nemohla být dokončena.
              </P>
              <VStack fullWidth rounded="md" border="danger" bg="black-40" p="sm" align="center">
                <Span font="mono" color="danger">
                  {error.message || 'Neznámá chyba'}
                </Span>
              </VStack>
            </VStack>
          </Card.Content>
          <Card.Footer>
            <HStack justify="center" fullWidth>
              <Button variant="primary" onClick={() => reset()} label="Zkusit znovu" />
            </HStack>
          </Card.Footer>
        </Card>
      </VStack>
    </VStack>
  )
}
