import { useEffect, useState } from 'react'

const HERO_TEXTS = [
  'V dobách temnoty se rodí legendy. Budeš jednou z nich, nebo padneš v zapomnění jako ti před tebou?',
  'Tvá cesta začíná právě teď. Každé rozhodnutí formuje tvůj osud.',
  'Machala volá své hrdiny. Odpovíš na volání?',
  'Nebezpečí číhá za každým rohem, ale s odvahou přichází sláva.',
  'Dávné legendy praví o hrdinech, kteří změnili osud světa. Tvůj příběh začíná zde.',
]

export function useHeroText() {
  const [heroText, setHeroText] = useState(HERO_TEXTS[0])
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setHeroText(HERO_TEXTS[Math.floor(Math.random() * HERO_TEXTS.length)])
    setIsMounted(true)
  }, [])

  return { heroText, isMounted }
}
