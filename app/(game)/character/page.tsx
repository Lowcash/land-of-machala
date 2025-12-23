import { CharacterPanel } from '@/components/features/Character/CharacterPanel'
import { Suspense } from 'react'

export default function CharacterPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-[#d4a574]">Načítání...</div>}>
      <CharacterPanel />
    </Suspense>
  )
}
