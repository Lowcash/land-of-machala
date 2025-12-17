import { prisma } from '@/lib/db'
import { hash } from 'bcryptjs'
import { NextResponse } from 'next/server'
import { z } from 'zod'

const registerSchema = z.object({
  email: z.string().email('Neplatný formát emailu'),
  password: z.string().min(6, 'Heslo musí mít alespoň 6 znaků'),
  username: z.string().min(3, 'Jméno musí mít alespoň 3 znaky').optional(),
})

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { email, password, username } = registerSchema.parse(body)

    if (!email) {
      return NextResponse.json({ message: 'Email je vyžadován' }, { status: 400 })
    }

    const existingUser = await prisma.user.findUnique({
      where: { email },
    })

    if (existingUser) {
      return NextResponse.json(
        { message: 'Uživatel s tímto emailem již existuje' },
        { status: 409 }
      )
    }

    const hashedPassword = await hash(password, 10)

    const user = await prisma.user.create({
      data: {
        email,
        passwordHash: hashedPassword,
        username: (username || email.split('@')[0]) as string,
        isGuest: false,
      },
    })

    const { passwordHash: _, ...userWithoutPassword } = user

    return NextResponse.json(
      { user: userWithoutPassword, message: 'Uživatel úspěšně vytvořen' },
      { status: 201 }
    )
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { message: error.errors[0]?.message || 'Neplatná data' },
        { status: 400 }
      )
    }
    return NextResponse.json({ message: 'Něco se pokazilo' }, { status: 500 })
  }
}
