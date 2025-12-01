<<<<<<< HEAD

## Land of Machala App

A mystical realm of magic and adventure - a browser-based RPG game built with Next.js.

### Getting Started

```bash
# Install dependencies
npm install

# Generate Prisma client
npm run prisma:generate

# Run development server
npm run dev

# Build for production
npm run build
```

### Testing

The project uses a comprehensive testing setup:

- **Unit Tests**: Vitest for testing server actions, game logic, and utility functions
- **Integration Tests**: Testing Library for component testing
- **E2E Tests**: Playwright for end-to-end testing

```bash
# Run unit and integration tests
npm run test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage

# Run E2E tests
npm run test:e2e
```

### Architecture

- `app/` - Next.js App Router pages and server actions
- `components/` - Reusable UI components
- `entity/` - Game entity logic
- `lib/` - Utility functions and shared modules
- `hooks/` - React hooks for data fetching and state management
- `prisma/` - Database schema and migrations

### Features

- Character creation with races and classes
- Exploration and movement system
- Combat system with enemies
- Quest system
- Inventory management
- Bank system for item storage
- Hospital for healing

For more details, see `docs/INSIGHTS.md`.

=======

# 🎮 Land of Machala

> A browser-based fantasy RPG built with Next.js 15, React 19, and TypeScript

[![Next.js](https://img.shields.io/badge/Next.js-15.3-black?style=flat&logo=next.js)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-19.0-blue?style=flat&logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?style=flat&logo=typescript)](https://www.typescriptlang.org)
[![Prisma](https://img.shields.io/badge/Prisma-6.3-2D3748?style=flat&logo=prisma)](https://www.prisma.io)

**Live Demo:** [land-of-machala.cz](https://land-of-machala.cz) _(if deployed)_

---

## 📖 About

Land of Machala is a single-player RPG where you create a character, explore a fantasy world, battle enemies, complete quests, and manage your inventory. The game features a unique **single-URL navigation** system that maintains a clean browser experience while leveraging Next.js server-side rendering.

### Key Features

- 🎭 **Character System** - Choose from multiple races and classes
- ⚔️ **Turn-Based Combat** - Fight enemies with strategic decision-making
- 📜 **Quest System** - Complete objectives for rewards
- 🎒 **Inventory Management** - Collect weapons, armor, and potions
- 🏦 **Economy** - Buy/sell items, manage bank accounts
- 🏥 **Safe Zones** - Hospitals, banks, and markets in cities
- 🗺️ **Exploration** - Grid-based world with diverse terrains

---

## 🚀 Quick Start

### Prerequisites

- **Node.js** 20.x or 22.x ([Download](https://nodejs.org))
- **MySQL** 8.0+ (or Docker for containerized setup)
- **npm** 10+ (comes with Node.js)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/Lowcash/land-of-machala.git
cd land-of-machala

# 2. Install dependencies
npm install

# 3. Setup environment variables
cp .env.example .env
# Edit .env with your database credentials (see Configuration below)

# 4. Setup database
docker-compose -f deploy/docker-compose.yml up -d  # Start MySQL in Docker
npm run prisma:update                               # Apply schema to DB

# 5. Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) and start playing! 🎉

---

## ⚙️ Configuration

### Environment Variables

Create a `.env` file in the project root:

```env
# Database Connection (MySQL)
DATABASE_URL="mysql://username:password@localhost:3306/land_of_machala"

# NextAuth Configuration
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-super-secret-key-min-32-chars"  # Generate: openssl rand -base64 32

# Optional: Node Environment
NODE_ENV="development"
```

### Database Setup Options

#### Option 1: Docker (Recommended for Development)

```bash
# Start MySQL container from deploy/docker-compose.yml
docker-compose -f deploy/docker-compose.yml up -d

# Verify it's running
docker ps | grep mysql

# DATABASE_URL should be:
# mysql://root:password@localhost:3306/land_of_machala
```

#### Option 2: Local MySQL Installation

```bash
# Install MySQL 8.0+ on your system
# Then create database:
mysql -u root -p
CREATE DATABASE land_of_machala;
exit

# Update DATABASE_URL in .env with your credentials
```

#### Option 3: Remote MySQL (PlanetScale, AWS RDS, etc.)

```bash
# Get connection string from your provider
# Update DATABASE_URL in .env
# Run prisma:update to apply schema
```

---

## 🛠️ Development

### Available Scripts

```bash
# Development
npm run dev              # Start Next.js dev server (localhost:3000)
npm run build            # Build for production
npm run start            # Start production server
npm run lint             # Run ESLint

# Database Operations
npm run prisma:update    # Push schema changes to database (dev)
npm run prisma:reset     # Reset database (⚠️ DESTRUCTIVE - deletes all data)
npm run prisma:generate  # Regenerate Prisma Client after schema changes
npm run prisma:seed      # Seed database with initial game data
npx prisma studio        # Open Prisma Studio GUI for database inspection

# Testing
npm test                 # Run all tests
npm run test:watch       # Run tests in watch mode
npm run test:e2e         # Run end-to-end tests
```

### Development Workflow

1. **Make code changes** - Edit files in `app/`, `components/`, `lib/`, etc.
2. **Hot reload activates** - Next.js automatically refreshes the browser
3. **Run type-check** - `npx tsc --noEmit` to catch TypeScript errors
4. **Test changes** - Create account → Create character → Test feature
5. **Update documentation** - Add entry to `CHANGELOG.md` with timestamp

### Common Development Tasks

**Add a new game feature:**

```bash
# 1. Define Prisma schema (prisma/schema/*.prisma)
# 2. Apply schema: npm run prisma:update
# 3. Create entity file (entity/*.ts)
# 4. Create Zod schema (zod-schema/*.ts)
# 5. Create server actions (app/actions/*.ts)
# 6. Create React hooks (hooks/api/*.ts)
# 7. Create UI components (components/app/*.tsx)
# 8. Add tests (__tests__/*)
```

**Debug Server Actions:**

```bash
# Server Actions run on the server, so console.logs appear in terminal
npm run dev
# Check terminal output, not browser console
```

**Reset game state for testing:**

```bash
npm run prisma:reset  # ⚠️ Deletes all data including accounts
```

---

## 📁 Project Structure

```
land-of-machala/
├── app/                      # Next.js App Router
│   ├── (game)/              # Game routes (world, quest, inventory)
│   │   ├── _hydration.tsx   # TanStack Query prefetching
│   │   ├── world/           # Main game world page
│   │   ├── quest/           # Quest management page
│   │   └── inventory/       # Inventory management page
│   ├── actions/             # Server Actions (data mutations)
│   │   ├── player.ts        # Player-related actions
│   │   ├── armory.ts        # Shop actions
│   │   ├── quest.ts         # Quest actions
│   │   └── ...
│   ├── api/auth/            # NextAuth API routes
│   ├── landing/             # Landing/login page
│   ├── create/              # Character creation page
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Main router (cookie-based navigation)
│
├── components/              # React components
│   ├── app/                 # Game-specific components
│   │   ├── Character.tsx    # Character display
│   │   ├── Combat.tsx       # Combat UI
│   │   ├── Inventory.tsx    # Inventory grid
│   │   └── ...
│   ├── ui/                  # Radix UI primitives
│   │   ├── button.tsx
│   │   ├── form.tsx
│   │   └── ...
│   └── Form.tsx             # Generic form with validation
│
├── entity/                  # Data entities + type guards
│   ├── player.ts            # Player entity + hasCharacter()
│   ├── enemy.ts             # Enemy types
│   ├── armor.ts, weapon.ts  # Equipment entities
│   └── ...
│
├── lib/                     # Core libraries
│   ├── auth.ts              # NextAuth configuration
│   ├── db.ts                # Prisma client instance
│   ├── safe-action.ts       # Server Action middleware
│   ├── query.ts             # TanStack Query utilities
│   ├── i18n.ts              # Internationalization
│   └── manager/             # Business logic
│       ├── game.ts          # Combat, defeat, spawning
│       └── reward.ts        # Loot calculation
│
├── hooks/                   # React hooks
│   └── api/                 # TanStack Query hooks
│       ├── player.ts        # usePlayerShowQuery(), etc.
│       └── ...
│
├── prisma/                  # Database schema
│   └── schema/              # Split schema files
│       ├── schema.prisma    # Main config
│       ├── user.prisma      # User/Player models
│       ├── enemy.prisma     # Enemy models
│       └── ...
│
├── zod-schema/              # Validation schemas
│   ├── player.ts            # playerCreateSchema, etc.
│   └── ...
│
├── config/                  # Configuration constants
│   ├── index.ts             # Game constants (BASE_HP, etc.)
│   ├── routes.ts            # Route constants
│   └── query-keys.ts        # React Query keys
│
├── styles/                  # Global styles
│   └── globals.css          # Tailwind base + custom CSS
│
├── locales/                 # Translations
│   └── cs.json              # Czech translations
│
├── .github/                 # GitHub configuration
│   ├── workflows/           # CI/CD pipelines (needs update)
│   ├── copilot-instructions.md
│   └── PULL_REQUEST_TEMPLATE.md
│
├── INSIGHTS.md              # Architecture documentation
├── TODO.md                  # Active tasks
├── CHANGELOG.md             # Version history
├── DEVELOPMENT.md           # Contributor guide
└── README.md                # This file
```

---

## 🏗️ Tech Stack

### Core Framework

- **Next.js 15.3** - React framework with App Router, Server Components, Server Actions
- **React 19.0** - UI library with new Compiler support
- **TypeScript 5.x** - Type-safe development

### Database & ORM

- **Prisma 6.3** - Type-safe database ORM
- **MySQL 8.0+** - Relational database

### State Management

- **TanStack Query 5.x** - Server state management, caching, prefetching
- **React Hook Form 7.x** - Form state management
- **Zod 3.x** - Schema validation

### Authentication

- **NextAuth 4.24** - Authentication with Prisma adapter
- **bcrypt** - Password hashing

### UI & Styling

- **Tailwind CSS 3.4** - Utility-first CSS framework
- **Radix UI** - Unstyled, accessible component primitives
- **Framer Motion 12.x** - Animation library
- **Lucide React** - Icon library

### Developer Tools

- **ESLint** - Code linting
- **Prettier** - Code formatting
- **TypeScript** - Type checking
- **Vercel Speed Insights** - Performance monitoring

---

## 🎮 Game Mechanics

### Character Creation

1. Sign up with email/password
2. Choose race (Human, Elf, Dwarf, etc.)
3. Choose class (Warrior, Mage, Rogue, etc.)
4. Start at spawn point (0, 0)

### Combat System

- **Turn-based** - Player attacks → Enemy attacks → Repeat
- **Damage calculation** - Based on weapon + stats vs enemy defense
- **Victory rewards** - XP, gold, loot drops
- **Defeat penalty** - Lose inventory, respawn at base

### Progression

- **XP system** - Gain XP from combat, level up for stat increases
- **Equipment** - Weapons and armor improve combat effectiveness
- **Quests** - Complete objectives for rewards
- **Economy** - Earn gold, buy better equipment

### World Navigation

- **Grid-based movement** - Move up/down/left/right
- **Terrain types** - Forest, desert, hills, roads, farms
- **Safe zones** - Cities with banks, hospitals, markets, armories
- **Enemy encounters** - Random spawns when moving in wilderness

---

## 🧪 Testing (Coming Soon)

Testing infrastructure is in development. Planned setup:

```bash
# Unit tests (Vitest)
npm test

# Component tests (Testing Library)
npm run test:component

# End-to-end tests (Playwright)
npm run test:e2e

# Coverage report
npm run test:coverage
```

See [TODO.md](./TODO.md) for testing setup progress.

---

## 📚 Documentation

- **[INSIGHTS.md](./INSIGHTS.md)** - Architecture decisions, design patterns, trade-offs
- **[TODO.md](./TODO.md)** - Active tasks, roadmap, known issues
- **[CHANGELOG.md](./CHANGELOG.md)** - Version history, breaking changes
- **[DEVELOPMENT.md](./DEVELOPMENT.md)** - Detailed development guide, code standards

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. **Read documentation** - [INSIGHTS.md](./INSIGHTS.md) + [DEVELOPMENT.md](./DEVELOPMENT.md)
2. **Check TODO.md** - Find a task to work on
3. **Create feature branch** - `git checkout -b feature/your-feature`
4. **Write tests** - All new features require tests
5. **Update CHANGELOG.md** - Document your changes with timestamp
6. **Submit PR** - Use the PR template, link related issues

### Code Quality Requirements

- ✅ All tests passing
- ✅ Type-check passing (`npx tsc --noEmit`)
- ✅ Lint passing (`npm run lint`)
- ✅ CHANGELOG.md updated
- ✅ No breaking changes without migration guide

---

## 📄 License

This project is proprietary. All rights reserved.

---

## 🙏 Acknowledgments

- **Next.js Team** - Amazing React framework
- **Vercel** - Hosting platform
- **Radix UI** - Accessible component primitives
- **TanStack** - React Query library

---

## 📧 Contact

- **GitHub Issues** - For bugs and feature requests
- **Email** - (add your email if you want)

---

**Happy adventuring in the Land of Machala! ⚔️🏰✨**

> > > > > > > origin/dev
