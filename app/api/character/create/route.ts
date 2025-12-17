import { auth } from '@/lib/auth'
import { prisma } from '@/lib/db'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const session = await auth()

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await req.json()
    const { name, race, class: characterClass, stats } = body

    if (!name || !race || !characterClass) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const existingCharacter = await prisma.character.findFirst({
      where: { userId: session.user.id },
    })

    if (existingCharacter) {
      return NextResponse.json({ error: 'Character already exists' }, { status: 400 })
    }

    // Fetch starter items
    const starterItems = await prisma.item.findMany({
      where: {
        name: { in: ['Iron Sword', 'Leather Armor', 'Health Potion'] },
      },
    })

    const character = await prisma.character.create({
      data: {
        userId: session.user.id,
        name,
        race,
        class: characterClass,
        strength: stats?.strength || 10,
        intelligence: stats?.intelligence || 10,
        agility: stats?.agility || 10,
        stamina: stats?.stamina || 10,
        level: 1,
        experience: 0,
        hp: stats?.hp || 100,
        maxHp: stats?.hp || 100,
        mana: stats?.mana || 50,
        maxMana: stats?.mana || 50,
        gold: 100,
        inventory: {
          create: starterItems.map((item) => ({
            itemId: item.id,
            quantity: item.name === 'Health Potion' ? 3 : 1,
            equipped: item.type === 'WEAPON' || item.type === 'ARMOR',
          })),
        },
      },
      include: {
        inventory: true,
      },
    })

    return NextResponse.json({ success: true, character }, { status: 201 })
  } catch (error) {
    console.error('Error creating character:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
