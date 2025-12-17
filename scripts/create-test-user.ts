import { PrismaClient } from '@prisma/client'
import { hash } from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🔐 Creating test user...')

  const hashedPassword = await hash('password123', 10)

  const user = await prisma.user.upsert({
    where: { email: 'test@example.com' },
    update: {},
    create: {
      email: 'test@example.com',
      passwordHash: hashedPassword,
      username: 'testuser',
    },
  })

  console.log('✅ User created:', user.email)

  // Create a character for the test user
  const character = await prisma.character.upsert({
    where: { id: 'test-character-id' },
    update: {},
    create: {
      userId: user.id,
      name: 'Test Hero',
      race: 'HUMAN',
      class: 'WARRIOR',
      level: 5,
      experience: 500,
      hp: 100,
      maxHp: 100,
      mana: 50,
      maxMana: 50,
      gold: 150,
      strength: 15,
      agility: 12,
      intelligence: 10,
      stamina: 14,
    },
  })

  console.log('✅ Character created:', character.name)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
