# Pokémon Memory Game

A memory card game built while learning React and TypeScript as part of [The Odin Project's Memory Card assignment](https://www.theodinproject.com/lessons/node-path-react-new-memory-card).

## How to play

Click a Pokémon you haven't selected during the current run. Each new selection earns a point, and the deck shuffles after every click. Picking the same Pokémon twice ends the run. The Game Over screen shows your final score and provides a Restart button.

Your highest completed-run score is saved in your browser and remains after a refresh.

## Features

- 20 Pokémon cards with names and official artwork from PokéAPI.
- Fisher–Yates shuffle on initial load and after each selection.
- Current score, saved highest score, Game Over screen, and restart.
- Concurrent API requests with Promise.all and localStorage data caching.
- Lazy-loaded images, loading spinner, and skeleton cards.
- Responsive Tailwind layout with two, three, or five columns.
- Keyboard-accessible card buttons, visible focus, and reduced-motion support.

## Built with

React, TypeScript, Vite, Tailwind CSS, and ESLint. Data and artwork are provided through [PokéAPI](https://pokeapi.co/). No API key or environment variables are needed for the current app.

## Run locally

Install Node.js 20.19+ or 22.12+ (as required by the installed Vite version), then run these commands from the project folder:

```bash
npm install
npm run dev
```

Open the local address printed by Vite.

```bash
npm run build    # Type-check and create the production build in dist/
npm run preview  # Preview the production build locally
npm run lint     # Run ESLint
```

On Windows PowerShell, use `npm.cmd` instead of `npm` if execution policy blocks `npm.ps1`.

## Project structure

```text
src/
  App.tsx                # Selected IDs, scores, persistence, and Game Over UI
  components/Cards.tsx   # Fetching, cache, shuffle, loading UI, and card grid
  types/Pokemon.ts       # Shared Pokémon type
  index.css              # Tailwind import and global page styles
  main.tsx               # React entry point
requirements.md          # Original assignment
PROJECT_CONTEXT.md       # Project status and learning notes
ERROR_LOG.md             # Debugging journal
```

## Storage and limitations

The browser stores the highest score under `highestScore` and Pokémon data under `pokemon-data-<card count>`. Cached data contains image URLs; image files are cached separately by the browser. Clearing site storage removes saved scores and Pokémon data.

An internet connection is needed for an uncached deck and images. Failed requests do not yet have a dedicated error screen, and invalid saved JSON or unavailable storage can affect loading. There is no separate victory screen when all cards are selected.

## Learning focus

This project practices React state, effects, callback props, conditional rendering, immutable array updates, TypeScript object and function types, asynchronous requests, shuffling algorithms, browser storage, caching, and responsive styling.

## Deployment

Deployment will be managed by the project owner. `npm run build` produces the static site in `dist/`.

## Credits

This is an unofficial learning project. Pokémon names and artwork belong to their respective owners. Thanks to PokéAPI and The Odin Project.
