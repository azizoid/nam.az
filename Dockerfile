# Use a lightweight Node.js base image
FROM node:20-alpine AS base

# Install dependencies and set up the environment
RUN apk add --no-cache curl bash libc6-compat && \
    addgroup -g 1001 -S namaz-user && \
    adduser -S namaz-user -u 1001

WORKDIR /app

# Install pnpm globally
RUN npm install -g pnpm

# Dependencies Layer (Optimize Caching)
FROM base AS dependencies
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile --prefer-offline

# Build Stage (Uses Env Variables)
FROM dependencies AS builder
COPY . .

ARG NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
ENV NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=${NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}

RUN pnpm run build

# Production Image (Final)
FROM base AS production

# Set up work directory and copy built assets
WORKDIR /app
COPY --from=builder /app/public ./public
COPY --from=builder --chown=namaz-user:namaz-user /app/.next/standalone ./
COPY --from=builder --chown=namaz-user:namaz-user /app/.next/static ./.next/static
COPY --from=dependencies /app/node_modules ./node_modules

# Set permissions
RUN chown -R namaz-user:namaz-user /app

# Switch to non-root user
USER namaz-user

# Expose port
EXPOSE ${PORT}

# Run migrations and start the app
CMD ["node", "server.js"]