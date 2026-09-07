# Connect a website in minutes

The CMS exposes read-only public REST endpoints for published content. Your website does not need an API key.

## 1. Allow the frontend origin

Add the website URL to the CMS environment:

```env
ALLOWED_ORIGINS=https://example.pl,https://www.example.pl
```

Restart the CMS after changing environment variables.

## 2. Add one environment variable to the website

Next.js server-side usage:

```env
CMS_URL=https://cms.example.pl
```

Vite/browser usage:

```env
VITE_CMS_URL=https://cms.example.pl
```

## 3. Copy an adapter

- Next.js: `examples/nextjs/cms.ts`
- Vite: `examples/vite/cms.ts`

Example:

```ts
const services = await getCollection<Service>('services')
```

## REST endpoints

```text
GET /api/globals/site-settings?depth=1
GET /api/pages?where[_status][equals]=published&sort=sortOrder&depth=1
GET /api/services?where[_status][equals]=published&sort=sortOrder&depth=1
GET /api/faqs?where[_status][equals]=published&sort=sortOrder
GET /api/projects?where[_status][equals]=published&sort=sortOrder&depth=1
```

Authenticated write operations are intentionally not exposed to frontend applications. Editors write through `/admin` using secure cookies and the same access-control rules as the REST API.
