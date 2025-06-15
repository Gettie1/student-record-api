FROM node:20-alpine AS builder
# Install necessary packages
RUN npm install -g pnpm
# Set working directory
WORKDIR /app
# Create applogs directory
COPY package.json pnpm-lock.yaml ./
# Install dependencies
RUN pnpm install --frozen-lockfile
# Copy the rest of the app
COPY . .
# Build the app for production
RUN pnpm run build
# Use a smaller image for production
FROM node:20-alpine AS production
# install pnpm globally
RUN npm install -g pnpm && \
    apk add --no-cache 
RUN addgroup -g 1001 -S nodejs && \
adduser -S -u 1001 -G nodejs nestjs
# Set working directory
WORKDIR /app

#Copy package
COPY package.json pnpm-lock.yaml ./
# Install production dependencies   
RUN pnpm install --prod --frozen-lockfile
# Copy built app from builder stage
COPY --from=builder /app/dist ./dist
# 🔥 Copy environment file
COPY .env.production .env
# Create applogs directory
RUN mkdir -p /app/applogs && \
    chown -R nestjs:nodejs /app
# Set user to nestjs
USER nestjs
# Expose the port the app runs on
EXPOSE 8000
# Healthcheck command
HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
  CMD curl -f http://localhost:8000/health || exit 1
# Start the app
CMD ["node", "dist/main.js"]
