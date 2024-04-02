FROM node:20-alpine As development-only

WORKDIR /app

COPY package.json ./
COPY pnpm-lock.yaml ./

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
RUN pnpm install

COPY . .

RUN pnpm nx run auth:build:development

FROM node:20-slim As reservations-development

WORKDIR /app

COPY package.json ./
COPY pnpm-lock.yaml ./

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

RUN pnpm install

COPY . .

RUN pnpm nx run reservations-api:build:production


# ENTRYPOINT ["/bin/sh", "-c", "pnpm nx run auth:serve:development"]

FROM node:20-slim As reservations-production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /app

COPY package.json ./
COPY pnpm-lock.yaml ./

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

RUN pnpm install --prod

COPY --from=development /usr/src/app/dist ./dist

CMD ["node", "dist/apps/reservations/main"]
