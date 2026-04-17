# Land of Machala - Backlog

## Active Tasks
- [ ] Prepare a staged Stitch redesign for landing/auth entry, registration, onboarding, and character creation using a stable reference pack.
- [ ] Confirm the root-first SSR route model and minimal locale URL strategy before runtime implementation.
- [ ] Choose the first backend stack: Postgres, Prisma, server-managed sessions, and no Redis on day one.
- [ ] Implement server-side character validation in the Origins wizard.
- [ ] Decide whether launch measurement should stay Vercel Analytics-only and whether monitoring justifies a public shallow `/health` endpoint.
- [ ] Add loading skeletons or route-level loading states for auth transitions.
- [ ] Decide whether route-level `loading.tsx` or feature-level suspense boundaries fit the current auth flow better.

## Product Ideas
- [ ] Add server-backed save or resume flow so SSR can restore the player to the correct game state.
- [ ] Add codex or journal surfaces for revealed lore, quests, and discovered places.
- [ ] Add release-readiness checklist for domain, Vercel deployment, Search Console, analytics, and launch hardening.
- [ ] Evaluate production error tracking and decide whether Sentry is the default choice.
- [ ] Add accessibility and reduced-motion review pass for gameplay UI.
- [ ] Add localization rollout plan with Czech and English first, then additional locales based on real demand.
