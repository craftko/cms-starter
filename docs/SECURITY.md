# Security model

This starter is secure by default for a small content CMS, but no application is “super secure” without correct deployment and maintenance.

## Defaults included

- no public create, update, or delete access;
- published-only anonymous reads for content collections;
- authenticated admin panel with `admin` and `editor` roles;
- initial account is promoted to `admin`; later accounts default to `editor`;
- five failed login attempts trigger a 15-minute lock;
- two-hour authentication token lifetime;
- CSRF and CORS allowlists, never wildcard origins;
- GraphQL disabled to reduce attack surface;
- API relationship depth capped at 3;
- application-wide text length limit;
- image-only uploads, 8 MB maximum, remote URL uploads disabled;
- media is intentionally public for website delivery; never upload private documents or personal data;
- only administrators can delete content, media, or users;
- drafts and 20 retained versions for recovery;
- security response headers and HSTS in production;
- Payload telemetry disabled;
- secrets are never bundled into the admin client.

## Production checklist

1. Use HTTPS only. Put the CMS behind Cloudflare, Caddy, Traefik, or another maintained reverse proxy.
2. Generate a unique `PAYLOAD_SECRET` with at least 32 random bytes.
3. Use a unique PostgreSQL password and keep PostgreSQL private; do not publish port 5432.
4. Set `PAYLOAD_DB_PUSH=false` and deploy schema changes only through reviewed migrations.
5. Set `SERVER_URL` to the exact HTTPS CMS URL.
6. Keep `ALLOWED_ORIGINS` limited to real frontend domains.
7. Store uploaded files on a persistent encrypted volume or an S3-compatible provider.
8. Back up PostgreSQL and media separately, and test restoration.
9. Add reverse-proxy rate limits for `/admin` and `/api/users/login`.
10. Apply dependency updates after CI passes; Dependabot is enabled.
11. Review active users regularly and remove accounts immediately when access is no longer needed.

## Backups

A database-only backup is incomplete because uploads are stored in `media/`.

```bash
pg_dump "$DATABASE_URL" --format=custom --file=cms.dump
tar -czf media.tar.gz media/
```

Encrypt backups, keep at least one off-site copy, and define a retention period appropriate for the business.

## Deliberately excluded

- public contact-form submissions;
- customer accounts;
- payments and orders;
- API keys in frontend code;
- arbitrary file uploads;
- custom password/authentication implementation.

Add those features only for a concrete project and perform a fresh threat review.
