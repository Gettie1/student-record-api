## Use Node.js LTS as base image
FROM node:20-alpine


RUN npm install -g pnpm
# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# Copy the rest of the app
COPY . .

# Build the app for production
RUN pnpm run build

# Expose the app port
EXPOSE 8000  

# Start the app
CMD ["pnpm", "run", "start:prod"]