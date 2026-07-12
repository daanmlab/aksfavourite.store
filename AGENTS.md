# AGENTS.md

## Project conventions

- This is a Bun workspace monorepo with a Next.js app in `apps/web` and shared UI package in `packages/ui`.
- Prefer Bun commands for package management and scripts.
- For product/catalog UI, use components from `packages/ui` / `@repo/ui` instead of recreating local app-only components.
- App-specific data retrieval belongs in the Next.js app layer, e.g. `apps/web/lib/*`, and should be consumed from server components when possible.
- Database schema, seeding, and typed queries live in `packages/db`; do not use Docker init SQL for app tables/seed data.
- Database access uses the shared Prisma client in `packages/db/src/client.ts`.
- With Bun workspaces, Prisma Client is generated into the workspace dependency store/root install, not package-local `node_modules`.
- Shared reusable UI should live in `packages/ui/src/components` and be exported through `@repo/ui` package exports.

## Validation

Run these after relevant changes:

```bash
bun run check-types
bun run lint
```

After Prisma schema changes, run:

```bash
cd packages/db && bun run db:generate
```

For local DB setup/seed:

```bash
docker compose up -d
cd packages/db && bun run db:setup
```

For production-style schema changes, prefer Prisma migrations (`db:migrate:dev` and `db:migrate:deploy`) over `db:push`.
