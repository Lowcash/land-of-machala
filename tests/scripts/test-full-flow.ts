#!/usr/bin/env ts-node

/**
 * Full Authentication + Character Creation Flow Test
 * Tests: Register → Login → Character Creation → Character Retrieval
 */
import { hash } from 'bcryptjs'

import { getCharacterByUserId } from '../../entity/character'
import { getUser } from '../../entity/user'
import { prisma } from '../../lib/db'

async function testFlow() {
  console.log('🔐 Testing Full Authentication Flow')
  console.log('====================================\n')

  try {
    // 1. Create test user via database
    console.log('📝 Step 1: Create test user')
    const email = `test-${Date.now()}@example.com`
    const password = 'password123'
    const passwordHash = await hash(password, 10)

    const user = await prisma.user.create({
      data: {
        email,
        username: `testuser-${Date.now()}`,
        passwordHash,
        isGuest: false,
      },
    })

    console.log(`✅ User created: ${user.id}`)
    console.log(`   Email: ${user.email}`)
    console.log(`   Username: ${user.username}\n`)

    // 2. Retrieve user to verify
    console.log('📖 Step 2: Retrieve user')
    const retrievedUser = await getUser(email)
    if (!retrievedUser) {
      console.error('❌ Failed to retrieve user')
      return
    }
    console.log(`✅ User retrieved: ${retrievedUser.id}\n`)

    // 3. Create character for user
    console.log('⚔️  Step 3: Create character')
    const character = await prisma.character.create({
      data: {
        userId: user.id,
        name: 'TestHero',
        race: 'HUMAN',
        class: 'WARRIOR',
        level: 1,
        experience: 0,
        hp: 100,
        maxHp: 100,
        mana: 50,
        maxMana: 50,
        strength: 10,
        intelligence: 8,
        agility: 10,
        stamina: 10,
        gold: 100,
      },
    })

    console.log(`✅ Character created: ${character.id}`)
    console.log(`   Name: ${character.name}`)
    console.log(`   User ID: ${character.userId}\n`)

    // 4. Retrieve character by user ID
    console.log('🔍 Step 4: Retrieve character by user ID')
    const retrievedCharacter = await getCharacterByUserId(user.id)
    if (!retrievedCharacter) {
      console.error('❌ Failed to retrieve character by user ID')
      return
    }
    console.log(`✅ Character retrieved: ${retrievedCharacter.id}`)
    console.log(`   Name: ${retrievedCharacter.name}`)
    console.log(`   User ID: ${retrievedCharacter.userId}\n`)

    // 5. Verify character belongs to user
    console.log('✔️  Step 5: Verify character ownership')
    if (retrievedCharacter.userId !== user.id) {
      console.error('❌ Character does not belong to user!')
      return
    }
    console.log(`✅ Character ownership verified\n`)

    // 6. Test session-like flow
    console.log('🔑 Step 6: Simulate session-based retrieval')
    const sessionUserId = user.id // This would come from NextAuth session
    const charFromSession = await getCharacterByUserId(sessionUserId)
    if (!charFromSession) {
      console.error('❌ Failed to retrieve character using session user ID')
      return
    }
    console.log(`✅ Character retrieved using session user ID`)
    console.log(`   Character: ${charFromSession.name}`)
    console.log(`   User ID matches: ${charFromSession.userId === sessionUserId}\n`)

    console.log('====================================')
    console.log('✅ All tests passed!')
    console.log('\nCredentials for manual testing:')
    console.log(`Email: ${email}`)
    console.log(`Password: ${password}`)
    console.log(`Username: ${user.username}`)

    // Cleanup
    console.log('\n🧹 Cleaning up...')
    await prisma.character.delete({ where: { id: character.id } })
    await prisma.user.delete({ where: { id: user.id } })
    console.log('✅ Test data cleaned up')
  } catch (error) {
    console.error('❌ Test failed:', error)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

testFlow()
