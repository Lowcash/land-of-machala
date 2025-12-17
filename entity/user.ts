import { prisma } from '@/lib/db'
import { hash } from 'bcryptjs'

/**
 * User Entity Layer
 * Handles user authentication and account management
 */

export async function getUser(email: string) {
  return await prisma.user.findUnique({
    where: { email },
    include: {
      characters: {
        select: {
          id: true,
          name: true,
          race: true,
          class: true,
          level: true,
        },
      },
    },
  })
}

export async function getUserById(id: string) {
  return await prisma.user.findUnique({
    where: { id },
    include: {
      characters: {
        select: {
          id: true,
          name: true,
          race: true,
          class: true,
          level: true,
        },
      },
    },
  })
}

export async function getUserByUsername(username: string) {
  return await prisma.user.findUnique({
    where: { username },
  })
}

export async function createUser(data: { email: string; username: string; password: string }) {
  const passwordHash = await hash(data.password, 12)

  return await prisma.user.create({
    data: {
      email: data.email,
      username: data.username,
      passwordHash,
    },
  })
}

export async function updateUser(
  id: string,
  data: {
    email?: string
    username?: string
    password?: string
  }
) {
  const updateData: {
    email?: string
    username?: string
    passwordHash?: string
  } = {}

  if (data.email) updateData.email = data.email
  if (data.username) updateData.username = data.username
  if (data.password) updateData.passwordHash = await hash(data.password, 12)

  return await prisma.user.update({
    where: { id },
    data: updateData,
  })
}

export async function deleteUser(id: string) {
  return await prisma.user.delete({
    where: { id },
  })
}
