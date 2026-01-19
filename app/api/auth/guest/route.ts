import { prisma } from '@/lib/db'
import { hash } from 'bcryptjs'
import { randomBytes } from 'crypto'
import { NextResponse } from 'next/server'

export async function POST() {
  try {
    // Generate random credentials
    const randomId = randomBytes(4).toString('hex')
    const email = `guest_${randomId}@example.com`
    const password = randomBytes(8).toString('hex')
    const hashedPassword = await hash(password, 12)

    // Create guest user
    const user = await prisma.user.create({
      data: {
        email,
        passwordHash: hashedPassword,
        isGuest: true,
      },
    })

    return NextResponse.json({
      email,
      password,
      userId: user.id
    })
  } catch (error) {
    console.error('Guest login error:', error)
    return NextResponse.json({ error: 'Failed to create guest account' }, { status: 500 })
  }
}
