# Stage 1: Build application
FROM node:20-alpine AS build

WORKDIR /app

COPY package.json package-lock.json ./
COPY apps/web/package.json ./apps/web/package.json
COPY packages/shared/package.json ./packages/shared/package.json

RUN npm install

COPY apps/web ./apps/web
COPY packages ./packages

RUN npm run build --workspace=packages/shared
# RUN rm -rf dist && npm run build --workspace=apps/web

EXPOSE 3000

WORKDIR /app/apps/web

CMD ["npm", "run", "dev"]
