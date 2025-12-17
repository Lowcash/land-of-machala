'use client'

import { ChevronDown } from 'lucide-react';
import { useEffect, useState } from 'react';

interface ScrollIndicatorProps {
  targetRef: React.RefObject<HTMLElement | null>;
  position?: 'top' | 'bottom' | 'both';
  className?: string;
}

export function ScrollIndicator({ targetRef, position = 'bottom', className = '' }: ScrollIndicatorProps) {
  const [showTop, setShowTop] = useState(false);
  const [showBottom, setShowBottom] = useState(false);

  useEffect(() => {
    const element = targetRef.current;
    if (!element) return;

    const checkScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = element;
      const isAtTop = scrollTop === 0;
      const isAtBottom = Math.abs(scrollHeight - clientHeight - scrollTop) < 5;

      if (position === 'top' || position === 'both') {
        setShowTop(!isAtTop && scrollTop > 20);
      }
      
      if (position === 'bottom' || position === 'both') {
        setShowBottom(!isAtBottom && scrollHeight > clientHeight);
      }
    };

    checkScroll();
    element.addEventListener('scroll', checkScroll);
    
    // Also check on resize
    const resizeObserver = new ResizeObserver(checkScroll);
    resizeObserver.observe(element);

    return () => {
      element.removeEventListener('scroll', checkScroll);
      resizeObserver.disconnect();
    };
  }, [targetRef, position]);

  return (
    <>
      {/* Top fade indicator */}
      {showTop && (position === 'top' || position === 'both') && (
        <div className={`absolute top-0 left-0 right-0 h-12 bg-linear-to-b from-black/80 via-black/40 to-transparent pointer-events-none z-10 ${className}`}>
          <div className="flex items-center justify-center h-full">
            <ChevronDown className="w-4 h-4 text-[#ffd700] rotate-180 animate-bounce" />
          </div>
        </div>
      )}

      {/* Bottom fade indicator */}
      {showBottom && (position === 'bottom' || position === 'both') && (
        <div className={`absolute bottom-0 left-0 right-0 h-12 bg-linear-to-t from-black/80 via-black/40 to-transparent pointer-events-none z-10 ${className}`}>
          <div className="flex items-center justify-center h-full">
            <ChevronDown className="w-4 h-4 text-[#ffd700] animate-bounce" />
          </div>
        </div>
      )}
    </>
  );
}
