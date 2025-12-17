import { ReactNode } from 'react';

interface GameLayoutProps {
  children: ReactNode;
  /** Background image URL */
  backgroundImage?: string;
  /** Custom background class (if not using image) */
  backgroundClass?: string;
  /** Whether content should scroll (false = fullscreen sections) */
  scrollable?: boolean;
  /** Max width constraint for content */
  maxWidth?: 'default' | 'wide' | 'full';
}

/**
 * Unified layout component for all game screens
 * Provides consistent structure: background, content area, optional scrolling
 */
export function GameLayout({ 
  children, 
  backgroundImage, 
  backgroundClass = 'bg-[#0a0806]',
  scrollable = false,
  maxWidth = 'default'
}: GameLayoutProps) {
  const maxWidthClass = {
    default: 'max-w-5xl',
    wide: 'max-w-7xl',
    full: 'max-w-none'
  }[maxWidth];

  return (
    <div className={`h-screen flex flex-col overflow-hidden ${backgroundClass}`} style={{ fontFamily: 'var(--font-body)' }}>
      {/* Background Layer */}
      {backgroundImage && (
        <>
          <div className="absolute inset-0 flex justify-center">
            <div className="w-full max-w-500 h-full relative">
              <img src={backgroundImage} alt="" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-linear-to-b from-black/50 via-transparent to-black/60"></div>
            </div>
            {/* Black bars for ultra-wide screens */}
            <div className="absolute inset-y-0 left-0 right-0 pointer-events-none">
              <div className="h-full mx-auto max-w-500 relative">
                <div className="absolute inset-y-0 left-0 w-[calc((100vw-2000px)/2)] bg-black"></div>
                <div className="absolute inset-y-0 right-0 w-[calc((100vw-2000px)/2)] bg-black"></div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Content Layer */}
      <div className={`relative z-10 flex-1 flex flex-col ${scrollable ? 'overflow-y-auto' : 'overflow-hidden'}`}>
        <div className={`w-full ${maxWidthClass} mx-auto flex-1 flex flex-col ${scrollable ? '' : 'overflow-hidden'}`}>
          {children}
        </div>
      </div>
    </div>
  );
}
