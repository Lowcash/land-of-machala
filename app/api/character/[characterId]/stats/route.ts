import { auth } from '@/lib/auth'
import { prisma } from '@/lib/db'
import { NextResponse } from 'next/server'

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ characterId: string }> }
) {
  try {
    const session = await auth()

    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { characterId } = await params

    // Get character with user check
    const character = await prisma.character.findFirst({
      where: {
        id: characterId,
        user: {
          email: session.user.email,
        },
      },
      select: {
        locationX: true,
        locationY: true,
        gold: true,
      },
    })

    if (!character) {
      return NextResponse.json({ error: 'Character not found' }, { status: 404 })
    }

    return NextResponse.json({
      x: character.locationX,
      y: character.locationY,
      gold: character.gold,
    })
  } catch (error) {
    console.error('Error fetching player stats:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
