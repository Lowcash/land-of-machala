import * as React from 'react'

import { ChevronDown, ChevronUp } from 'lucide-react'

import { cn } from '@/lib/utils'

interface ScrollAreaProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  showGradient?: boolean
  maxHeight?: string | number
}

export function ScrollArea({
  children,
  showGradient = true,
  maxHeight,
  className,
  ...props
}: ScrollAreaProps) {
  const scrollRef = React.useRef<HTMLDivElement>(null)
  const [showTopArrow, setShowTopArrow] = React.useState(false)
  const [showBottomArrow, setShowBottomArrow] = React.useState(false)

  const handleScroll = React.useCallback(() => {
    if (!scrollRef.current) return
    const { scrollTop, scrollHeight, clientHeight } = scrollRef.current
    setShowTopArrow(scrollTop > 10)
    setShowBottomArrow(scrollHeight - scrollTop - clientHeight > 10)
  }, [])

  React.useEffect(() => {
    const scrollArea = scrollRef.current
    if (scrollArea) {
      handleScroll()
      scrollArea.addEventListener('scroll', handleScroll)

      // Also check on resize or content change
      const observer = new ResizeObserver(handleScroll)
      observer.observe(scrollArea)

      return () => {
        scrollArea.removeEventListener('scroll', handleScroll)
        observer.disconnect()
      }
    }
  }, [handleScroll, children])

  return (
    <div
      className={cn('relative flex min-h-0 flex-1 flex-col overflow-hidden', className)}
      style={{ maxHeight }}
      {...props}
    >
      {/* Top Arrow & Gradient */}
      {showTopArrow && (
        <>
          <div className="pointer-events-none absolute top-3 left-1/2 z-10 -translate-x-1/2 animate-bounce text-(--color-gold)">
            <ChevronUp size={16} />
          </div>
          <div className="pointer-events-none absolute top-0 left-0 z-5 h-8 w-full bg-linear-to-b from-black/80 to-transparent" />
        </>
      )}

      <div ref={scrollRef} className="scrollbar-custom h-full overflow-y-auto">
        {children}
      </div>

      {/* Bottom Arrow & Gradient */}
      {showBottomArrow && (
        <>
          <div className="pointer-events-none absolute bottom-3 left-1/2 z-10 -translate-x-1/2 animate-bounce text-(--color-gold)">
            <ChevronDown size={16} />
          </div>
          <div className="pointer-events-none absolute bottom-0 left-0 z-5 h-8 w-full bg-linear-to-t from-black/80 to-transparent" />
        </>
      )}
    </div>
  )
}
