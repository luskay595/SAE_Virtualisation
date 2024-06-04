-- Créer la table des articles de la liste d'envies
CREATE TABLE IF NOT EXISTS wishlist (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    keywords VARCHAR(100)
);

-- Insérer des articles par défaut dans la liste d'envies
INSERT INTO wishlist (name, price, keywords) VALUES 
('Bicycle', 199.99, 'sport, outdoor'),
('Laptop', 999.99, 'electronics, computer');

