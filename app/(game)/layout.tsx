import { RouteTransition } from '@/components/features/Game/RouteTransition'

export default function GameLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen flex-col overflow-hidden bg-[#0a0806]">
      <div className="flex-1 overflow-hidden">
        <RouteTransition>{children}</RouteTransition>
      </div>
    </div>
  )
}
