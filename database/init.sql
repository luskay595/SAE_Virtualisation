-- Créer la table des utilisateurs
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    password VARCHAR(100) NOT NULL
);

-- Créer la table des articles de la liste d'envies
CREATE TABLE IF NOT EXISTS wishlist (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    name VARCHAR(100) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    keywords VARCHAR(100),
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Créer la table pour les listes de souhaits partagées
CREATE TABLE IF NOT EXISTS shared_wishlist (
    id SERIAL PRIMARY KEY,
    wishlist_id INTEGER NOT NULL,
    shared_with_user_id INTEGER NOT NULL,
    FOREIGN KEY (wishlist_id) REFERENCES wishlist(id),
    FOREIGN KEY (shared_with_user_id) REFERENCES users(id)
);

-- Insérer des utilisateurs par défaut
INSERT INTO users (username, password) VALUES 
('user1', '$2b$10$z/c2cPQwDU1tpj.JJF4kK.B7thTB3xtm/XhYtx38JXGfvDZrY2O7m'), -- Mot de passe: password1
('user2', '$2b$10$z/c2cPQwDU1tpj.JJF4kK.B7thTB3xtm/XhYtx38JXGfvDZrY2O7m'); -- Mot de passe: password2

-- Insérer des articles par défaut dans la liste d'envies
INSERT INTO wishlist (user_id, name, price, keywords) VALUES 
(1, 'Bicycle', 199.99, 'sport, outdoor'),
(2, 'Laptop', 999.99, 'electronics, computer');

-- Partager des articles par défaut
INSERT INTO shared_wishlist (wishlist_id, shared_with_user_id) VALUES 
(1, 2), -- Partager le vélo avec user2
(2, 1); -- Partager l'ordinateur portable avec user1

