import 'dotenv/config'
import { defineConfig } from 'prisma/config'
import { z } from 'zod'

const prismaEnvSchema = z.object({
  DATABASE_URL: z.string().min(1),
})

const prismaEnv = prismaEnvSchema.parse({
  DATABASE_URL:
    process.env.DATABASE_URL ??
    'postgresql://postgres:postgres@localhost:5432/land_of_machala?schema=public',
})

export default defineConfig({
  schema: 'prisma/schema.prisma',
  migrations: {
    path: 'prisma/migrations',
  },
  datasource: {
    url: prismaEnv.DATABASE_URL,
  },
})
