# CraftKo CMS Starter

A small, reusable headless CMS for local-business websites, portfolios, landing pages, and lightweight catalogs. It provides a protected Payload admin panel, PostgreSQL storage, drafts, media management, and a public REST API that exposes only published content.

It is intentionally **not** an e-commerce, booking, CRM, or customer-account system.

## Included content

- **Site settings** — identity, contact details, social links, default SEO;
- **Pages** — title, slug, rich text, image and SEO;
- **Services** — description, display price, image, CTA and order;
- **FAQs** — question, answer, category and order;
- **Projects** — portfolio case studies and galleries;
- **Media** — images only, optimized into common sizes;
- **Users** — administrator and editor roles.

## Security defaults

Anonymous visitors can only read published documents. All writes require login. Only administrators may delete content or manage other users. GraphQL is disabled, API depth is capped, uploads are constrained, login attempts are rate-limited by Payload, and CORS/CSRF use explicit origin allowlists.

Read the complete checklist in [`docs/SECURITY.md`](docs/SECURITY.md).

## Start in about two minutes

Requirements: Docker and Docker Compose.

```bash
cp .env.example .env
```

Generate a real local secret and place it in `.env`:

```bash
openssl rand -base64 48
```

Start the stack:

```bash
docker compose up --build
```

Open:

- CMS landing page: `http://localhost:3000`
- admin panel: `http://localhost:3000/admin`
- readiness check: `http://localhost:3000/healthz`

The first user created in `/admin` becomes the administrator. Every later user defaults to editor.

## Connect a website

Add the website origin to `ALLOWED_ORIGINS`, add `CMS_URL` or `VITE_CMS_URL` to the frontend, then copy the matching adapter from `examples/`.

Detailed instructions: [`docs/CONNECT.md`](docs/CONNECT.md).

## Local development without Docker for Node

Run PostgreSQL yourself, then:

```bash
corepack enable
pnpm install
cp .env.example .env
pnpm generate:importmap
pnpm generate:types
pnpm dev
```

The `.env.example` database hostname is `postgres` for Docker. Change it to `localhost` when Next.js runs directly on your machine.

## Production deployment

The Docker quick start sets `PAYLOAD_DB_PUSH=true` so an empty local database can initialize itself. **Set it to `false` in production.** Before the first production deployment, create and commit a migration against a development database:

```bash
pnpm migrate:create initial-schema
pnpm migrate
```

Then build and start:

```bash
pnpm build
pnpm start
```

A production service also needs:

- PostgreSQL;
- persistent media storage or an S3-compatible adapter;
- HTTPS reverse proxy;
- database and media backups;
- exact `SERVER_URL` and `ALLOWED_ORIGINS` values.

Do not deploy with the example password or secret.

## API examples

```text
GET /api/globals/site-settings?depth=1
GET /api/services?where[_status][equals]=published&sort=sortOrder&depth=1
GET /api/faqs?where[_status][equals]=published&sort=sortOrder
GET /api/projects?where[_status][equals]=published&sort=sortOrder&depth=1
```

Payload enforces access rules even when a caller removes the `_status` filter, so anonymous requests still cannot retrieve drafts.

## Customize for a project

Most small sites only need to:

1. remove unused collections from `src/payload.config.ts`;
2. adjust fields in `src/collections/`;
3. add the frontend domain to `ALLOWED_ORIGINS`;
4. copy one adapter from `examples/`.

Avoid adding customer data, payments, bookings, or public write endpoints to the shared starter. Create project-specific modules for those requirements.

## Validation

GitHub Actions runs generated types/import map, TypeScript, ESLint, and a production build against PostgreSQL. Payload packages are pinned to exactly the same version, as required by Payload.

## License

MIT
