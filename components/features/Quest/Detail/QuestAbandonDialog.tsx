import { Button } from '@/components/ui/button'
import { Modal } from '@/components/ui/modal'
import { HStack } from '@/components/ui/stack'
import { H3, P } from '@/components/ui/typography'

interface QuestAbandonDialogProps {
  questTitle: string
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  isLoading: boolean
}

export function QuestAbandonDialog({
  questTitle,
  isOpen,
  onClose,
  onConfirm,
  isLoading,
}: QuestAbandonDialogProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Modal.Content variant="dialog">
        <Modal.Header>
          <H3 font="medieval" color="gold">
            Opravdu chceš vzdát quest?
          </H3>
        </Modal.Header>

        <Modal.Body>
          <P color="copper">
            Quest &quot;{questTitle}&quot; bude odstraněn z tvého deníku a veškerý postup bude
            ztracen.
          </P>
        </Modal.Body>

        <Modal.Footer>
          <HStack gap="sm" fullWidth>
            <Button
              variant="secondary_game"
              onClick={onClose}
              disabled={isLoading}
              label="Zrušit"
              fullWidth
            />
            <Button
              variant="danger"
              onClick={onConfirm}
              disabled={isLoading}
              loading={isLoading}
              label="Ano, vzdát quest"
              fullWidth
            />
          </HStack>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  )
}
