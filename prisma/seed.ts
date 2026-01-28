import { PrismaClient } from '@prisma/client'
import { hash } from 'bcryptjs'

import { SEED_ACHIEVEMENTS } from '@/lib/game/data/seed-achievements'
import { SEED_ENEMIES } from '@/lib/game/data/seed-enemies'
import { SEED_ITEMS } from '@/lib/game/data/seed-items'
import { SEED_LOCATIONS } from '@/lib/game/data/seed-locations'
import { getSeedQuests } from '@/lib/game/data/seed-quests'
import { SEED_SKILLS } from '@/lib/game/data/seed-skills'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database...')

  // Create test user
  const email = 'test@example.com'
  const passwordHash = await hash('password123', 12)

  const user = await prisma.user.upsert({
    where: { email },
    update: {},
    create: {
      email,
      passwordHash,
      username: 'testuser',
    },
  })

  console.log(`✅ Created test user: ${user.email}`)

  // Create items
  const items = await Promise.all(
    SEED_ITEMS.map((item) =>
      prisma.item.create({
        data: item,
      })
    )
  )

  console.log(`✅ Created ${items.length} items`)

  // Create Quests
  const itemMap = items.reduce(
    (acc, item) => ({ ...acc, [item.name]: item.id }),
    {} as Record<string, string>
  )

  const questsData = getSeedQuests(itemMap)

  for (const questData of questsData) {
    await prisma.quest.create({
      data: questData,
    })
  }

  console.log(`✅ Created ${questsData.length} quests with objectives`)

  // Create skills
  const skills = await Promise.all(
    SEED_SKILLS.map((skill) =>
      prisma.skill.create({
        data: skill,
      })
    )
  )

  console.log(`✅ Created ${skills.length} skills`)

  // Create enemies
  const enemies = await Promise.all(
    SEED_ENEMIES.map((enemy) =>
      prisma.enemy.create({
        data: enemy,
      })
    )
  )

  console.log(`✅ Created ${enemies.length} enemies`)

  // Create achievements
  const achievements = await Promise.all(
    SEED_ACHIEVEMENTS.map((achievement) =>
      prisma.achievement.create({
        data: achievement,
      })
    )
  )

  console.log(`✅ Created ${achievements.length} achievements`)

  // Create locations
  const locations = await Promise.all(
    SEED_LOCATIONS.map((location) =>
      prisma.location.create({
        data: location,
      })
    )
  )

  console.log(`✅ Created ${locations.length} locations`)

  console.log('🌱 Seeding complete!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
