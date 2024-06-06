# Docker Database for Wishlist Application

This Docker Database provides a PostgreSQL image to run the database of the Wishlist application.

## Usage

Expose the port on which the database will run:

```Dockerfile
EXPOSE 5432
```

The init.sql file contains the SQL instructions to create the necessary tables for the application:

```sql
-- Create the users table
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    password VARCHAR(100) NOT NULL
);

-- Create the wishlist items table
CREATE TABLE IF NOT EXISTS wishlist (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    name VARCHAR(100) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    keywords VARCHAR(100),
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Create the table for shared wishlists
CREATE TABLE IF NOT EXISTS shared_wishlist (
    id SERIAL PRIMARY KEY,
    wishlist_id INTEGER NOT NULL,
    shared_with_user_id INTEGER NOT NULL,
    FOREIGN KEY (wishlist_id) REFERENCES wishlist(id),
    FOREIGN KEY (shared_with_user_id) REFERENCES users(id)
);
```

## Deployment

To deploy the database, make sure you have Docker installed on your machine, then run the following commands:

```bash
docker build -t wishlist-database .
docker run -p 5432:5432 wishlist-database
```

Also, make sure to adapt the application's configurations to connect to this database.

## Technical Documentation

The Docker Database provides a PostgreSQL image to run the database of the Wishlist application. It contains the necessary tables for the application, such as users, wishlist items, and shared wishlists.

## Technologies Used

The Docker Database uses the following technology:

- **PostgreSQL**: A powerful, open-source object-relational database system.
