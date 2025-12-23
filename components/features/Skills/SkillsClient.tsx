'use client'

import { ArrowLeft, TrendingUp } from 'lucide-react'
import { useEffect, useState } from 'react'
import { SkillDetailContent } from './SkillDetailContent'
import { SkillGrid } from './SkillGrid'
import type { MergedSkill, SkillCategory } from './types'

type SkillsClientProps = {
  skills: MergedSkill[]
  talentPoints: number
  characterId: string
}

export function SkillsClient({ skills, talentPoints, characterId }: SkillsClientProps) {
  const [selectedCategory, setSelectedCategory] = useState<SkillCategory>('combat')
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null)

  useEffect(() => {
    const handlePopState = () => {
      const params = new URLSearchParams(window.location.search)
      const skillId = params.get('skillId')
      if (skillId && skills.find((s) => s.id === skillId)) {
        setSelectedSkill(skillId)
      } else {
        setSelectedSkill(null)
      }
    }

    handlePopState()
    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [skills])

  const handleSelectSkill = (id: string | null) => {
    if (id) {
      setSelectedSkill(id)
      window.history.pushState({ skillId: id }, '', `?skillId=${id}`)
    } else {
      setSelectedSkill(null)
      const url = new URL(window.location.href)
      url.searchParams.delete('skillId')
      window.history.pushState({}, '', url.toString())
    }
  }

  const handleBack = () => {
    window.history.back()
  }

  const selectedSkillData = skills.find((s) => s.id === selectedSkill)

  return (
    <>
      <div className="flex w-full flex-1 overflow-hidden">
        <SkillGrid
          skills={skills}
          talentPoints={talentPoints}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          selectedSkill={selectedSkill}
          setSelectedSkill={handleSelectSkill}
        />

        {/* Desktop detail panel */}
        <div className="hidden w-80 border-l border-[#8b6f47] bg-black/70 p-4 backdrop-blur-sm md:block">
          {selectedSkillData ? (
            <SkillDetailContent
              skill={selectedSkillData}
              allSkills={skills}
              talentPoints={talentPoints}
              characterId={characterId}
            />
          ) : (
            <div className="flex h-full items-center justify-center">
              <div className="text-center">
                <TrendingUp className="mx-auto mb-4 h-16 w-16 text-[#8b6f47]" />
                <h3
                  className="mb-2 text-lg text-[#d4a574]"
                  style={{ fontFamily: 'var(--font-fantasy)' }}
                >
                  Vyber dovednost
                </h3>
                <p className="text-sm leading-relaxed text-[#8b7355]">
                  Klikni na dovednost v seznamu pro zobrazení detailů a možnost upgradu.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Mobile fullscreen overlay */}
      {selectedSkill && selectedSkillData && (
        <div className="fixed inset-0 z-50 flex flex-col bg-black/95 backdrop-blur-md md:hidden">
          <div className="flex flex-shrink-0 items-center justify-between border-b border-[#8b6f47] bg-black/80 px-3 py-3 backdrop-blur-md">
            <h2 className="text-base sm:text-lg text-[#ffd700]" style={{ fontFamily: 'var(--font-medieval)' }}>
              Detail dovednosti
            </h2>
            <button
              onClick={handleBack}
              className="flex items-center gap-2 rounded border border-[#8b6f47] bg-black/60 px-3 py-2 min-h-touch-target sm:min-h-0 transition-colors hover:border-[#ffd700]"
            >
              <ArrowLeft className="h-4 w-4 text-[#d4a574]" />
              <span className="text-sm text-[#d4a574]">Zpět</span>
            </button>
          </div>

          <div className="scrollbar-custom flex-1 overflow-y-auto p-3 sm:p-4">
            <SkillDetailContent
              skill={selectedSkillData}
              allSkills={skills}
              talentPoints={talentPoints}
              characterId={characterId}
            />
          </div>
        </div>
      )}
    </>
  )
}
