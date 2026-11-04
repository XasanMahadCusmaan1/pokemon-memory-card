# Project context

Updated: 2026-11-04

## Purpose and requirements

Build a React memory card game as a learning project. Planned requirements: fetch card images and text from an external API, track current and best scores, shuffle cards on mount and after each selection, style the game, push to GitHub, and deploy. API choice and component design remain to be discussed with the user.

## Current status

### GitHub publication (2026-11-04)

- Replaced starter README with project overview, actual gameplay/features, install/run/build/lint commands, architecture, learning topics, credits, and current limitations.
- Created private repository: https://github.com/XasanMahadCusmaan1/pokemon-memory-card using existing Git Credential Manager authentication. No credentials were written to project files.
- GitHub CLI is unavailable; connected GitHub tools cannot create repositories, so repository creation used the GitHub REST API. Push verification will be recorded after completion.
- User will deploy to Vercel independently. Do not deploy through Sites or Vercel on their behalf for this request.
- Final production build, lint, and whitespace checks passed. Normalized line endings and trailing whitespace in App.tsx and Cards.tsx without changing behavior. Source and documentation are ready for the initial remote push on main.

### Game Over and Restart update (2026-11-04)

- `App.tsx` now owns boolean `isGameOver` state. A repeated pick records the highest score and ends the run, preserving selected IDs so the final score remains visible.
- Conditional rendering replaces Cards with a Game Over panel showing the run score, highest score, and a focused Restart game button. Cards cannot be clicked while this panel is displayed.
- `restartGame` clears selected IDs and exits Game Over. Cards mounts again, loads its cached deck when available, and performs its existing initial shuffle. Highest score is preserved.
- Updated instructions describe a repeated selection as ending the run rather than immediately resetting it.
- Latest card count is 20, as configured by the user in Cards.tsx.
- Learning: boolean state can select between gameplay and results UI; removing and remounting a component resets its local state and runs its mount effect again.
- Validation: production build and lint passed. Browser interaction and keyboard focus behavior have not been manually verified by the assistant.

### Loading and responsive layout update (2026-11-04)

This section supersedes older implementation snapshots below. Current code fetches 30 Pokémon concurrently, selects only needed fields, caches them in localStorage, and shuffles on load and clicks. App derives score from selected IDs and persists the highest completed-run score.

- `src/App.tsx`: responsive container; header stacks on phones and becomes a row at sm (640px); score panels and readable game instructions.
- `src/components/Cards.tsx`: replaces loading text with an accessible status, spinner, and ten decorative skeleton cards. Loading and actual grids share 2 columns by default, 3 at sm (640px), and 5 at lg (1024px). Fluid square images fit the cards. Cards are native buttons, allowing keyboard activation and visible focus.
- `src/index.css`: light page background, system font, zero body margin, and 280px minimum width.
- Animation uses motion-safe utilities; reduced-motion users avoid spinner/pulse and card scaling.
- No dependencies added or scoring, fetching, caching, or shuffle logic changed in this UI update.
- Learning: Tailwind breakpoint prefixes apply from their minimum width upward; skeletons reserve visual space while data loads; semantic buttons provide keyboard interaction without custom handlers.
- Verification: production build and lint passed after approved execution outside the sandbox (the previously documented Node EPERM restriction recurred). No browser visual verification performed. A valid local cache can make loading too brief to notice; use an uncached card-count key and network throttling to inspect it without deleting the saved highest score.
- Remaining limitations: failed fetches have no UI error state; cache reads/parsing and highest-score storage are unguarded. A data-loading skeleton does not wait for every image download. GitHub/deployment remain pending.

Latest status (supersedes the setup snapshot below): Cards fetches Pokémon IDs 1–15 concurrently with Promise.all and displays official artwork and names. Its typed getClickedCard callback passes IDs to App. App stores selected IDs, derives score from array length, resets on repeated selection, and updates numeric highestCore using Math.max when a run ends. Shuffling is not implemented. The screenshot confirms cards display; the assistant has not browser-tested scoring. A suspected extension console error is recorded in ERROR_LOG.md, awaiting confirmation by disabling the extension.

The user prepared the Vite setup and resolved a reported dependency problem by lowering TypeScript from `~7.0.2` to `~6.0.3`. Installed TypeScript is 6.0.3 and installed ESLint is 10.14.0 (declared range `^10.13.0`). Both production build and lint passed on 2026-11-03. The user then configured Tailwind CSS; the updated production build also passed. App currently displays a “Hello React” heading using `text-3xl p-10`; no game features have been implemented. No Git repository or deployment was created during this session.

## Stack and structure

- React and React DOM: declared `^19.3.1`.
- TypeScript, Vite, React Vite plugin, and ESLint flat configuration.
- Styling choice: Tailwind CSS, with `tailwindcss` and `@tailwindcss/vite` declared as `^4.3.4`. Use Tailwind utilities for the game's styling.
- `src/main.tsx`: mounts App inside React StrictMode and imports global styles.
- `src/App.tsx`: minimal heading with Tailwind utility classes.
- `src/index.css`: imports Tailwind with `@import "tailwindcss";`; imported by `src/main.tsx`.
- `src/App.css`: leftover starter stylesheet, currently not imported by App.
- `src/assets/`, `public/`: assets.
- `vite.config.ts`: enables React and Tailwind Vite plugins.
- `tsconfig.app.json`, `tsconfig.node.json`: application and tooling compiler settings.
- `eslint.config.js`: JavaScript, TypeScript, React Hooks, and React Refresh rules.
- `package-lock.json`: dependency lockfile; `node_modules/` is present.

## Commands

Use `npm.cmd` in PowerShell if execution policy blocks the `npm.ps1` launcher.

- Install: `npm.cmd install`
- Development: `npm.cmd run dev`
- Type check and production build: `npm.cmd run build`
- Lint: `npm.cmd run lint`
- Preview build: `npm.cmd run preview`

No automated game tests exist yet. Browser behavior has not been verified in this session. Sandbox permissions blocked Node initially; build and lint subsequently passed with approved execution outside the sandbox.

## Next step and collaboration

`requirements.md` preserves the user's original six assignment items verbatim, including their links. Do not rewrite, expand, or add checkboxes to that assignment. The user explicitly requires no solutions or implementation guidance until requested. Do not begin implementation without their instruction. The user set aside movie imagery and previously received guidance on fetching a Pokémon name and image from PokéAPI. API integration has not been implemented.

The user asked to check the prepared setup, not implement the game yet. Discuss the game rules, API, and component responsibilities before beginning implementation. Keep documentation part of the learning process and explain meaningful errors. See ERROR_LOG.md for dependency history and environment obstacles.
