'use client'

import { useTransition } from 'react'

import { useRouter } from 'next/navigation'

import { toast } from 'sonner'

import { increaseSkillRankAction, unlockSkillAction } from '@/lib/actions/skill'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { DetailLayout, StatDisplay, StatGrid } from '@/components/ui/display'
import { VStack } from '@/components/ui/stack'
import { P } from '@/components/ui/typography'

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

  const footer = skill && (
    <Button
      variant="primary"
      fullWidth
      disabled={skill.currentLevel >= skill.maxRank || talentPoints < skill.cost || isPending}
      onClick={handleUpgrade}
      label={
        isPending
          ? 'Zpracovávám...'
          : skill.currentLevel >= skill.maxRank
            ? 'Maximálně vylepšeno'
            : skill.currentLevel === 0
              ? 'Naučit se dovednost'
              : 'Vylepšit dovednost'
      }
    />
  )

  return (
    <DetailLayout
      title={skill?.name || 'Detail dovednosti'}
      onClose={closeHref}
      isEmpty={!skill}
      emptyMessage="Vyber si dovednost pro zobrazení detailů..."
      footer={footer}
    >
      <VStack gap="md">
        <Card variant="muted" textured fullWidth>
          <Card.Content>
            <P color="copper">{skill?.description || 'Žádný popis není k dispozici.'}</P>
          </Card.Content>
        </Card>

        {skill && (
          <StatGrid columns="2">
            <StatDisplay
              label="Level"
              value={`${skill.currentLevel} / ${skill.maxRank}`}
              color="copper"
            />
            <StatDisplay label="Cena vylepšení" value={`${skill.cost} bodů`} color="gold" />
          </StatGrid>
        )}
      </VStack>
    </DetailLayout>
  )
}
