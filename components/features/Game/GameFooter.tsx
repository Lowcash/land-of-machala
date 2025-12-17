'use client'

import { Backpack, Map as MapIcon, ScrollText, TrendingUp, User } from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'

export function GameFooter() {
  const router = useRouter()
  const pathname = usePathname()

  const navItems = [
    { id: 'character', icon: User, label: 'Postava', path: '/character' },
    { id: 'skills', icon: TrendingUp, label: 'Dovednosti', path: '/skills' },
    { id: 'quests', icon: ScrollText, label: 'Questy', path: '/quests' },
    { id: 'inventory', icon: Backpack, label: 'Inventář', path: '/inventory' },
    { id: 'map', icon: MapIcon, label: 'Mapa', path: '/map' },
  ]

  return (
    <div className="z-100 border-t border-[#8b6f47] bg-black/90 shadow-[0_-5px_20px_rgba(0,0,0,0.5)]">
      <div className="mx-auto w-full max-w-lg px-4 py-2">
        <div className="flex items-center justify-between">
          {navItems.map((item) => {
            const isActive = pathname === item.path
            const Icon = item.icon

            return (
              <button
                key={item.id}
                onClick={() => router.push(item.path as any)}
                className={`group relative flex min-w-[64px] flex-col items-center gap-1 rounded-lg p-2 transition-all duration-300 ${isActive ? '' : 'hover:bg-white/5'}`}
              >
                {/* Glow effect for active */}
                {isActive && (
                  <div className="absolute inset-0 rounded-full bg-[#ffd700]/10 blur-xl"></div>
                )}

                <Icon
                  className={`h-6 w-6 transition-colors duration-300 ${
                    isActive
                      ? 'text-[#ffd700] drop-shadow-[0_0_5px_rgba(255,215,0,0.5)]'
                      : 'text-[#8b7355] group-hover:text-[#d4a574]'
                  }`}
                />

                <span
                  className={`text-[10px] font-medium tracking-wide transition-colors duration-300 ${
                    isActive ? 'text-[#ffd700]' : 'text-[#8b7355] group-hover:text-[#d4a574]'
                  }`}
                >
                  {item.label}
                </span>

                {/* Active Indicator Dot */}
                {isActive && (
                  <div className="absolute -bottom-1 h-1 w-1 rounded-full bg-[#ffd700] shadow-[0_0_5px_#ffd700]"></div>
                )}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
