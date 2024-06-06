import psycopg2

conn = psycopg2.connect(
    dbname="wishlist",
    user="admin",
    password="admin123",
    host="db"
)

cur = conn.cursor()

try:
    cur.execute("""
        -- Insérer des utilisateurs avec des mots de passe déjà hashés
        INSERT INTO users (username, password) VALUES ('user1', '$2b$10$Cd4p9WLss9vdxyUMAgpaFuN3JSy6ewz.WiiNsidOX.tCtCmiujO9y');
        INSERT INTO users (username, password) VALUES ('user2', '$2b$10$dOCSof/m5x4.tJxywsBK2OhWwiS5ojOa0bm.IRNe2xR6H.xKJ5iKO');
        INSERT INTO users (username, password) VALUES ('user3', '$2b$10$S7LzwE0zROtVTlcgjPby/umsHjJm2HcJdME43zx3fv3wf0TzrArOu');
        INSERT INTO users (username, password) VALUES ('user4', '$2b$10$s7AaZi3gXb0caaBVXijT0uxhSiUVKHywTc7LgC32s2rw2YzpZs1r6');
        INSERT INTO users (username, password) VALUES ('user5', '$2b$10$PHbt3LHzwdAF3USei9qaqenSH4NdwNtd.ZYJvzl4HFq7EaGKb/7Ty');

        -- Insérer des articles de la liste d'envies
        INSERT INTO wishlist (user_id, name, price, keywords) VALUES (1, 'Smartphone', 799.99, 'phone, technology');
        INSERT INTO wishlist (user_id, name, price, keywords) VALUES (2, 'Laptop', 1299.99, 'laptop, computer');
        INSERT INTO wishlist (user_id, name, price, keywords) VALUES (3, 'Camera', 599.99, 'camera, photography');
        INSERT INTO wishlist (user_id, name, price, keywords) VALUES (4, 'Headphones', 199.99, 'headphones, audio');
        INSERT INTO wishlist (user_id, name, price, keywords) VALUES (5, 'Smartwatch', 299.99, 'smartwatch, wearable');

        -- Insérer des listes de souhaits partagées
        INSERT INTO shared_wishlist (wishlist_id, shared_with_user_id) VALUES (1, 2);
        INSERT INTO shared_wishlist (wishlist_id, shared_with_user_id) VALUES (2, 3);
        INSERT INTO shared_wishlist (wishlist_id, shared_with_user_id) VALUES (3, 4);
        INSERT INTO shared_wishlist (wishlist_id, shared_with_user_id) VALUES (4, 5);
        INSERT INTO shared_wishlist (wishlist_id, shared_with_user_id) VALUES (5, 1);
    """)

    conn.commit()

    cur.execute("SELECT COUNT(*) FROM users;")
    users_count = cur.fetchone()[0]

    print("Insertion réussie. Nombre de lignes insérées :", users_count)

except Exception as e:
    print("Erreur lors de l'insertion :", e)
    conn.rollback()

finally:
    cur.close()
    conn.close()

