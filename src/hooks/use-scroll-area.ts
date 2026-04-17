import { useCallback, useEffect, useRef, useState } from 'react'

export function useScrollArea() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [showTopArrow, setShowTopArrow] = useState(false)
  const [showBottomArrow, setShowBottomArrow] = useState(false)

  const setScrollNode = useCallback((node: HTMLDivElement | null) => {
    scrollRef.current = node
  }, [])

  const handleScroll = useCallback(() => {
    if (!scrollRef.current) return
    const { scrollTop, scrollHeight, clientHeight } = scrollRef.current
    setShowTopArrow(scrollTop > 10)
    // Add a small epsilon (1px) to prevent floating point inaccuracies from hiding the bottom arrow
    setShowBottomArrow(scrollHeight - scrollTop - clientHeight > 1)
  }, [])

  useEffect(() => {
    const scrollArea = scrollRef.current
    if (scrollArea) {
      handleScroll()
      scrollArea.addEventListener('scroll', handleScroll)

      const observer = new ResizeObserver(handleScroll)
      observer.observe(scrollArea)

      return () => {
        scrollArea.removeEventListener('scroll', handleScroll)
        observer.disconnect()
      }
    }
  }, [handleScroll])

  return {
    scrollRef,
    setScrollNode,
    showTopArrow,
    showBottomArrow,
    handleScroll,
  }
}
