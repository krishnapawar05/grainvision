# Stage 1: Builder - This stage builds the Next.js application
FROM node:20-alpine AS builder

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json to leverage Docker cache
COPY package*.json ./

# Install all dependencies, including devDependencies for the build
RUN npm install

# Copy the rest of the application source code
COPY . .

# Build the Next.js application for production
RUN npm run build

# Stage 2: Runner - This stage creates the final, lean production image
FROM node:20-alpine AS runner

WORKDIR /app

# Copy package.json and package-lock.json again
COPY package*.json ./

# Install ONLY production dependencies to keep the image small
RUN npm install --production

# Copy the built application from the 'builder' stage
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public

# Expose the port the app runs on
EXPOSE 3000

# The command to start the application
CMD ["npm", "start"]