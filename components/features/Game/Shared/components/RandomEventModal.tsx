'use client'

import { Sparkles } from 'lucide-react'

import type { RandomEvent } from '@/types/events'

import { getEventTypeColor, getEventTypeIconColor } from '@/lib/game/views'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Modal } from '@/components/ui/modal'
import { HStack, VStack } from '@/components/ui/stack'
import { Caption, H2, P, Span } from '@/components/ui/typography'

interface RandomEventModalProps {
  event: RandomEvent | null
  onChoice: (choiceId: number) => void
  onClose: () => void
}

export function RandomEventModal({ event, onChoice, onClose }: RandomEventModalProps) {
  if (!event) return null

  const typeColor = getEventTypeColor(event.type)
  const typeIconColor = getEventTypeIconColor(event.type)
  const EventIcon = Sparkles

  const handleConfirm = () => {
    onChoice(1)
    onClose()
  }

  return (
    <Modal isOpen={!!event} onClose={onClose}>
      <Modal.Content variant="dialog">
        <VStack _internalClassName={typeColor}>
          <Modal.Header>
            <HStack align="center" gap="md" fullWidth>
              <HStack
                rounded="lg"
                border="default"
                p="xs"
                _internalClassName="bg-slate-800/60 border-slate-700/50"
              >
                <VStack _internalClassName={typeIconColor}>
                  <EventIcon className="h-6 w-6" />
                </VStack>
              </HStack>
              <VStack gap="none" fullWidth>
                <HStack align="center" gap="sm" justify="between" fullWidth>
                  <H2>{event.title}</H2>
                  <HStack rounded="sm" px="sm" _internalClassName={typeColor}>
                    <Span bold uppercase variant="caption">
                      {event.type}
                    </Span>
                  </HStack>
                </HStack>
                <Caption color="muted" italic>
                  Náhodné setkání...
                </Caption>
              </VStack>
            </HStack>
          </Modal.Header>
        </VStack>

        <Modal.Body>
          <VStack gap="lg" align="center" fullWidth>
            <Card variant="muted" fullWidth>
              <Card.Content>
                <VStack leading="relaxed">
                  <P>{event.description}</P>
                </VStack>
              </Card.Content>
            </Card>

            <VStack _internalClassName="min-w-[200px]">
              <Button
                onClick={handleConfirm}
                variant="primary"
                label="Pokračovat v cestě"
                fullWidth
              />
            </VStack>
          </VStack>
        </Modal.Body>
      </Modal.Content>
    </Modal>
  )
}
