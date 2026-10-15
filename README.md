# Table Tales

A mobile-first, editorial "pocket local guide" for Chicago food lovers who care about history and
community. Each restaurant gets a short **place story card** (about a 60-second read): the family,
the dish, the building, the neighborhood.

**Status: front end connected to Supabase, with passwordless (magic-link) accounts.** Anyone can browse place and trail **cards**; a signed-in account is needed for the full stories, saving, and notes. All of those rules are enforced by the database. If the Supabase env values are missing, the app falls back to built-in sample data so it always runs (insecure, development only).

> **All seed content is fictional.** Every place is named "(sample)", has `isPlaceholder: true`, and
> shows a "Sample content" badge. Do not replace it with real history unless it has been verified
> with the owner or primary sources.

## How to run

Requires Node.js 20+ (developed on Node 24).

```bash
npm install
cp .env.example .env.local   # then fill in your Supabase URL and publishable key
npm run dev
```

Then open http://localhost:5173. Without `.env.local` the app runs on the built-in mock data.

| Script                 | What it does                               |
| ---------------------- | ------------------------------------------ |
| `npm run dev`          | Dev server with hot reload                 |
| `npm run build`        | Type-check (`tsc -b`) and production build |
| `npm run preview`      | Serve the production build locally         |
| `npm run typecheck`    | Strict TypeScript check only               |
| `npm run lint`         | ESLint (`no-explicit-any` is an error)     |
| `npm run format`       | Prettier, write                            |
| `npm run format:check` | Prettier, check only                       |

**Testing error states:** with the **mock** data (no `.env.local`), add `?mockError` to the URL
(e.g. `http://localhost:5173/?mockError`) and every read fails, so you can see the error UI. The
flag does not affect Supabase; to test errors there, temporarily break the URL in `.env.local`.

## Tech stack

React + TypeScript (strict) + Vite, React Router, Tailwind CSS v4, TanStack Query, ESLint + Prettier.
No UI component library. Fonts (Fraunces, Source Serif 4, Inter) load from Google Fonts in
`index.html`.

## Project structure

```
src/
  main.tsx, App.tsx        Providers (QueryClient, Router) and the route table
  styles/index.css         Tailwind import + design tokens (CSS variables)
  types/                   Place, StorySection, Source, Trail, TrailStop, SavedStory, Note
  data/
    repositories.ts        PlacesRepository, TrailsRepository, SavedRepository interfaces
    index.ts               THE one place implementations are chosen
    mock/                  Mock implementations, seed files, artificial delay
    supabase/              Supabase client, generated DB types, row mappers, repositories
  hooks/                   TanStack Query hooks: the only way components get data
  lib/                     Pure helpers: format, share, storage, routes, query keys
  components/
    layout/                AppShell, BottomNav, SideNav, PageHeader, BackLink, NotFoundView
    ui/                    Button, Chip, Icon, Skeleton, EmptyState, ErrorState, SampleBadge...
    place/                 PlaceCard, StoryTag, SourceBadge, StorySectionBlock, WhatToOrder, ...
    trail/                 TrailCard, TrailStopItem
    discover/              SearchField, NeighborhoodChips
  pages/                   One component per route
supabase/migrations/       The SQL that built the database (schema, access rules, per-user tables)
supabase/seed/             Sample content SQL generated from the TypeScript seed
scripts/                   generate-seed-sql.ts: turns the sample seed into SQL
```

### Routes

| Path               | Screen                                   |
| ------------------ | ---------------------------------------- |
| `/`                | Discover (search, neighborhoods, trails) |
| `/places/:placeId` | Place story (full story needs sign-in)   |
| `/trails`          | Trails list                              |
| `/trails/:trailId` | Trail detail (stops need sign-in)        |
| `/saved`           | Saved stories and notes (needs sign-in)  |
| `*`                | Not found                                |

Search text and the selected neighborhood live in the URL (`/?q=mole&hood=Pilsen`), so the Back
button restores them.

## How the data layer works

```
 Component ──▶ hook (src/hooks) ──▶ repository (src/data/index.ts) ──▶ Supabase (or mock fallback)
```

1. **Types** (`src/types/`) describe the data.
2. **Repository interfaces** (`src/data/repositories.ts`) describe what the app can ask for
   (`listPlaces`, `getPlace`, `searchPlaces`, `listTrails`, `getTrail`, `listSaved`, `saveStory`,
   `unsaveStory`, `addNote`, ...). Every method is async.
3. **Mock implementations** (`src/data/mock/`) satisfy those interfaces using seed arrays and
   `localStorage`, plus an instant fake sign-in. `delay()` adds 100 to 600 ms of latency so loading
   states are exercised. They do not enforce sign-in rules.
4. **Supabase implementations** (`src/data/supabase/`) satisfy the same interfaces for places,
   trails, saved stories, and auth. `database.types.ts` is generated from the schema, and
   `mappers.ts` converts database rows (snake_case) into the app's types (camelCase), so the UI sees
   identical shapes either way.
5. **`src/data/index.ts`** exports `placesRepo`, `trailsRepo`, `savedRepo`, and `authRepo`. It is the
   only file that knows which implementation is in use: Supabase when both env values are set, mock
   otherwise.
6. **Hooks** (`src/hooks/`) wrap the repositories in TanStack Query. **Components never import
   from `src/data/mock`** and never import repositories directly; they only use hooks.

Query keys are centralized in `src/lib/queryKeys.ts`. Mutations invalidate the `saved` keys so the
Saved screen and the Save button stay in sync.

Cards vs stories: `PlaceSummary` (public card fields) and `Place` (the full story) are separate
types, mirroring the database split. `addNote` on an unsaved story saves it first. In the mock, saved
data lives in `localStorage` (`table-tales:saved:v1`).

## Design tokens

Colours live as CSS variables in `src/styles/index.css` (`--surface`, `--ink`, `--accent`, ...) and
are exposed to Tailwind through `@theme inline` (`bg-surface`, `text-ink`, `bg-accent`, ...).
Dark mode is intentionally not built, but is structured for: override the variables under a `.dark`
selector or a `prefers-color-scheme` query and no component needs to change.

Accessibility basics: 44px minimum tap targets, a visible focus ring, a skip link, semantic
landmarks, and focus moves to `<main>` on route changes. Motion respects `prefers-reduced-motion`.

## Sharing

The Share button uses the Web Share API (the native share sheet on most phones) and falls back to
copying the link. The Web Share API requires HTTPS (`localhost` counts). Every place and trail has a
stable URL, so shared links keep working. Rich link previews (title and image in iMessage, Slack,
etc.) need server-rendered meta tags and are a back-end-phase task. Sharing between users inside the
app (shared lists, sending a story to a friend) would need accounts and is out of scope for now.

## Accounts, access rules, and Supabase

Project: **Table Tales** (`wvndggtygmztsvtwjgum`, region us-west-2).

### What people can do

| Who              | Can do                                                                    |
| ---------------- | ------------------------------------------------------------------------- |
| Signed out       | Browse and search **cards** (place and trail summaries), neighborhoods    |
| Signed in        | Everything above, plus the **full story**, trail stops, saving, and notes |
| Nobody (browser) | Create, edit, or delete places and trails (admins only, outside the app)  |

Sign-in is **passwordless**: the person types an email, Supabase emails a one-time link, and opening
it signs them in (and creates the account the first time). There are no passwords to store or leak.

### The rules live in the database

The browser talks to Supabase directly with a **public** key, so every rule is enforced by the
database (Row Level Security + privileges + constraints), not by the screens. Hiding something in the
UI is only a convenience; the database is what actually refuses.

| Table                                              | Signed out | Signed in                     |
| -------------------------------------------------- | ---------- | ----------------------------- |
| `places`, `trails`, `neighborhoods` (cards)        | read       | read                          |
| `place_details`, `place_sections`, `place_sources` | no access  | read                          |
| `trail_stops`                                      | no access  | read                          |
| `saved_stories`, `notes`                           | no access  | read/add/delete **their own** |
| `place_closure_reports`                            | no access  | report/withdraw **their own** |

- **Per-user data:** `saved_stories` and `notes` carry a `user_id` that defaults to the caller
  (`auth.uid()`); policies only let a user see or change rows where it matches them. A user cannot
  read, write, or impersonate anyone else (tested).
- **Note rules are table constraints:** 1 to 1000 characters after trimming; a note must belong to a
  saved story; unsaving a story deletes its notes.
- **`add_note()`** is a database function that saves the story (if needed) and adds the note in one
  step. It runs with the caller's own rights, so the same rules apply inside it.
- **"Mark as closed" is a report, not an action.** A signed-in person can report a place (one report per
  person per place) and withdraw it; reports are private to that person. Nothing public changes.
  An admin reviews `place_closure_reports` in the Supabase table editor and, if confirmed, sets
  `places.is_closed = true`, which shows a "Closed" label on the card and story page. People can never
  set `is_closed` themselves (the browser has no write access to `places`).
- **Search runs in the database** against `places.search_text`, which only ever contains public card
  fields, so searching can never reveal gated text.
- **In the app:** signed-out pages never even request gated data, and signing in or out clears the
  query cache so one person's data is never left in memory for the next.
- **Keys:** the `sb_publishable_...` key in `.env.local` is public by design. **Never** put the
  `service_role` / secret key in the front end or in any `VITE_` variable.
- **Dev fallback:** without Supabase env values the app uses mock data and an instant fake sign-in.
  The mock has **no security**; it exists so the app runs offline.

### One-time dashboard setup (magic links)

In the Supabase dashboard, **Authentication > URL Configuration**:

1. **Site URL:** `http://localhost:5173` (change to the real domain when you host it).
2. **Redirect URLs:** add `http://localhost:5173/**` (and `https://your-domain/**` later).

Without this, the emailed link sends people to the wrong address and sign-in appears to fail.

**Email limits:** Supabase's built-in email sender is for testing only: it is heavily rate-limited
and may only deliver to members of your Supabase organization. Before public launch, set up a custom
SMTP provider under **Authentication > Emails > SMTP Settings**.

### Migrations (applied in order)

| File                                    | What it does                                                          |
| --------------------------------------- | --------------------------------------------------------------------- |
| `0001_places_and_trails.sql`            | Tables, enums, constraints, search trigger, `neighborhoods` view, RLS |
| `0002_seed_sample_content.sql`          | The first sample content (history; superseded by `supabase/seed/`)    |
| `0003_lock_down_rls_auto_enable.sql`    | Removes public access to a Supabase helper function (advisor finding) |
| `0004_gate_story_details.sql`           | Moves story details behind sign-in; adds trail `stop_count`           |
| `0005_user_saved_stories_and_notes.sql` | Per-user saved stories and notes with RLS, plus `add_note()`          |
| `0006_place_closure_reports.sql`        | `places.is_closed` + per-user "Mark as closed" reports with RLS       |

### Maintaining it

- **Change the schema:** add a new numbered file in `supabase/migrations/` and apply it (dashboard
  SQL editor, the Supabase CLI, or an MCP tool). Then regenerate
  `src/data/supabase/database.types.ts` so TypeScript catches any mismatch.
- **Change sample content:** edit `src/data/mock/places.seed.ts` or `trails.seed.ts`, then run
  `node scripts/generate-seed-sql.ts > supabase/seed/sample_content.sql` and run that SQL against
  Supabase (it upserts, so it is safe to re-run). Real content should be added through the dashboard
  or a new migration, with `is_placeholder = false` only once verified.
- **After any schema change, run the security advisor** (dashboard > Advisors) to catch a table
  without RLS or an exposed function, and re-test the access table above.

### Still to do

1. **Custom email sender (SMTP)** and the dashboard URL settings above, before inviting real users.
2. **Real, verified content** replacing the placeholder stories (and an admin way to edit it).
3. **Hosting**, then update the Site URL and Redirect URLs to the real domain.
4. **Rich link previews** for shared links (server-rendered meta tags).
5. **Account basics:** deleting an account (rows already cascade), and email change.
