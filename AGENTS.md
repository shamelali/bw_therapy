# Serenity Therapy Marketplace — Agent Notes

## Demo mode

- Demo mode is forced via `.env.production` (`DEMO_MODE=1`) and activates automatically when `DATABASE_URL` is unset.
- `src/lib/demo-db.ts` mimics the drizzle query builder over in-memory arrays in `src/lib/demo-data.ts` (same imports as real DB via `@/lib/db-compat`).
- Push changes to the live hosts require: `npm run build`, then restart `next start -p 12000` and `next start -p 12001` (work-1 / work-2 proxies). Ports 12000/12001 map to https://work-1-whptrpnqvamicxhm.prod-runtime.all-hands.dev and https://work-2-whptrpnqvamicxhm.prod-runtime.all-hands.dev.

## Demo accounts (password: `password123`)

| Role     | Email           | Notes                                  |
|----------|-----------------|----------------------------------------|
| Customer | john@demo.com   | `usr-customer-001`, John Doe           |
| Provider | sarah@demo.com  | `usr-provider-001`, Serenity Wellness  |
| Admin    | admin@demo.com  | `usr-admin-001`                        |

## Auth

- `src/lib/auth.ts` — session cookie handling (`jose`); `getCurrentUser()` reads the session.
- `src/lib/demo-auth.ts` — `signInWithSocial(provider)` find-or-creates a deterministic guest customer (`usr-google-guest`, `usr-apple-guest`, `usr-facebook-guest`, `usr-instagram-guest`).
- `POST /api/auth/social` — one-click social login (Google/Apple/Facebook/Instagram), no account needed (demo).
- `POST /api/auth/login` — email/password. Accepts optional `role`; rejects with `code: "wrong_role"` if the account's role doesn't match.
- Login is role-scoped: `/login` is a role chooser; `/login/customer|provider|admin` are the per-role pages. Customer page also has the 4 social buttons. Booking-widget redirects to `/login/customer?returnTo=/providers/<id>`; role login + social buttons honor `returnTo`.

## i18n

- Locales: `en` (default, unprefixed) and `ms` (under `/ms/...`). Dictionaries in `src/lib/i18n/dictionaries/{en,ms}.ts`; add keys to both when changing auth copy.

## Known pre-existing issues

- `next-auth` `/api/auth/session` errors at runtime without `NEXTAUTH_SECRET` — not caused by app code; the app's own `/api/auth/*` routes work fine.
- `npm run lint` reports ~37 pre-existing `react/no-unescaped-entities` errors; the project only enforces `npm run typecheck` (clean) and `npm run build` (clean).