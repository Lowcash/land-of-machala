'use client'

import { MobileOverlay, SplitView } from '@/components/layout'
import { TrendingUp } from 'lucide-react'
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

  // Empty state for desktop sidebar
  const emptyState = (
    <div className="flex h-full items-center justify-center p-4">
      <div className="text-center">
        <TrendingUp className="mx-auto mb-4 h-16 w-16 text-[#8b6f47]" />
        <h3 className="mb-2 text-lg text-[#d4a574]" style={{ fontFamily: 'var(--font-fantasy)' }}>
          Vyber dovednost
        </h3>
        <p className="text-sm leading-relaxed text-[#8b7355]">
          Klikni na dovednost v seznamu pro zobrazení detailů a možnost upgradu.
        </p>
      </div>
    </div>
  )

  return (
    <>
      <SplitView
        main={
          <SkillGrid
            skills={skills}
            talentPoints={talentPoints}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            selectedSkill={selectedSkill}
            setSelectedSkill={handleSelectSkill}
          />
        }
        aside={
          selectedSkillData ? (
            <div className="p-4">
              <SkillDetailContent
                skill={selectedSkillData}
                allSkills={skills}
                talentPoints={talentPoints}
                characterId={characterId}
              />
            </div>
          ) : (
            emptyState
          )
        }
        asideWidth="md"
      />

      {/* Mobile detail overlay */}
      {selectedSkillData && (
        <MobileOverlay
          isOpen={!!selectedSkill}
          title="Detail dovednosti"
          onClose={handleBack}
          backText="Zpět do dovedností"
        >
          <SkillDetailContent
            skill={selectedSkillData}
            allSkills={skills}
            talentPoints={talentPoints}
            characterId={characterId}
          />
        </MobileOverlay>
      )}
    </>
  )
}
