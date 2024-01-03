import { useEffect } from 'react'

function setAppHeight() {
  document.documentElement.style.setProperty('--app-height', `${window.innerHeight}px`)
}

export default function useAppHeight() {
  useEffect(() => {
    setAppHeight()

    window.addEventListener('resize', setAppHeight)
    return () => {
      window.removeEventListener('resize', setAppHeight)
    }
  }, [])
}
