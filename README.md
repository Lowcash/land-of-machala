# Land of Machala

A premium medieval fantasy RPG experience built with Next.js and modernized Tailwind CSS.

The current focus is a pre-alpha reset: one canonical root surface, hidden locale handling, Czech and English only, and a pragmatic MVP architecture before deeper backend or final visual polish.

## Current Status

This repository is canonical source of truth for architecture, design packets, Storybook baselines, and runtime implementation.

Current repository contents include:

- top-level architecture docs under `docs/`
- scalable design packet docs under `docs/design/`
- Storybook and Next.js runtime under `src/`, `.storybook/`, and project config
- shared public assets under `public/`

Archived design experiments may still live under `local/`, but active approval now happens in Storybook.

## Architecture

The top-level architecture overview and doc map live in [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md).

Frontend runtime, UI layering, styling, and testing boundaries live in [docs/FRONTEND_ARCHITECTURE.md](docs/FRONTEND_ARCHITECTURE.md).

The current backend direction, persistence posture, and session model live in [docs/BACKEND_ARCHITECTURE.md](docs/BACKEND_ARCHITECTURE.md).

Design system, root-flow packets, and canonical screen packets live under [docs/design/README.md](docs/design/README.md).

## Development Setup

```bash
npm install
npm run dev
```

## Key Commands

- `npm run dev` starts the local development server.
- `npm run lint` runs ESLint.
- `npm run typecheck` runs TypeScript without emitting output.
- `npm run test` runs the Vitest suite.
- `npm run storybook` starts Storybook.
- `npm run build` creates a production build.
- `npm run preview` runs the production build locally on `127.0.0.1:3000`.
- `npm run format` formats the repository with Prettier.

For the full script surface, see `package.json`.

Repository-specific coding guidance lives under `.github/`, with focused instruction files for architecture, App Router, testing, design system boundaries, and i18n or mutation patterns.
