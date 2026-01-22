import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const username = process.argv[2] || 'testuser'
  console.log(`Unlocking skills for user: ${username}`)

  const user = await prisma.user.findUnique({
    where: { username },
    include: { characters: true },
  })

  if (!user || user.characters.length === 0) {
    console.error('User or character not found')
    process.exit(1)
  }

  const character = user.characters[0]
  if (!character) {
    console.error('Character not found')
    process.exit(1)
  }
  console.log(`Found character: ${character.name} (ID: ${character.id})`)

  // 1. Give talent points
  await prisma.character.update({
    where: { id: character.id },
    data: { talentPoints: 10 },
  })
  console.log('Added 10 talent points')

  // 2. Get some skills to unlock
  const skills = await prisma.skill.findMany({
    take: 5,
  })

  if (skills.length === 0) {
    console.log('No skills found in database. Seeding skills first...')
    // You might want to run seed script here or just warn
  }

  // 3. Unlock skills
  for (const skill of skills) {
    await prisma.characterSkill.upsert({
      where: {
        characterId_skillId: {
          characterId: character.id,
          skillId: skill.id,
        },
      },
      update: {
        unlocked: true,
        currentRank: 1,
      },
      create: {
        characterId: character.id,
        skillId: skill.id,
        unlocked: true,
        currentRank: 1,
      },
    })
    console.log(`Unlocked skill: ${skill.name}`)
  }

  console.log('Done!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
