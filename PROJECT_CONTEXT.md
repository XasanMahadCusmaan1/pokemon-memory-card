# Project context

Updated: 2026-11-03

## Purpose and requirements

Build a React memory card game as a learning project. Planned requirements: fetch card images and text from an external API, track current and best scores, shuffle cards on mount and after each selection, style the game, push to GitHub, and deploy. API choice and component design remain to be discussed with the user.

## Current status

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
