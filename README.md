# Land of Machala

A premium medieval fantasy RPG experience built with Next.js and modernized Tailwind CSS.

This repository is also being shaped into a strong seed for future Next.js fullstack projects. The current focus is on keeping runtime boundaries, reusable UI layers, and validation tooling disciplined before extracting anything shared.

## ⚔️ Key Features
- **Premium Aesthetics**: Hand-crafted UI with medieval textures, parchment effects, and glassmorphism.
- **Narrative Onboarding**: Interactive story-driven tutorial to immerse players in the world.
- **Dynamic Character Creation**: Flexible system for choosing races, classes, and starting attributes.
- **Modern Tech Stack**: Next.js 15+, Tailwind CSS 4+ (modern variables), and Framer Motion for animations.
- **Internationalization**: Full support for multiple languages using `next-intl`.
- **Component-Driven Development**: Robust design system documented and tested via Storybook.

## 🛠️ Commands
| Command | Purpose |
| :--- | :--- |
| **`npm run dev`** | Start the development server. |
| **`npm run typecheck`** | Run TypeScript without emitting output. |
| **`npm run lint`** | Run ESLint across the repository. |
| **`npm run lint:fix`** | Apply automatic ESLint fixes where possible. |
| **`npm run format:check`** | Verify Prettier formatting. |
| **`npm run format`** | Format the repository with Prettier. |
| **`npm run test`** | Run the Vitest suite. |
| **`npm run test:e2e`** | Run Playwright end-to-end tests. |
| **`npm run test:e2e:ui`** | Open Playwright UI mode. |
| **`npm run storybook`** | Launch the component documentation environment. |
| **`npm run build-storybook`** | Build the Storybook site. |
| **`npm run build`** | Create a production-ready bundle. |
| **`npm run chromatic`** | Publish Storybook snapshots to Chromatic. |

## 📚 Documentation
For detailed technical architecture and design system principles, see [ARCHITECTURE.md](docs/ARCHITECTURE.md).

Repository-specific coding guidance lives under `.github/`, with focused instruction files for architecture, App Router, testing, design system boundaries, and i18n or mutation patterns.
