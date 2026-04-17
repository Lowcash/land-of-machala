# Launch Checklist

This checklist is for the first serious production launch of Land of Machala on Vercel.

## 1. Domain Strategy

- choose one canonical primary domain
- buy defensive secondary domains if affordable
- set up redirects from secondary domains to the canonical domain
- keep locale routing on the main domain using locale prefixes unless there is a strong product reason not to

### Recommended Default

- primary: `.com`
- defensive or local: `.cz`

Other TLDs like `.io`, `.dev`, or `.ai` can be used if they genuinely fit the brand, but they should not weaken clarity or memorability.

## 2. Vercel Setup

- configure production, preview, and development environments cleanly
- validate env vars at startup
- confirm image, cache, and region settings match the product needs
- ensure the canonical domain and redirects are configured

## 3. Metadata & SEO

- set metadata for landing and public discovery routes
- configure Open Graph and Twitter cards
- generate a strong default OG image
- add favicon and icon set
- verify robots and sitemap behavior
- connect Google Search Console

## 4. Analytics & Monitoring

- enable Vercel Analytics if useful
- decide whether Google Analytics is appropriate
- enable production error tracking, preferably Sentry or an equivalent tool
- confirm release or environment tagging is enabled for production diagnostics

## 5. Security & Abuse Protection

- secure session cookies: HttpOnly, Secure, SameSite, correct domain policy
- rate limit login, register, and sensitive mutation flows
- protect route handlers and webhook endpoints
- validate all server-side env and secret usage
- verify auth and progression checks run server-side

## 6. Persistence & Operations

- production Postgres provisioned
- migration workflow tested
- backups confirmed
- rollback posture defined for bad deploys or bad migrations
- schema and seed strategy documented

## 7. Accessibility & Performance

- reduced-motion behavior checked
- keyboard and focus behavior checked
- color contrast checked
- landing page Lighthouse reviewed
- core gameplay shell performance reviewed on representative devices

## 8. Content & Localization

- English and Czech copy reviewed
- locale routing verified
- public metadata localized where needed
- unrevealed narrative content kept out of client payloads

## 9. Product Readiness

- clear landing CTA
- login and register flows tested
- origins flow validated end-to-end
- save or resume path defined
- fallback error and not-found behavior reviewed

## 10. Optional Early Integrations

- newsletter or waitlist email capture if it serves product goals
- webhook support if third-party auth, billing, or email systems are added
- codex or journal route if it helps retention or SEO