import Image from 'next/image'

export default function GameLayout({ children }: { children: React.ReactNode }) {
  // Config for inline GameLayout logic
  const backgroundClass = 'bg-[#0a0806]'
  const maxWidth = 'full'
  const maxWidthClass = {
    default: 'max-w-5xl',
    wide: 'max-w-7xl',
    full: 'max-w-none',
  }[maxWidth]

  // Optional global background image logic if we wanted it
  // But currently GameLayout was using default no image in usage
  const backgroundImage = undefined

  return (
    <div
      className={`flex h-screen flex-col overflow-hidden ${backgroundClass}`}
      style={{ fontFamily: 'var(--font-body)' }}
    >
      {/* Background Layer (Preserved for future use if needed) */}
      {backgroundImage && (
        <>
          <div className="absolute inset-0 flex justify-center">
            <div className="relative h-full w-full max-w-500">
              <Image src={backgroundImage} alt="" fill className="object-cover" priority />
              <div className="absolute inset-0 bg-linear-to-b from-black/50 via-transparent to-black/60"></div>
            </div>
            {/* Black bars for ultra-wide screens */}
            <div className="pointer-events-none absolute inset-y-0 right-0 left-0">
              <div className="relative mx-auto h-full max-w-500">
                <div className="absolute inset-y-0 left-0 w-[calc((100vw-2000px)/2)] bg-black"></div>
                <div className="absolute inset-y-0 right-0 w-[calc((100vw-2000px)/2)] bg-black"></div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Content Layer */}
      <div className="relative z-10 flex flex-1 flex-col overflow-hidden">
        <div className={`w-full ${maxWidthClass} mx-auto flex flex-1 flex-col overflow-hidden`}>
          {children}
        </div>
      </div>
    </div>
  )
}
