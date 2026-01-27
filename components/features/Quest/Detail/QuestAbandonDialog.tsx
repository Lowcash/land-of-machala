import { Button } from '@/components/ui/button'

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
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
      <div className="mx-4 w-full max-w-md rounded-lg border-2 border-[#d4a574] bg-linear-to-br from-black/95 to-black/80 p-6 shadow-2xl">
        <h3 className="mb-4 text-xl text-[#ffd700]" style={{ fontFamily: 'var(--font-medieval)' }}>
          Opravdu chceš vzdát quest?
        </h3>
        <p className="mb-6 text-sm text-[#d4a574]">
          Quest &quot;{questTitle}&quot; bude odstraněn z tvého deníku a veškerý postup bude
          ztracen.
        </p>
        <div className="flex gap-3">
          <Button
            variant="game-secondary"
            onClick={onClose}
            disabled={isLoading}
            className="flex-1 rounded border border-[#8b6f47] bg-black/60 py-3 text-sm text-[#d4a574] transition-colors hover:border-[#d4a574] hover:bg-black/80 disabled:cursor-not-allowed disabled:opacity-50"
            style={{ fontFamily: 'var(--font-fantasy)' }}
          >
            Zrušit
          </Button>
          <Button
            variant="game-danger"
            onClick={onConfirm}
            disabled={isLoading}
            className="flex-1 rounded border-2 border-[#ff6b6b] bg-[#ff6b6b]/20 py-3 text-sm text-[#ff6b6b] transition-colors hover:bg-[#ff6b6b]/30 disabled:cursor-not-allowed disabled:opacity-50"
            style={{ fontFamily: 'var(--font-fantasy)' }}
          >
            {isLoading ? 'Opouštím...' : 'Ano, vzdát quest'}
          </Button>
        </div>
      </div>
    </div>
  )
}
