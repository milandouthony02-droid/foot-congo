# Project Guidance

## User Preferences

- Application mobile adaptée aux téléphones Android
- Interface moderne, rapide et facile à utiliser
- Langue française
- Navigation simple en bas de l'écran
- Emplacements publicitaires réservés prêts à recevoir des annonces plus tard

## Verified Commands

- **typecheck**: `pnpm typecheck`
- **fix**: `pnpm fix`
- **build**: `pnpm build`

## Learnings

- TanStack Router code-based routing: routes.tsx declares validateSearch for every search param; navigate({ search: (prev) => ({...prev, key}) }) preserves the others.
- MatchStatus is a value enum in backend.d.ts — use MatchStatus.upcoming/live/finished, never string literals, in components and test fixtures.
- Backend IDs are bigint: convert with BigInt(id) from route params and .toString() for display/URLs.
- Enhanced Migration: seed/demo data must be inserted inside the migration function body (the single init entry point), never in the actor body or preupgrade/postupgrade.
- OQL: records with nested records/arrays/options/variants need .toEntityManual with .payload/.flatten; primitive-only records can use .toEntity. Every entity chain needs .sample(...).
- Motoko text literals do not support backslash-newline continuation; keep long literals on one line with explicit \n escapes.
- getApiDoc belongs in its own parameterless mixin (mixin () { ... }) returning the Markdown literal; top-level bindings in a mixin become stable state and trap at runtime.
- Dark-first design: OKLCH tokens are mirrored into :root as well as .dark so the UI renders correctly before the dark class is applied.
- The fixed bottom nav uses the .pb-nav utility (padding-bottom = --nav-height + safe-area) so content is never covered on Android.
- Generated-app tests live under src/frontend/src/test (Vitest + RTL) plus a PocketIC backend lane at test/pocketic; the root test script composes both.
