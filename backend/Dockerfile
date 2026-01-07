FROM node:20-alpine AS base
WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev --ignore-scripts && npm cache clean --force
COPY . .
RUN npm run swagger
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nodejs -u 1001
RUN chown -R nodejs:nodejs /app
USER nodejs

FROM base AS api
EXPOSE 5000
CMD ["node", "src/server.js"]

FROM base AS scheduler
CMD ["node", "src/scheduler.js"]

FROM base AS migrator
CMD ["sh", "-c", "node init.js && npx knex migrate:latest"]