# Docker Backend for Wishlist Application

This Docker Backend provides a lightweight Node.js image to run the backend of the Wishlist application.

## Usage

Use a lightweight base image of Node.js:

```Dockerfile
FROM node:14-alpine
```

Set the working directory in the container:

```Dockerfile
WORKDIR /app
```

Copy the package.json and package-lock.json files:

```Dockerfile
COPY package*.json ./
```

Install the dependencies:

```Dockerfile
RUN npm install
```

Copy the rest of the application files:

```Dockerfile
COPY . .
```

Expose the port on which the application will run:

```Dockerfile
EXPOSE 5000
```

Command to start the Node.js application:

```Dockerfile
CMD ["npm", "start"]
```

## Configuration

The package.json file contains the necessary dependencies for the application:

```json
{
  "name": "wishlist-backend",
  "version": "1.0.0",
  "description": "Backend for Wishlist application",
  "main": "src/app.js",
  "scripts": {
    "start": "node src/app.js"
  },
  "dependencies": {
    "express": "^4.17.1",
    "pg": "^8.6.0",
    "cors": "^2.8.5",
    "bcrypt": "^5.0.1",
    "jsonwebtoken": "^9.0.0"
  }
}
```

## Project Structure

    src/ folder: Contains the source code of the application.
    .env: Configuration file for environment variables.
    controllers/ folder: Controllers for the business logic of the application.
    middlewares/ folder: Middlewares for authentication management.
    models/ folder: Models for database access.
    routes/ folder: Definition of the API routes.

## Main Features

    Authentication: Allows users to register and log in.
    Wishlist Management: Allows users to create, share and view their wishlists.
    Insertion Status: Provides an endpoint to get the insertion status of data in the database.

## Technical Documentation

The application uses a Model-View-Controller (MVC) architecture. The `controllers/` folder contains the business logic, the `models/` folder handles database access, and the `routes/` folder defines the API routes.

The application uses environment variables for configuration, which are stored in the `.env` file. This includes database connection details and the secret key for JSON Web Tokens (JWT).

## Technologies Used

The application uses several technologies for different purposes:

- **Express.js**: A web application framework for Node.js, used to build the API.
- **pg**: A non-blocking PostgreSQL client for Node.js, used for database access.
- **cors**: A Node.js package for providing a Connect/Express middleware that can be used to enable CORS with various options. This is necessary to allow the frontend application to communicate with the backend.
- **bcrypt**: A library to help you hash passwords. The application uses this to securely store user passwords.
- **jsonwebtoken**: An implementation of JSON Web Tokens, used for user authentication.

## Deployment

To deploy the application, make sure you have Docker installed on your machine, then run the following commands:

```bash
docker build -t wishlist-backend .
docker run -p 5000:5000 wishlist-backend
```

Also, make sure to configure the necessary environment variables in the .env file.