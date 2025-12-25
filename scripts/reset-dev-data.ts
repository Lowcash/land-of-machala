/**
 * Reset Development Data
 *
 * Wipes character data while preserving test users.
 * Use this when testing new UX changes from a fresh state.
 *
 * Usage: npm run db:reset-dev
 */

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function resetDevData() {
  console.log('🔄 Resetting development data...\n')

  try {
    // Delete character-related data
    console.log('Deleting character quest progress...')
    await prisma.characterQuest.deleteMany({})

    console.log('Deleting character skills...')
    await prisma.characterSkill.deleteMany({})

    console.log('Deleting inventory items...')
    await prisma.inventoryItem.deleteMany({})

    console.log('Deleting characters...')
    await prisma.character.deleteMany({})

    console.log('\n✅ Character data wiped successfully!')
    console.log('\nℹ️  User accounts preserved. Re-run onboarding to create new characters.')
    console.log('\n💡 To seed fresh test data, run: npm run db:seed')
  } catch (error) {
    console.error('❌ Error resetting data:', error)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

resetDevData()
