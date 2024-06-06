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

# Expose the port on which the application will run
EXPOSE 5000

# Command to launch the Node.js application
CMD ["npm", "start"]
