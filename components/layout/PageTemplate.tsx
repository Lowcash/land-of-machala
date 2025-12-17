import { GameFooter } from '@/components/features/Game/GameFooter'
import { GameHeader } from '@/components/features/Game/GameHeader'
import { ReactNode } from 'react'

interface PageTemplateProps {
  /** Page title */
  title: string
  /** Subtitle (optional) */
  subtitle?: string
  /** Icon component */
  icon?: any
  /** Background image */
  backgroundImage?: string
  /** Callback when help is clicked */
  onHelp?: () => void
  /** Max width constraint for content */
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
  /** Main content */
  children: ReactNode
}

/**
 * Complete page template with header, background, content, and footer
 * Provides consistent structure for all fullscreen game pages
 */
export function PageTemplate({
  title,
  subtitle,
  icon,
  backgroundImage,
  onHelp,
  maxWidth = 'lg',
  children,
}: PageTemplateProps) {
  const maxWidthClass = {
    sm: 'max-w-4xl',
    md: 'max-w-5xl',
    lg: 'max-w-6xl',
    xl: 'max-w-7xl',
    full: 'max-w-none',
  }[maxWidth]

  return (
    <div
      className="fixed inset-0 flex flex-col overflow-hidden bg-[#0a0806]"
      style={{ fontFamily: 'var(--font-body)' }}
    >
      {/* Background with max-width constraint */}
      {backgroundImage && (
        <>
          <div className="absolute inset-0 flex justify-center">
            <div className="relative h-full w-full max-w-[2000px]">
              <img src={backgroundImage} alt={title} className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-linear-to-b from-black/50 via-transparent to-black/60"></div>
            </div>
            {/* Black bars for ultra-wide screens */}
            <div className="pointer-events-none absolute inset-y-0 right-0 left-0">
              <div className="relative mx-auto h-full max-w-[2000px]">
                <div className="absolute inset-y-0 left-0 w-[calc((100vw-2000px)/2)] bg-black"></div>
                <div className="absolute inset-y-0 right-0 w-[calc((100vw-2000px)/2)] bg-black"></div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Content Layer with max-width constraint */}
      <div className="relative z-10 flex flex-1 flex-col overflow-hidden">
        <div className={`w-full ${maxWidthClass} mx-auto flex flex-1 flex-col overflow-hidden`}>
          {/* Header */}
          <GameHeader icon={icon} title={title} subtitle={subtitle} onHelp={onHelp} />

          {/* Main Content Area */}
          {children}
        </div>
      </div>

      {/* Footer */}
      <GameFooter />
    </div>
  )
}
