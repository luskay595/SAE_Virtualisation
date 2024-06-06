# Use the official PostgreSQL image as the base
FROM postgres:latest

# Add the initialization script
COPY init.sql /docker-entrypoint-initdb.d/

# Expose the PostgreSQL port
EXPOSE 5432
