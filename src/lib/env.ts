function productionRequired(name: string, developmentFallback: string): string {
  const value = process.env[name]?.trim()
  if (value) return value

  if (process.env.NODE_ENV === 'production') {
    throw new Error(`${name} is required in production`)
  }

  return developmentFallback
}

export const env = {
  databaseURL: productionRequired(
    'DATABASE_URL',
    'postgresql://cms:cms-local-password@localhost:5432/cms',
  ),
  payloadSecret: productionRequired(
    'PAYLOAD_SECRET',
    'development-only-secret-change-before-production-000000000000',
  ),
  serverURL: productionRequired('SERVER_URL', 'http://localhost:3000'),
}

export const allowedOrigins = Array.from(
  new Set(
    [
      env.serverURL,
      ...(process.env.ALLOWED_ORIGINS ?? '')
        .split(',')
        .map((origin) => origin.trim())
        .filter(Boolean),
    ].map((origin) => origin.replace(/\/$/, '')),
  ),
)
