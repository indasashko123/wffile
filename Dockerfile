FROM node:20-alpine AS builder

WORKDIR /app
COPY package*.json ./
COPY tsconfig*.json ./
COPY nest-cli.json ./
RUN npm install
COPY . .
RUN npm run build

FROM node:20-alpine AS production

WORKDIR /app
COPY package*.json ./
RUN npm install --only=production
COPY --from=builder /app/dist ./dist
RUN mkdir -p /app/uploads && chown -R node:node /app/uploads
USER node
CMD ["node", "dist/main.js"]