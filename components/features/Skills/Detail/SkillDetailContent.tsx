import { Check, X } from 'lucide-react'

import { getIconFromName } from '../Shared/iconMap'
import { getCategoryBg, getCategoryColor, getCategoryName } from '../Shared/styles'
import type { MergedSkill } from '../Shared/types'
import { SkillUpgradeButton } from './SkillUpgradeButton'

interface SkillDetailContentProps {
  skill: MergedSkill
  allSkills: MergedSkill[]
  talentPoints: number
}

export function SkillDetailContent({ skill, allSkills, talentPoints }: SkillDetailContentProps) {
  const Icon = getIconFromName(skill.iconName)
  const maxed = skill.currentLevel >= skill.maxRank
  const canUpgrade =
    skill.unlocked && skill.currentLevel < skill.maxRank && talentPoints >= skill.cost

  return (
    <>
      <div
        className={`h-20 w-20 rounded-full ${getCategoryBg(skill.category)} mx-auto mb-4 flex items-center justify-center`}
      >
        <Icon className={`h-10 w-10 ${getCategoryColor(skill.category)}`} />
      </div>

      <h3
        className={`mb-1 text-center text-lg ${getCategoryColor(skill.category)}`}
        style={{ fontFamily: 'var(--font-fantasy)' }}
      >
        {skill.name}
      </h3>
      <p className="mb-4 text-center text-xs text-[#8b7355]">
        {getCategoryName(skill.category)} • Level {skill.currentLevel}/{skill.maxRank}
      </p>

      <div className="mb-4 rounded border border-[#8b6f47] bg-black/60 p-3">
        <p className="text-sm leading-relaxed text-[#f5e6d3]">{skill.description}</p>
      </div>

      {skill.requiredSkillId && (
        <div className="mb-4 rounded border border-[#8b6f47] bg-black/60 p-3">
          <h3 className="mb-2 text-xs text-[#d4a574]" style={{ fontFamily: 'var(--font-fantasy)' }}>
            Vyžaduje:
          </h3>
          <div className="space-y-1">
            {[skill.requiredSkillId].map((reqId) => {
              const reqSkill = allSkills.find((s) => s.id === reqId)
              if (!reqSkill) return null
              const met = reqSkill.currentLevel >= 3

              return (
                <div key={reqId} className="flex items-center gap-2">
                  {met ? (
                    <Check className="h-3 w-3 text-[#6fbf6f]" />
                  ) : (
                    <X className="h-3 w-3 text-[#ff6b6b]" />
                  )}
                  <span className={`text-xs ${met ? 'text-[#6fbf6f]' : 'text-[#ff6b6b]'}`}>
                    {reqSkill.name} (Level 3)
                  </span>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {skill.unlocked && (
        <div className="mb-4 rounded border border-[#8b6f47] bg-black/60 p-3">
          <h3 className="mb-2 text-xs text-[#d4a574]" style={{ fontFamily: 'var(--font-fantasy)' }}>
            Pokrok:
          </h3>
          <div className="mb-2 flex gap-1">
            {Array.from({ length: skill.maxRank }).map((_, i) => (
              <div
                key={i}
                className={`h-2 flex-1 rounded-full ${
                  i < skill.currentLevel
                    ? `bg-linear-to-r ${
                        skill.category === 'combat'
                          ? 'from-[#ff6b6b] to-[#ff8b8b]'
                          : skill.category === 'defense'
                            ? 'from-[#69ccf0] to-[#89dcff]'
                            : skill.category === 'magic'
                              ? 'from-[#b66bd4] to-[#d68bf4]'
                              : 'from-[#6fbf6f] to-[#8fdf8f]'
                      }`
                    : 'bg-black/60'
                }`}
              />
            ))}
          </div>
          <p className="text-xs text-[#8b7355]">
            {skill.currentLevel} / {skill.maxRank}
          </p>
        </div>
      )}

      {skill.unlocked && (
        <SkillUpgradeButton
          skillId={skill.id}
          skillName={skill.name}
          cost={skill.cost}
          canUpgrade={canUpgrade}
          maxed={maxed}
        />
      )}
    </>
  )
}
