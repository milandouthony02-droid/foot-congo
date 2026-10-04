# Design Brief

## Direction

Stade Électrique — a dark-first, broadcast-grade football app for Congolese football, built for one-handed Android use.

## Tone

High-energy sporty and confident — deep pitch-dark surfaces with an electric green signal color, treated like a live match broadcast rather than a generic news feed.

## Differentiation

A "match ticker" scoreline system: sharp 2px radius score chips with tabular numerals, a pulsing live dot, and a tricolor brand bar that runs through the header and active states.

## Color Palette

| Token      | OKLCH          | Role                                              |
| ---------- | -------------- | ------------------------------------------------- |
| background | 0.16 0.02 158  | App canvas, deep pitch-dark green-black           |
| foreground | 0.96 0.01 150  | Primary text, near-white with green cast          |
| card       | 0.205 0.024 158| Elevated content surfaces (news, teams, players)  |
| primary    | 0.72 0.19 150  | Electric green — CTAs, active nav, live indicators|
| accent     | 0.84 0.18 92   | Congolese yellow — badges, standings top zone     |
| destructive| 0.62 0.24 27   | Congolese red — live tags, relegation zone        |
| muted      | 0.25 0.024 158 | Secondary surfaces, filter chips, ad slots        |

## Typography

- Display: Space Grotesk — headers, section titles, team names, scorelines
- Body: Plus Jakarta Sans — paragraphs, labels, metadata, navigation
- Mono: Geist Mono — dates, stats tables, standings numbers
- Scale: hero `text-3xl font-bold tracking-tight`, h2 `text-xl font-bold tracking-tight`, label `text-xs font-semibold tracking-widest uppercase`, body `text-sm`/`text-base`

## Elevation & Depth

Layered dark surfaces (background → card → popover) separated by 1px low-contrast borders; depth via `shadow-subtle` for resting cards and `shadow-elevated` for the fixed bottom nav and active score cards. No glow or neon.

## Structural Zones

| Zone    | Background                    | Border        | Notes                                              |
| ------- | ----------------------------- | ------------- | -------------------------------------------------- |
| Header  | `bg-card` + tricolor bar      | `border-b`    | Sticky top; "FOOT CONGO" wordmark, back on detail  |
| Content | `bg-background`               | —             | Alternate `bg-muted/30` sections for rhythm        |
| Ads     | `bg-muted/40`, dashed border  | `border-dashed`| Reserved banner slots labeled "ESPACE PUBLICITAIRE"|
| Footer  | `bg-card` fixed bottom nav    | `border-t`    | 5 tabs, active tab green with icon + label         |

## Spacing & Rhythm

Mobile-first at 360–430px; page gutter `px-4`, section gap `space-y-6`, card padding `p-4`, micro-spacing `gap-2`/`gap-3`; content bottom padding uses `.pb-nav` to clear the fixed nav.

## Component Patterns

- Buttons: full-radius pills for filters, `rounded-md` for primary actions, green fill with dark text; hover/active darkens via `transition-smooth`
- Cards: `rounded-xl bg-card border border-border shadow-subtle`, press feedback `active:scale-[0.99]`
- Badges: sharp `rounded-sm` score/status chips; green = live, yellow = upcoming, muted = finished, red = relegation/live tag

## Motion

- Entrance: subtle `fade-in-up` on cards, 300ms ease-out, staggered ~40ms
- Hover: color/border shift on `transition-smooth`; no bounce
- Decorative: `pulse-live` on the live dot, `shimmer` on ad placeholders

## Constraints

- French-language interface only; all labels in French
- Dark theme is the default and primary; do not design a light variant
- Tokens only — no raw hex, `rgb()`, or arbitrary color classes in components
- Fixed bottom nav must never overlap content (use `.pb-nav`)
- Ad slots are reserved placeholders only — no ad SDK integration

## Signature Detail

The match ticker: horizontally snap-scrolling score cards with tabular-numeral scorelines, a pulsing green live dot, and a tricolor brand bar — a broadcast identity no generic news app has.
