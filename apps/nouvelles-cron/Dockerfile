# syntax = docker/dockerfile:1
# ARG APP_PKG_NAME=nouvelles/nouvelles-cron

# Adjust NODE_VERSION as desired
ARG NODE_VERSION=18.19.0
FROM node:${NODE_VERSION}-alpine as builder

LABEL fly_launch_runtime="Node.js"

# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
# puppeteer 실행을 위해 필요한 패키지들을 설치
RUN apk add --no-cache chromium nss freetype harfbuzz ca-certificates ttf-freefont udev xvfb x11vnc fluxbox dbus 

RUN apk add --no-cache --virtual .build-deps curl \
    && echo "http://dl-cdn.alpinelinux.org/alpine/edge/main" >> /etc/apk/repositories \
    && echo "http://dl-cdn.alpinelinux.org/alpine/edge/community" >> /etc/apk/repositories \
    && echo "http://dl-cdn.alpinelinux.org/alpine/edge/testing" >> /etc/apk/repositories \
    && apk add --no-cache curl wget \
    && apk del .build-deps  # puppeteer 다운로드를 위해 필요한 라이브러리들을 설치하고 마지막에는 빌드를 위해 추가적으로 설치한 패키지들을 삭제

  # puppeteer가 chromium-browser를 실행할 수 있도록 설정
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium
 # 이미 chromium을 설치했기 때문에 puppeteer가 chromium을 다시 다운로드하지 않도록 설정
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true

RUN apk update
RUN corepack enable

# Node.js app lives here
WORKDIR /app
RUN npm install turbo --global
RUN npm install puppeteer --global
COPY . .
RUN turbo prune --scope=nouvelles-cron --docker

# remove all empty node_modules folder structure
RUN find . -name "node_modules" -type d -prune -exec rm -rf '{}' +
# RUN rm -rf /app/out/full/*/*/node_modules

# Add lockfile and package.json's of isolated subworkspace
FROM node:${NODE_VERSION}-alpine AS installer

RUN apk add --no-cache libc6-compat
RUN apk update
RUN corepack enable

WORKDIR /app

# First install dependencies (as they change less often)
COPY .gitignore .gitignore
COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/pnpm-lock.yaml ./pnpm-lock.yaml
COPY --from=builder /app/out/pnpm-workspace.yaml ./pnpm-workspace.yaml

# Install dependencies
RUN pnpm install

# prisma generate
COPY --from=builder /app/out/full/packages/database/prisma/schema.prisma /app/packages/database/prisma/schema.prisma
RUN pnpx prisma generate --schema /app/packages/database/prisma/schema.prisma

# Build the project and its dependencies
COPY --from=builder /app/out/full/ .
COPY turbo.json turbo.json
RUN pnpm run db:generate
RUN pnpm turbo run build --filter=nouvelles-cron...

FROM node:${NODE_VERSION}-alpine AS runner

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