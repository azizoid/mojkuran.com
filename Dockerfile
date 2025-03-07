FROM node:20-alpine AS base

RUN apk add --no-cache curl bash libc6-compat && \
    addgroup -g 1001 -S mojkuran-user && \
    adduser -S mojkuran-user -u 1001

WORKDIR /app

RUN npm install -g pnpm

ARG MONGODB_URI
ARG MONGODB_DB
ENV MONGODB_URI=${MONGODB_URI}
ENV MONGODB_DB=${MONGODB_DB}

FROM base AS dependencies
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile --prefer-offline

FROM dependencies AS builder
WORKDIR /app
COPY . .
RUN pnpm run build

FROM base AS production

WORKDIR /app
COPY --from=builder /app/public ./public
COPY --from=builder --chown=mojkuran-user:mojkuran-user /app/.next/standalone ./
COPY --from=builder --chown=mojkuran-user:mojkuran-user /app/.next/static ./.next/static

RUN chown -R mojkuran-user:mojkuran-user /app

ENV MONGODB_URI=${MONGODB_URI}
ENV MONGODB_DB=${MONGODB_DB}

USER mojkuran-user

EXPOSE ${PORT}

CMD ["node", "server.js"]