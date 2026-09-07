FROM node:24.15.0-alpine AS base
ENV PNPM_HOME=/pnpm
ENV PATH=$PNPM_HOME:$PATH
RUN corepack enable
WORKDIR /app

FROM base AS deps
COPY package.json ./
RUN pnpm install --no-frozen-lockfile

FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ARG DATABASE_URL=postgresql://cms:cms@127.0.0.1:5432/cms
ARG PAYLOAD_SECRET=build-only-secret-change-in-production-000000000000
ARG SERVER_URL=http://localhost:3000
ENV DATABASE_URL=$DATABASE_URL
ENV PAYLOAD_SECRET=$PAYLOAD_SECRET
ENV SERVER_URL=$SERVER_URL
RUN pnpm generate:importmap && pnpm generate:types && pnpm build

FROM node:24.15.0-alpine AS runner
ENV NODE_ENV=production
ENV PORT=3000
WORKDIR /app
RUN addgroup --system --gid 1001 nodejs && adduser --system --uid 1001 cms
COPY --from=builder /app/public ./public
COPY --from=builder --chown=cms:nodejs /app/.next/standalone ./
COPY --from=builder --chown=cms:nodejs /app/.next/static ./.next/static
RUN mkdir -p /app/media && chown -R cms:nodejs /app/media
USER cms
EXPOSE 3000
CMD ["node", "server.js"]
