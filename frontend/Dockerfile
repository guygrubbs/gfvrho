# frontend/Dockerfile

# Stage 1: Build the React application
FROM node:20-alpine AS build

# Set working directory
WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm install --frozen-lockfile

# Copy source code
COPY . ./

# Build the application for production
ARG PUBLIC_URL=/
ENV PUBLIC_URL=${PUBLIC_URL}
RUN npm run build

# Stage 2: Serve the built application with a lightweight server
FROM nginx:stable-alpine

# Copy build artifacts to Nginx's HTML folder
COPY --from=build /app/build /usr/share/nginx/html

# Copy custom Nginx configuration (optional for SPA routing)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose the required port
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]
