# ---------------- Build Stage ----------------
FROM node:24-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install all dependencies (needed for build)
RUN npm ci --legacy-peer-deps

# Copy source code
COPY . .

# Build Next.js
RUN npm run build

# ---------------- Production Stage ----------------
FROM node:24-alpine AS runner

WORKDIR /app

# Copy build output
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package*.json ./

# Copy node_modules (required by Next.js at runtime)
COPY --from=builder /app/node_modules ./node_modules

# Environment variables
ENV NODE_ENV=production
ENV PORT=3004

# Expose port
EXPOSE 3004

# Start Next.js
CMD ["npx", "next", "start", "-p", "3004"]