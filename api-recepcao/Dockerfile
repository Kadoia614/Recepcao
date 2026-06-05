# Etapa 1: build
FROM node:lts-alpine AS builder
WORKDIR /app

COPY package*.json ./
RUN npm install
RUN npm install -g typescript

COPY . .
RUN npm run build

# Etapa 2: produção
FROM node:lts-alpine
WORKDIR /app

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./

EXPOSE 3000
CMD ["sh", "-c", "node dist/db/migrate.js up && node dist/db/seed.js && node dist/server.js"]
