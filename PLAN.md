# Migration plan: self-hosted Docker → Cloudflare (static + search Worker)

The app stops reading MongoDB at runtime. The 6,236 immutable documents live as JSON in
git; all pages pre-render at build; the only runtime compute left is `/api/v2/*` (random)
and the new `/api/v3/search`, served by a small Worker. There is no Node server or
container. Search records and a prebuilt MiniSearch index are generated at build time
and uploaded to a private R2 bucket. Next's RSC sidecars are removed from the export
because navigation uses full document loads; the remaining static files and Worker fit
in one Workers Free deployment.

Estimated total effort: ~2–3 days.

---

## Phase 0 — Restructure the provided data files

- [x] You provide the two source JSON files (ayahs + metadata).
- [x] `scripts/dump-quran.mjs` reads them from a fixed input path and writes:
  - `src/data/quran/{1..114}.json` — ayah + metadata joined 1:1 into per-soorah files,
    with exactly the fields the services render (strip Anything unused)
- [x] The script asserts structure: 6,236 records, join key unique, required fields
  non-empty — loud failure on any surprise shape. _(passed: all joins 1:1, ids 1–6236
  unique, 5419/6236 latinized differ from content)_
- [x] Choice of what to strip/merge is ours — the input files are treated as raw
  material, the output files as the app's contract.

Exit: `src/data/` committed to git. Mongo and Mongo-envs fully decoupled already.

`scripts/build-search-data.mjs` reads the committed soorah files during deploy and
creates private Worker records and a MiniSearch index in `.worker-data/`; neither file
is copied into the public static site.

## Phase 1 — Data becomes build-time, pages become static ✅ done

- [x] `getSoorahService` / `getAyahService`: read the JSON files instead of
  `withMongo`. Same return shape → zero component changes. (`src/utility/quranData.ts`)
- [x] `src/app/[soorah]/[ayah]/page.tsx`: delete `export const dynamic = 'force-dynamic'`,
  add `generateStaticParams` (6,236 pages).
- [x] `next.config.ts`: `output: 'export'`, `images: { unoptimized: true }` (images are
  local files; required for static export).
- [x] Delete `src/app/api/` from the Next app — API routes cannot exist in static
  export; the Worker takes them over in phase 2.
- [x] Delete: `withMongo` usage outside scripts, `mongodb` dependency, `MONGODB_*` envs,
  `Dockerfile`, `docker-compose.yml`, `.dockerignore`, the old GHCR deploy workflow.
- [x] `search/[search]` page split: server shell page with `generateStaticParams`
  (one `/search/app` shell) + client component moved to `Search.tsx`; the Worker
  rewrites `/search/*` onto the shell in phase 2.

Exit: `pnpm build` produces `out/` — verified: 6,355 HTML files (6,236 ayah pages,
114 soorah pages, home, search shell, 404), and `/1/2.html` contains the Arabic +
translation content.

## Phase 2 — Worker API and Bosnian typo-tolerant search ✅ implemented

API versions on Workers, not the Next app:

- [x] `functions/api.ts` (wrangler bundles it directly as the Worker `main` — no
  separate esbuild step needed):
  - `POST /api/v3/search` — retains exact substring matches, normalized from raw
    Bosnian `content`, then appends typo-tolerant MiniSearch matches. Search terms fold
    `č/ć → c`, `š → s`, `ž → z`, `đ → dj`; fuzzy distance is 1 for 4–6 character
    terms and 2 for longer terms. Exact hits stay in Quran order; fuzzy hits follow by
    relevance. Response fields, 30-result pages, and error shape remain compatible.
  - The Worker loads `mojkuran/v1/records.json` and
    `mojkuran/v1/search-index.json` from the `SEARCH_DATA` R2 binding and memoizes
    them per isolate. The raw `content_latinized` field remains for random-endpoint
    compatibility; search no longer depends on it.
  - `GET /api/v2/random` (plus `topbar`, `status`) — keep the v2 paths and shapes
    (CORS headers on random kept; topbar = random 3 of `soorahList`, no data file).
  - Reuse pure helpers (`getView`, `initialPaginate`, `selectRandomItems`,
    `soorahList`) via relative imports — no `server-only` hand grenades.
- [x] Update the client search call site(s) to hit `/api/v3/search`.
- [x] `wrangler.jsonc`: `main: functions/api.ts`,
  `assets: { directory: "./out", binding: "ASSETS" }`,
  private `SEARCH_DATA` R2 binding,
  `not_found_handling: "404-page"`,
  `"run_worker_first": ["/api/*", "/search/*", "/data/*"]` (data/* 404s so
  `records.json` is never publicly served), `workers_dev: true` until cutover.
- [x] Contract checks and a live workerd runtime pass the search, random, status,
  error, CORS, and private-data checks.

Exit: Workers handles the API contract; browser smoke checks against the final site are
part of deployment verification.

## Phase 3 — Automated Worker deployment

`pnpm build:cloudflare` creates the static export, removes RSC `.txt` sidecars and
private records, and checks the Workers Free limits. It currently prepares 6,404 files
from an export that originally contained 38,172 files / about 747 MB of actual data;
Wrangler's dry run resolves those to 12,778 asset entries, below the 20,000 Free limit.
The app, API, and search shell deploy as one Worker with its static assets. R2 contains
only the private search records and MiniSearch index.

`.github/workflows/deploy.yml` deploys on every push to `main` and supports manual runs.
It builds the corpus and static export, uploads both private objects to R2, then runs
the repository-locked Wrangler CLI to deploy the Worker and assets. It needs GitHub
secrets `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID`; the token needs Worker
deployment, R2 object write, and zone Worker route permissions.

`wrangler.jsonc` maps `mojkuran.com/*` to the Worker. The current proxied DNS A record
to DigitalOcean stays in place as the origin; removing the Worker route returns traffic
to that server for rollback. `workers.dev` remains enabled for preview.

- [ ] Add the Cloudflare secrets to GitHub, push this work to `main`, and confirm the
  first automated deployment completes.

Exit: green GitHub Actions run; verify the site on both `workers.dev` and
`mojkuran.com`.

## Phase 4 — Cutover & cleanup

- [ ] Smoke test `workers.dev` and `mojkuran.com`: soorah/ayah pages, Bosnian diacritic
  and typo searches, random widgets, and images.
- [ ] Watch the Worker dashboard error rate for a day; keep the VPS on standby for a week.
- [ ] After the soak: shut down the Node/VPS stack. Mongo is already out of the deploy
  path; the JSON files in git are now the source of truth going forward.

Rollback: remove the Worker route from `wrangler.jsonc` and deploy, or remove the route
in the Cloudflare dashboard. The proxied DNS record still points at the old server.

---

## Out of scope (explicitly)

- **D1** — not needed for the current Mojkuran corpus; it does not provide this typo
  matching by itself.
- quran.az data — future work, with a separate corpus-specific normalization policy.
- **Typesense / external search service** — not part of this implementation; MiniSearch
  provides basic typo tolerance, not Typesense feature parity.
- Paid plan — decide after measuring deployed Worker CPU and confirming the final static
  asset delivery path.
