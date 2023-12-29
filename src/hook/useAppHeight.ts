import { useEffect } from 'react'
import { useRouter } from 'next/router'

export default function useAppHeight() {
  const router = useRouter()

  useEffect(() => {
    const setAppHeight = () => {
      const doc = document.documentElement
      doc.style.setProperty('--app-height', `${window.innerHeight}px`)
    }

    window.addEventListener('resize', setAppHeight)
    setAppHeight()

    return () => {
      window.removeEventListener('resize', setAppHeight)
    }
  }, [router.asPath])
}
