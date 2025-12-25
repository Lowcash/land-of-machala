'use client'

import { ArrowLeft, Book, LogOut, Settings } from 'lucide-react'
import { useRouter } from 'next/navigation'
import type { ReactNode } from 'react'
import { isValidElement, useEffect, useRef, useState } from 'react'

interface GameHeaderProps {
  /** Icon to display */
  icon?: any
  /** Main title */
  title: string
  /** Subtitle (optional) */
  subtitle?: string
  /** Custom left content (replaces icon/title) */
  leftContent?: ReactNode
  /** Custom right content (replaces settings menu) */
  rightContent?: ReactNode
  /** Show back button */
  showBack?: boolean
  /** Custom back handler */
  onBack?: () => void
  /** Show settings menu */
  showSettings?: boolean
  /** Custom settings menu items */
  customMenuItems?: ReactNode
  /** Callback when help is clicked */
  onHelp?: () => void
  /** Callback when settings is clicked */
  onSettings?: () => void
}

/**
 * Unified header component for all game screens
 * Consistent styling, settings menu, responsive layout
 */
export function GameHeader({
  icon: Icon,
  title,
  subtitle,
  leftContent,
  rightContent,
  showBack = true,
  onBack,
  showSettings = true,
  customMenuItems,
  onHelp,
  onSettings,
}: GameHeaderProps) {
  const router = useRouter()
  const [showSettingsMenu, setShowSettingsMenu] = useState(false)
  const settingsRef = useRef<HTMLDivElement>(null)

  const handleBack = () => {
    if (onBack) {
      onBack()
    } else {
      router.back()
    }
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (settingsRef.current && !settingsRef.current.contains(event.target as Node)) {
        const target = event.target as HTMLElement
        if (!target.closest('[data-settings-trigger]')) {
          setShowSettingsMenu(false)
        }
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div className="flex w-full items-center justify-between gap-3 px-3 py-2">
      {/* Left - Title/Icon or Custom Content */}
        {leftContent || (
          <div className="flex min-w-0 flex-1 items-center gap-2">
            {Icon &&
              (isValidElement(Icon) ? (
                <div className="h-5 w-5 shrink-0 text-[#ffd700] [&>svg]:h-full [&>svg]:w-full">
                  {Icon}
                </div>
              ) : (
                <Icon className="h-5 w-5 shrink-0 text-[#ffd700]" />
              ))}
            <div className="min-w-0">
              <h1
                className="truncate text-lg text-[#ffd700]"
                style={{ fontFamily: 'var(--font-fantasy)' }}
              >
                {title}
              </h1>
              {subtitle && <p className="truncate text-xs text-[#d4a574]">{subtitle}</p>}
            </div>
          </div>
        )}

        {/* Right - Back Button + Settings Menu or Custom Content */}
        {rightContent || (
          <div className="flex items-center gap-2">
            {/* Back Button */}
            {showBack && (
              <button
                onClick={handleBack}
                aria-label="Zpět na předchozí stránku"
                className="flex items-center gap-2 rounded border border-[#8b6f47] bg-black/60 px-3 py-1.5 transition-colors hover:border-[#ffd700] focus-visible:ring-2 focus-visible:ring-[#ffd700]"
              >
                <ArrowLeft className="h-4 w-4 text-[#d4a574]" />
                <span className="hidden text-sm text-[#d4a574] sm:inline">Zpět</span>
              </button>
            )}

            {/* Settings Menu */}
            {showSettings && (
              <div className="relative" ref={settingsRef}>
                <button
                  data-settings-trigger
                  onClick={() => setShowSettingsMenu(!showSettingsMenu)}
                  aria-label="Otevřít menu nastavení"
                  aria-expanded={showSettingsMenu}
                  aria-haspopup="menu"
                  className="rounded border border-[#8b6f47] bg-black/60 p-2 transition-colors hover:border-[#ffd700] focus-visible:ring-2 focus-visible:ring-[#ffd700]"
                >
                  <Settings className="h-4 w-4 text-[#d4a574]" />
                </button>

                {showSettingsMenu && (
                  <div
                    className="absolute top-full right-0 z-[100] mt-1 w-48 rounded border border-[#d4a574] bg-black/95 shadow-2xl backdrop-blur-md"
                    role="menu"
                    aria-label="Menu nastavení"
                  >
                    {customMenuItems || (
                      <>
                        {onSettings && (
                          <button
                            onClick={() => {
                              onSettings()
                              setShowSettingsMenu(false)
                            }}
                            role="menuitem"
                            aria-label="Otevřít nastavení hry"
                            className="flex w-full items-center gap-2 border-b border-[#8b6f47] px-3 py-2 text-sm text-[#f5e6d3] hover:bg-black/60 focus-visible:bg-black/60 focus-visible:outline-none"
                          >
                            <Settings className="h-4 w-4" />
                            <span>Nastavení</span>
                          </button>
                        )}
                        {onHelp && (
                          <button
                            onClick={() => {
                              onHelp()
                              setShowSettingsMenu(false)
                            }}
                            role="menuitem"
                            aria-label="Zobrazit nápovědu"
                            className="flex w-full items-center gap-2 border-b border-[#8b6f47] px-3 py-2 text-sm text-[#f5e6d3] hover:bg-black/60 focus-visible:bg-black/60 focus-visible:outline-none"
                          >
                            <Book className="h-4 w-4" />
                            <span>Nápověda</span>
                          </button>
                        )}
                        <button
                          onClick={() => router.push('/login')}
                          role="menuitem"
                          aria-label="Odhlásit se z hry"
                          className="flex w-full items-center gap-2 px-3 py-2 text-sm text-[#ff6b6b] hover:bg-black/60 focus-visible:bg-black/60 focus-visible:outline-none"
                        >
                          <LogOut className="h-4 w-4" />
                          <span>Odhlásit se</span>
                        </button>
                      </>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    )
  }
