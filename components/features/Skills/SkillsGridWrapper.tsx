import { SkillGrid } from './Grid/SkillGrid'
import type { MergedSkill, SkillCategory } from './Shared/types'

interface SkillsGridWrapperProps {
  skills: MergedSkill[]
  talentPoints: number
  searchParams?: { [key: string]: string | string[] | undefined }
}

export function SkillsGridWrapper({ skills, talentPoints, searchParams }: SkillsGridWrapperProps) {
  const selectedCategory = (searchParams?.category as SkillCategory) || 'all'
  const selectedSkillId = (searchParams?.skillId as string) || null

  return (
    <SkillGrid
      skills={skills}
      talentPoints={talentPoints}
      selectedCategory={selectedCategory}
      selectedSkill={selectedSkillId}
    />
  )
}
