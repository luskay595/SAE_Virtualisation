# Use a lightweight Node.js base image
FROM node:14-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Build the application for production
RUN npm run build

# Install a lightweight HTTP server to serve static files
RUN npm install -g serve

# Expose the port on which the application will run
EXPOSE 8085

# Command to run the Vue.js application
CMD ["serve", "-s", "dist", "-l", "8085"]
