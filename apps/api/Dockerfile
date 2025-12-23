# Builder
FROM node:20-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json ./
COPY apps/api/package.json ./apps/api/package.json
COPY packages/shared/package.json ./packages/shared/package.json

RUN npm install

COPY . .

RUN npm run build --workspace=packages/shared
RUN rm -rf dist && npm run build --workspace=apps/api

# Runner
# FROM node:20-alpine AS runner

# WORKDIR /usr/src/app

# ENV NODE_ENV=production

# COPY --from=builder apps/api/dist ./app/apps/api/dist
# COPY --from=builder node_modules ./node_modules
# COPY --from=builder apps/api/package.json ./apps/api/package.json

EXPOSE 5000

WORKDIR /app/apps/api
# Copy entrypoint
COPY apps/api/entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

ENTRYPOINT ["/entrypoint.sh"]
