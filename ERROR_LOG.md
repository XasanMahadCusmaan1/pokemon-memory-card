# Error and problem journal

## 2026-11-04 — Git publication environment and JSON request obstacles

- **Goal:** Create a GitHub repository and push the completed learning project.
- **Expected:** Inspect repository and create its remote using existing authentication.
- **Actual / exact errors:** Sandbox Git reported `fatal: detected dubious ownership in repository`; first REST creation returned `Problems parsing JSON` (HTTP 400).
- **Locations:** Git repository inspection and PowerShell Invoke-RestMethod creation request; no application source involved.
- **Root cause:** Sandbox identity differs from repository owner. JSON request encoding was suspected for the HTTP 400; not independently confirmed.
- **Investigation:** Normal-user Git succeeded without a global safe.directory exception. Git Credential Manager supplied an existing login, checked against the connected account. Creation succeeded after an ASCII description and explicit UTF-8 byte encoding.
- **Solution:** Approved normal-user execution and UTF-8 request body. Private repository created successfully; credentials remained in memory.
- **Verification:** GitHub returned repository URL and private visibility. Git push verification tracked in PROJECT_CONTEXT.md.
- **Prevention:** Use the repository owner's identity and explicit HTTP JSON encoding; stop on REST errors before reporting success.
- **Learning:** Git ownership checks protect repositories; HTTP request bodies must be valid JSON with consistent encoding.

## 2026-11-04 — Pokémon cache exceeds localStorage quota

- **Goal:** Cache 30 Pokémon to avoid repeat detail requests.
- **Expected:** Cache data and render shuffled cards.
- **Actual:** Storage throws before setCards runs on the fetch path.
- **Exact error:** `QuotaExceededError: Failed to execute 'setItem' on 'Storage': Setting the value of 'pokemon-data-30' exceeded the quota.` Screenshot points to `Cards.tsx:48:20`.
- **Files:** `src/components/Cards.tsx`, `src/types/Pokemon.ts`.
- **Root cause:** Browser rejected the storage write. Code caches complete API responses, not just fields in the Pokemon type. Exact contribution of existing stored data versus new payload size is unconfirmed.
- **Investigation:** Inspected response.json return, full-list serialization, and write before state update. TypeScript annotations do not remove unused response properties at runtime.
- **Proposed solution:** Explicitly select id, name, and required image fields before caching. Catch cache-write errors so optional persistence cannot prevent rendering. Inspect existing pokemon-data-* cache entries rather than clearing unrelated storage.
- **Verification:** Pending; no application changes made in this review.
- **Prevention:** Cache minimal data and treat storage operations as fallible.
- **Learning:** Static types describe values; they do not transform or trim runtime objects. An exception stops subsequent statements unless handled.

## 2026-11-04 — Suspected browser extension connection error

- **Goal / expected behavior:** Inspect the locally running game without unexplained console errors.
- **Actual / exact error:** Cards display, but the screenshot reports `Uncaught (in promise) Error: Could not establish connection. Receiving end does not exist.`
- **Locations:** Screenshot source labels include `adblock-picreplacement.js` and `(index):1`. Reviewed `src/components/Cards.tsx` and `src/App.tsx`.
- **Root cause:** Unconfirmed. The adblock filename suggests browser-extension messaging. Neither inspected component contains extension messaging.
- **Investigation:** Compared console source labels with source code; screenshot shows 15 loaded cards.
- **Solution:** No application change. Temporarily disable the relevant extension and reload to isolate the source.
- **Verification:** Pending user test with extensions disabled. Card rendering alone does not verify all app behavior.
- **Prevention:** Inspect error source links and reproduce without extensions before changing application code.
- **Learning:** Browser consoles can show injected extension errors. An uncaught promise rejection is an asynchronous failure without a handler; identify its source before deciding what to fix.

## 2026-11-03 — Reported TypeScript / ESLint dependency problem

1. **Goal:** Prepare the React, TypeScript, Vite, and ESLint starter.
2. **Expected:** Dependencies install and tooling runs successfully.
3. **Actual:** The user reported an ESLint/TypeScript version error and fixed it before this verification.
4. **Exact error:** Not supplied; do not infer the original error.
5. **Relevant files:** `package.json`, `package-lock.json`.
6. **Root cause:** Unconfirmed. No original diagnostic was available to establish the specific incompatibility.
7. **Investigation:** Compared the earlier manifest (`typescript: ~7.0.2`) with the updated manifest (`~6.0.3`) and inspected installed package metadata.
8. **Solution:** User lowered TypeScript to `~6.0.3`. Installed TypeScript is 6.0.3; installed ESLint is 10.14.0. No dependency edits were made by the assistant.
9. **Verification:** `npm.cmd run build` passed TypeScript checking and Vite production build; `npm.cmd run lint` exited successfully on 2026-11-03 outside the sandbox. This verifies the current setup, not the original root cause.
10. **Prevention:** Preserve the original diagnostic when changing dependency versions; keep the manifest and lockfile together.
11. **Learning:** Tooling packages can have version compatibility constraints. Compare the exact diagnostic, declared version ranges, installed versions, and peer dependency requirements before attributing a failure to a package.

## 2026-11-03 — Shell and sandbox blocked npm execution

1. **Goal:** Install dependencies initially and later verify the user's setup.
2. **Expected:** npm launches build and lint commands.
3. **Actual:** PowerShell blocked `npm.ps1`; using `npm.cmd` then hit a filesystem permission error inside the sandbox.
4. **Exact errors:** `npm.ps1 cannot be loaded because running scripts is disabled on this system.` and `Error: EPERM: operation not permitted, lstat 'C:\Users\Hassan'`.
5. **Relevant location:** PowerShell command resolution and Node startup; no application source location.
6. **Root cause:** PowerShell execution policy prevented the script launcher. Node was denied a filesystem operation in the sandbox; the precise sandbox restriction is unconfirmed. Successful checks outside the sandbox support an environment-specific cause.
7. **Investigation:** Switched to the Windows npm launcher, then reran build and lint with approved execution outside the sandbox.
8. **Solution:** Use `npm.cmd`; approved build/lint execution outside the sandbox succeeded. No global execution policy changes were made.
9. **Verification:** Production build and lint both passed. The initial dependency installation did not complete through the assistant; the user subsequently prepared the installation.
10. **Prevention:** Identify whether an error occurs before npm starts, during dependency resolution, or inside application tooling.
11. **Learning:** Shell policy and filesystem permissions are separate from TypeScript or React code errors. `EPERM` means an operation was denied, not that the application has a type error.

## 2026-11-03 — GitHub publication prerequisites unavailable

1. **Goal:** Inspect readiness for the requested eventual GitHub push.
2. **Expected:** Existing repository and available GitHub CLI.
3. **Actual / exact errors:** `fatal: not a git repository (or any of the parent directories): .git` and `gh : The term 'gh' is not recognized as the name of a cmdlet`.
4. **Relevant location:** Project root and shell command lookup.
5. **Root cause:** No Git repository was found; GitHub CLI was unavailable on the command path. Whether it is installed elsewhere is unconfirmed.
6. **Investigation:** Ran `git status --short` and `gh auth status`.
7. **Solution:** Pending; publication work has not begun.
8. **Verification:** No repository, push, or deployment was verified.
9. **Prevention:** Check repository initialization and available publishing tools before attempting a push.
10. **Learning:** A local project folder, Git repository, GitHub repository, and deployed website are separate stages.
