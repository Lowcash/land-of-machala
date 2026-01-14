/* eslint-disable @typescript-eslint/no-explicit-any */
export function serializeCharacter(character: any) {
  if (!character) return null

  return {
    ...character,
    createdAt: character.createdAt?.toISOString(),
    updatedAt: character.updatedAt?.toISOString(),
    lastPlayedAt: character.lastPlayedAt?.toISOString(),
    inventory: character.inventory?.map((inv: any) => ({
      ...inv,
      createdAt: inv.createdAt?.toISOString(),
      item: {
        ...inv.item,
        createdAt: inv.item?.createdAt?.toISOString(),
      },
    })),
    quests: character.quests?.map((q: any) => ({
      ...q,
      startedAt: q.startedAt?.toISOString(),
      completedAt: q.completedAt?.toISOString(),
      createdAt: q.createdAt?.toISOString(),
      quest: {
        ...q.quest,
        createdAt: q.quest?.createdAt?.toISOString(),
      },
    })),
    skills: character.skills?.map((s: any) => ({
      ...s,
      unlockedAt: s.unlockedAt?.toISOString(),
      skill: {
        ...s.skill,
        createdAt: s.skill?.createdAt?.toISOString(),
      },
    })),
  }
}
