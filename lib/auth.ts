import 'server-only'
import { db } from '@/lib/db'
import bcrypt from 'bcrypt'

import { type NextAuthOptions } from 'next-auth'
import { PrismaAdapter } from '@auth/prisma-adapter'
import CredentialsProvider from 'next-auth/providers/credentials'

export const authOptions = {
  adapter: PrismaAdapter(db),
  providers: [
    CredentialsProvider({
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null

        const user = await db.user.findUnique({ where: { email: credentials.email } })

        if (!user?.password) return null

        return (await bcrypt.compare(credentials.password, user.password)) ? user : null
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
} satisfies NextAuthOptions
