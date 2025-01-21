# Use an official Node.js image to build the frontend
FROM node:20-alpine AS build

# Set the working directory
WORKDIR /app

# Copy the package.json and install dependencies
COPY package.json ./
RUN npm install

# Copy the rest of the code and build the app
COPY . ./
RUN npm run build

# Use an NGINX image to serve the frontend
FROM nginx:alpine

# Copy the build output to the Nginx HTML directory
COPY --from=build /app/build /usr/share/nginx/html

# Copy the custom Nginx configuration file
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose the port NGINX will run on
EXPOSE 80

# Add healthcheck
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 CMD curl -f http://localhost || exit 1

# Start NGINX
CMD ["nginx", "-g", "daemon off;"]
