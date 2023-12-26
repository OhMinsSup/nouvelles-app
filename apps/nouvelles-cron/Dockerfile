# syntax = docker/dockerfile:1

# Adjust NODE_VERSION as desired
ARG NODE_VERSION=20.10.0
FROM node:${NODE_VERSION}-alpine as builder

LABEL fly_launch_runtime="Node.js"

# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
RUN apk update

# Node.js app lives here
WORKDIR /app
RUN npm install turbo --global
COPY . .
RUN turbo prune --scope=nouvelles-cron --docker

# Add lockfile and package.json's of isolated subworkspace
FROM node:${NODE_VERSION}-alpine AS installer

LABEL fly_launch_runtime="Node.js"

RUN apk add --no-cache libc6-compat
RUN apk update
RUN corepack enable
WORKDIR /app

# First install dependencies (as they change less often)
COPY .gitignore .gitignore
COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/pnpm-lock.yaml ./pnpm-lock.yaml
RUN pnpm install

# Build the project and its dependencies
COPY --from=builder /app/out/full/ .
COPY turbo.json turbo.json

RUN pnpm turbo run build --filter=nouvelles-cron...

FROM node:${NODE_VERSION}-alpine AS runner

LABEL fly_launch_runtime="Node.js"

RUN corepack enable

WORKDIR /app

# Don't run production as root
RUN addgroup --system --gid 1001 cronfastify
RUN adduser --system --uid 1001 cronfastify
USER cronfastify

# Set production environment
ENV NODE_ENV="production"

COPY --from=installer /app .

CMD node apps/nouvelles-cron/dist/main