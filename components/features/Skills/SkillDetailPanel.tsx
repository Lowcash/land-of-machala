'use client'

interface SkillDetailPanelProps {
  skill: any // We'll type this properly later
}

export function SkillDetailPanel({ skill }: SkillDetailPanelProps) {
  return (
    <div className="hidden w-80 border-l border-[#8b6f47] bg-black/70 p-4 backdrop-blur-sm md:block">
      <div className="text-center text-[#d4a574]">
        {skill ? `Detail: ${skill.name}` : 'Detail dovednosti - Coming soon'}
      </div>
    </div>
  )
}
