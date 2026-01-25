/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * Serializes character data for client consumption, converting Dates to ISO strings
 */
export function serializeCharacter(character: any) {
  if (!character) return null

  return {
    ...character,
    createdAt: character.createdAt?.toISOString?.() || character.createdAt,
    updatedAt: character.updatedAt?.toISOString?.() || character.updatedAt,
    lastPlayedAt: character.lastPlayedAt?.toISOString?.() || character.lastPlayedAt,
    inventory: character.inventory?.map((inv: any) => ({
      ...inv,
      createdAt: inv.createdAt?.toISOString?.() || inv.createdAt,
      item: {
        ...inv.item,
        createdAt: inv.item?.createdAt?.toISOString?.() || inv.item?.createdAt,
      },
    })),
    quests: character.quests?.map((q: any) => ({
      ...q,
      startedAt: q.startedAt?.toISOString?.() || q.startedAt,
      completedAt: q.completedAt?.toISOString?.() || q.completedAt,
      createdAt: q.createdAt?.toISOString?.() || q.createdAt,
      quest: {
        ...q.quest,
        createdAt: q.quest?.createdAt?.toISOString?.() || q.quest?.createdAt,
      },
    })),
    skills: character.skills?.map((s: any) => ({
      ...s,
      unlockedAt: s.unlockedAt?.toISOString?.() || s.unlockedAt,
      skill: {
        ...s.skill,
        createdAt: s.skill?.createdAt?.toISOString?.() || s.skill?.createdAt,
      },
    })),
  }
}
