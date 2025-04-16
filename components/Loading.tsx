import clsx from 'clsx'

interface Props {
  position?: 'local' | 'global'
}

export default function Loading({ position = 'global' }: Props) {
  return (
    <div
      className={clsx(
        'inset-0 z-50 flex items-center justify-center backdrop-blur-sm',
        position === 'global' && 'fixed bg-black/30',
      )}
    >
      <div className='h-12 w-12 animate-spin rounded-full border-4 border-gray-200 border-t-gray-800' />
    </div>
  )
}
