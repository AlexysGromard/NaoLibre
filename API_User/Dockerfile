FROM node:20-alpine AS builder
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm ci
COPY . .
# If there's a build step (TypeScript), run it. Use npm run build if present.
RUN if [ -f package.json ] && grep -q "build" package.json; then npm run build || true; fi

FROM node:20-alpine
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm ci --production
COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/src ./src
ENV NODE_ENV=production
EXPOSE 8081
# Start dist build if present, otherwise fall back to src/server.mjs
CMD ["sh", "-c", "if [ -f ./dist/server.mjs ]; then node ./dist/server.mjs; else node ./src/server.mjs; fi"]
