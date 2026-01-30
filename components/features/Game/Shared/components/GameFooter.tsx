import { headers } from 'next/headers'
import Link from 'next/link'

import { GAME_NAV_ITEMS } from '@/lib/game/views'
import { cn } from '@/lib/utils'

export async function GameFooter() {
  const headersList = await headers()
  // Since we are in a server component rendering in a layout or page,
  // we can't always rely on custom headers if middleware didn't run or for static pages?
  // But our middleware runs for all except api/static.
  const pathname = headersList.get('x-pathname') || '/'

  return (
    <div className="w-full py-2">
      <div className="mx-auto flex max-w-lg items-center justify-between px-4">
        {GAME_NAV_ITEMS.map((item) => {
          const isActive = pathname === item.path
          const Icon = item.icon

          return (
            <Link
              key={item.id}
              href={item.path}
              className={cn(
                'group relative flex h-auto min-w-16 flex-col items-center gap-1 rounded-lg p-2 transition-all duration-300',
                isActive ? 'bg-[#ffd700]/5' : 'hover:bg-white/5'
              )}
            >
              {/* Glow effect for active */}
              {isActive && (
                <div className="absolute inset-0 rounded-full bg-[#ffd700]/10 blur-xl"></div>
              )}

              <Icon
                className={cn(
                  'h-6 w-6 transition-colors duration-300',
                  isActive
                    ? 'text-[#ffd700] drop-shadow-[0_0_5px_rgba(255,215,0,0.5)]'
                    : 'text-[#8b7355] group-hover:text-[#d4a574]'
                )}
              />

              <span
                className={cn(
                  'text-[10px] font-medium tracking-wide transition-colors duration-300',
                  isActive ? 'text-[#ffd700]' : 'text-[#8b7355] group-hover:text-[#d4a574]'
                )}
              >
                {item.label}
              </span>

              {/* Active Indicator Dot */}
              {isActive && (
                <div className="absolute -bottom-1 h-1 w-1 rounded-full bg-[#ffd700] shadow-[0_0_5px_#ffd700]"></div>
              )}
            </Link>
          )
        })}
      </div>
    </div>
  )
}
