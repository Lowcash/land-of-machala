import { SkillDetailPanel } from './Detail/SkillDetailPanel'
import type { MergedSkill, SkillCategory } from './Shared/types'

interface SkillDetailWrapperProps {
  skill: MergedSkill | null
  talentPoints: number
  searchParams?: { [key: string]: string | string[] | undefined }
}

export function SkillDetailWrapper({ skill, talentPoints, searchParams }: SkillDetailWrapperProps) {
  const selectedCategory = (searchParams?.category as SkillCategory) || 'all'

  // When closing, we keep the category but remove the skillId
  const closeHref = selectedCategory === 'all' ? '?' : `?category=${selectedCategory}`

  return <SkillDetailPanel skill={skill} talentPoints={talentPoints} closeHref={closeHref} />
}
