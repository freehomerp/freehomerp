FROM node:20-alpine3.19 AS base

WORKDIR /app

FROM base AS builder-base

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

FROM builder-base AS prune

COPY . .
RUN corepack prepare --activate && pnpm dlx turbo prune @freehomerp/web --docker

FROM builder-base AS builder

COPY .gitignore .gitignore
COPY --from=prune /app/out/json/ .
COPY --from=prune /app/out/pnpm-lock.yaml ./pnpm-lock.yaml
RUN corepack prepare --activate && pnpm install --frozen-lockfile

COPY --from=prune /app/out/full/ .
COPY turbo.json turbo.json
RUN pnpm exec turbo build --filter=@freehomerp/web...

FROM base AS runner

ENV PORT=3000 HOSTNAME=0.0.0.0

EXPOSE ${PORT}
HEALTHCHECK --interval=1s --timeout=1s --start-period=5s --retries=3 \
    CMD wget http://localhost:3000/health -q -O - > /dev/null 2>&1

RUN apk add --no-cache wget
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
USER nextjs

COPY --from=builder /app/apps/web/next.config.mjs .
COPY --from=builder /app/apps/web/package.json .

COPY --from=builder --chown=nextjs:nodejs /app/apps/web/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/apps/web/.next/static ./apps/web/.next/static
COPY --from=builder --chown=nextjs:nodejs /app/apps/web/public ./apps/web/public

CMD node apps/web/server.js
