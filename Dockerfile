# --- Stage 1: Build ---
FROM node:20-alpine AS builder

WORKDIR /app

# Install dependencies needed for build
COPY package*.json ./
RUN npm ci

# Copy source and prisma schema
COPY . .

# Generate Prisma Client
RUN DATABASE_URL="postgresql://user:password@localhost:5432/nestdb" npx prisma generate

# Build the NestJS app
RUN npm run build

# Prune dev dependencies
RUN npm prune --omit=dev

# --- Stage 2: Production ---
FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production

# Copy only the necessary files from the builder stage
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/prisma ./prisma

# Use a non-root user for security
USER node

EXPOSE 3000

# Start the app
CMD ["node", "dist/main"]
