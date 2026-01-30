'use client'

import { useTransition } from 'react'

import Link from 'next/link'
import { useRouter } from 'next/navigation'

import { X } from 'lucide-react'
import { toast } from 'sonner'

import { increaseSkillRankAction, unlockSkillAction } from '@/lib/actions/skill'

import { Button } from '@/components/ui/button'

import type { MergedSkill } from '../Shared/types'

interface SkillDetailPanelProps {
  skill: MergedSkill | null
  closeHref: string
  talentPoints: number
}

export function SkillDetailPanel({ skill, closeHref, talentPoints }: SkillDetailPanelProps) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  const handleUpgrade = async () => {
    if (!skill) return

    startTransition(async () => {
      try {
        const action = skill.currentLevel === 0 ? unlockSkillAction : increaseSkillRankAction
        const [data, err] = await action({ skillId: skill.id })

        if (err) {
          toast.error(err.message)
          return
        }

        if (data?.success) {
          toast.success(data.message)
          router.refresh()
        }
      } catch {
        toast.error('Chyba při vylepšování dovednosti')
      }
    })
  }

  if (!skill) {
    return (
      <div className="flex h-full items-center justify-center p-8 text-center text-[#8b7355] italic">
        Vyber si dovednost pro zobrazení detailů...
      </div>
    )
  }

  return (
    <div className="flex h-full flex-col">
      <div className="mb-4 flex items-center justify-between border-b border-[#8b6f47]/30 pb-2">
        <h2
          className="text-xl font-bold text-[#ffd700]"
          style={{ fontFamily: 'var(--font-fantasy)' }}
        >
          {skill.name}
        </h2>
        <Link
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          href={closeHref as any}
          className="flex h-8 w-8 items-center justify-center rounded-md text-[#8b7355] transition-colors hover:bg-white/10 hover:text-[#d4a574]"
        >
          <X className="h-5 w-5" />
        </Link>
      </div>

      <div className="custom-scrollbar flex-1 space-y-4 overflow-y-auto pr-2">
        <div className="rounded bg-black/40 p-3 text-sm leading-relaxed text-[#f5e6d3]">
          {skill.description || 'Žádný popis není k dispozici.'}
        </div>

        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="rounded border border-[#8b6f47]/20 bg-black/20 p-2">
            <div className="text-[#8b7355] uppercase">Level</div>
            <div className="text-lg font-bold text-[#d4a574]">
              {skill.currentLevel} / {skill.maxRank}
            </div>
          </div>
          <div className="rounded border border-[#8b6f47]/20 bg-black/20 p-2">
            <div className="text-[#8b7355] uppercase">Cena vylepšení</div>
            <div className="text-lg font-bold text-[#ffd700]">{skill.cost} bodů</div>
          </div>
        </div>
      </div>

      <div className="mt-4 border-t border-[#8b6f47]/30 pt-4">
        <Button
          variant="game-primary"
          className="w-full"
          disabled={skill.currentLevel >= skill.maxRank || talentPoints < skill.cost || isPending}
          onClick={handleUpgrade}
        >
          {isPending
            ? 'Zpracovávám...'
            : skill.currentLevel >= skill.maxRank
              ? 'Maximálně vylepšeno'
              : skill.currentLevel === 0
                ? 'Naučit se dovednost'
                : 'Vylepšit dovednost'}
        </Button>
      </div>
    </div>
  )
}
