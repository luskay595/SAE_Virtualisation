# Utiliser l'image officielle PostgreSQL comme base
FROM postgres:latest

# Ajouter le script d'initialisation
COPY init.sql /docker-entrypoint-initdb.d/


# Exposer le port PostgreSQL
EXPOSE 5432

