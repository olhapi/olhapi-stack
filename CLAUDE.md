- use pnpm as package manager
- use turbo as monorepo tool
- if the variable or parameter isn't used then remove it if linter or typescript complains about it
- before creating new components from scratch, firstly check if the similar component is located at `apps/frontend/src/components/` folder
- in catch blocks, happy or fail paths use sonner to show user appropriate message
- use lingui to translate user-visible texts
- when running JS/TS `scripts` use only node with `--env-file` flag (no need for compiling or `loader`), nodejs supports typescript OOTB
- use dynamic import to split big chunks of heavy components/pages
- use aliased imports in `frontend` app, for example `@/hooks/use-auth.ts`

## React 19 Hooks Usage

- use `useActionState` for forms with async actions (auth forms, settings forms, uploads) - replaces useState + async handlers
- use `useOptimistic` for immediate UI feedback (profile updates, avatar uploads, username validation) - shows changes before server confirms
- use `use()` with Suspense for async data fetching (auth state, feature flags) - only when transitioning from promise-based patterns
- wrap React props in Readonly
- avoid type casting is possible, try to use type guards
- do not destructure React component props, use `props.size` for example
- use only specific props/object values in the hook deps
