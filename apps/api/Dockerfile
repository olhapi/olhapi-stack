FROM node:22-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./
COPY tsconfig.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY src ./src
COPY test ./test

# Expose port
EXPOSE ${PORT:-3001}

# Development command (will be overridden by docker-compose)
CMD ["npm", "run", "dev"]
