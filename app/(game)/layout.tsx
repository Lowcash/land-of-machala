export default function GameLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="bg-game-wood-dark flex h-screen flex-col overflow-hidden"
      style={{ fontFamily: 'var(--font-body)' }}
    >
      {/* Content Layer */}
      <div className="relative z-10 flex flex-1 flex-col overflow-hidden">
        <div className="mx-auto flex w-full max-w-none flex-1 flex-col overflow-hidden">
          {children}
        </div>
      </div>
    </div>
  )
}
