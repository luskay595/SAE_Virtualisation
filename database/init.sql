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
