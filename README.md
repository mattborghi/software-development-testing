# Instructions

1. `pnpm i` to install dependencies.
2. Create an `.env.local` file from the `.env.template`.
3. `pnpm run db:run` to spin up the MySQL server.
4. While the db is running, run `pnpm run db:seed` to populate the DB.
5. `pnpm run dev` to run the app.

## Testing e2e

1. Create an `.env.test.local` file from the `.env.template`.
2. Run e2e tests with `pnpm run test:e2e`.

## Profiling

- Tried running Lighthouse. Output files are located in `profiling/lighthouse`.
- Setup `@next/bundle-analyzer` (based on [this](https://nextjs.org/docs/app/building-your-application/optimizing/package-bundling) docs) and run it with `pnpm run build:analyze`.
