import { auth } from '@/lib/auth'
import { prisma } from '@/lib/db'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const session = await auth()

    if (!session?.user?.id) {
      return NextResponse.json({ hasCharacter: false }, { status: 401 })
    }

    const character = await prisma.character.findFirst({
      where: { userId: session.user.id },
    })

    return NextResponse.json({ hasCharacter: !!character })
  } catch (error) {
    console.error('Check character error:', error)
    return NextResponse.json({ hasCharacter: false }, { status: 500 })
  }
}
