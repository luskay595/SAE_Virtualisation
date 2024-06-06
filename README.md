D'accord, voici une version mise à jour du README principal pour inclure les instructions de déploiement via Docker Compose et des explications sur la sécurité et le choix des ports :

---

# Wishlist Application

Welcome to the Wishlist Application! This project aims to provide a platform for users to manage their wishlists, share them with others, and keep track of their desired items.

## Table of Contents

1. [Introduction](#introduction)
2. [Features](#features)
3. [Technologies Used](#technologies-used)
4. [Project Structure](#project-structure)
5. [Deployment](#deployment)
6. [Security](#security)
7. [Getting Started](#getting-started)
8. [Contributing](#contributing)
9. [License](#license)

## Introduction

The Wishlist Application consists of multiple components:

- **Backend**: Provides the core logic and APIs for managing wishlists, authentication, and database interactions.
- **Frontend**: Offers a user-friendly interface built with Vue.js for users to interact with their wishlists.
- **Database**: Stores user data, wishlists, and related information using PostgreSQL.
- **Insertion Script**: Facilitates the initial population of the database with sample data using a Python script.

## Features

- **Authentication**: Users can register, log in, and securely manage their accounts.
- **Wishlist Management**: Users can create, share, and view their wishlists, as well as search for specific items.
- **Responsive Design**: The frontend application is designed to be usable across various devices and screen sizes.
- **Data Insertion**: An insertion script is provided to populate the database with initial data, facilitating testing and development.

## Technologies Used

The Wishlist Application leverages the following technologies:

- **Backend**:
  - Node.js
  - Express.js
  - PostgreSQL
  - bcrypt
  - JSON Web Tokens (JWT)

- **Frontend**:
  - Vue.js
  - Vuex
  - Axios

- **Database**:
  - PostgreSQL

- **Insertion Script**:
  - Python

## Project Structure

The project is organized into several components:

- **Backend**: Contains controllers, models, routes, and middleware for handling backend logic.
- **Frontend**: Includes Vue components, views, store for state management, and configuration files.
- **Database**: Defines database schema and initialization scripts.
- **Insertion Script**: Contains a Python script for populating the database.

## Deployment

### Using Docker Compose

To deploy the Wishlist Application using Docker Compose, follow these steps:

1. Clone this repository to your local machine.
2. Navigate to the root directory of the project.
3. Run the following command to build the Docker images for all components:

    ```bash
    docker-compose build
    ```

4. Once the images are built, start the containers using:

    ```bash
    docker-compose up
    ```

### Individual Deployment

Alternatively, you can deploy each component individually by following the deployment instructions provided in their respective README files.



## Security

Security in the Wishlist Application is ensured through several measures:

- **Authentication**: User authentication is handled securely using bcrypt for password hashing and JSON Web Tokens (JWT) for session management.
- **HTTPS**: If deploying in a production environment, it's recommended to use HTTPS to encrypt communication between the client and server, ensuring data confidentiality and integrity.
- **Environment Variables**: Sensible information such as database credentials and JWT secret keys are stored as environment variables to prevent exposure in code repositories.
- **Network Isolation**: Docker Compose is configured to create separate networks for different components (frontend, backend, database, insertion script). This ensures that communication between components is restricted to specific networks, enhancing security by preventing unauthorized access.

## Port Selection

The following ports were chosen for deployment:

- **Backend**: Port 5000 is used for the backend API. This port is commonly used for HTTP services and is not reserved for any specific protocol, making it suitable for web applications.
- **Frontend**: Port 8085 is used for the frontend application. This port is often used for web applications, and using a non-standard port like 8085 helps avoid conflicts with other services running on the default HTTP port (80).
- **Database**: Port 5432 is the default port for PostgreSQL. It's a well-known port specifically designated for database communication.

## Getting Started

To get started with the Wishlist Application, follow the deployment instructions provided above.

## Contributing

Contributions to the Wishlist Application are welcome! If you'd like to contribute, please fork the repository, make your changes, and submit a pull request. Be sure to follow the project's coding conventions and guidelines.



