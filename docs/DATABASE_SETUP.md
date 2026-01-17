# Database Setup Guide

## PostgreSQL with Docker

This project uses PostgreSQL as the database. The easiest way to run PostgreSQL locally is using Docker.

### Prerequisites

- Docker Desktop installed ([Download here](https://www.docker.com/products/docker-desktop))

### Quick Start

1. **Start PostgreSQL container:**

   ```bash
   docker-compose up -d
   ```

   This will:
   - Download PostgreSQL 16 image (first time only)
   - Start PostgreSQL on `localhost:5432`
   - Create database `land_of_machala`
   - Use credentials: `postgres/postgres`

2. **Verify database is running:**

   ```bash
   docker-compose ps
   ```

   You should see `land-of-machala-db` with status `Up`.

3. **Run Prisma migrations:**

   ```bash
   npm run db:migrate
   ```

4. **Seed the database (optional):**

   ```bash
   npm run db:seed
   ```

### Database Management

**Stop database:**

```bash
docker-compose down
```

**Stop and delete all data:**

```bash
docker-compose down -v
```

**View database logs:**

```bash
docker-compose logs -f postgres
```

**Access PostgreSQL CLI:**

```bash
docker exec -it land-of-machala-db psql -U postgres -d land_of_machala
```

### Troubleshooting

**Port 5432 already in use:**

If you have PostgreSQL running locally, either:

1. Stop local PostgreSQL: `brew services stop postgresql` (macOS)
2. Change port in `docker-compose.yml`: `"5433:5432"` and update `DATABASE_URL` in `.env`

**Connection refused:**

1. Check Docker is running: `docker ps`
2. Check database health: `docker-compose ps`
3. Restart containers: `docker-compose restart`

**Prisma errors:**

1. Regenerate Prisma Client: `npm run db:generate`
2. Reset database: `npm run db:reset` (⚠️ deletes all data)

### Environment Variables

Your `.env` should have:

```
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/land_of_machala?schema=public"
```

### Production

For production deployment (Vercel, Railway, etc.), use managed PostgreSQL services:

- **Vercel:** Vercel Postgres
- **Railway:** Railway PostgreSQL
- **Supabase:** Supabase Database
- **Neon:** Neon PostgreSQL

Update `DATABASE_URL` in production environment variables.

---

**Last Updated:** 2026-01-17
