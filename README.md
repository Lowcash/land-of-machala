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

