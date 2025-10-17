# syntax=docker/dockerfile:1

# Discord Auto-Bump Selfbot - Dockerfile
# This containerizes the selfbot for easy deployment

ARG NODE_VERSION=18

FROM node:${NODE_VERSION}-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --omit=dev && \
    npm cache clean --force

# Copy application files
COPY index.js ./
COPY config.json ./

# Run as non-root user for security
USER node

# Health check (optional - vérifie que le process tourne)
HEALTHCHECK --interval=5m --timeout=3s \
    CMD ps aux | grep "node index.js" | grep -v grep || exit 1

# Run the selfbot
CMD ["node", "index.js"]
