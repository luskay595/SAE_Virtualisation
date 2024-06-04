# Dockerfile pour PostgreSQL
FROM postgres:13-alpine

ENV POSTGRES_DB=shopping_list
ENV POSTGRES_USER=admin
ENV POSTGRES_PASSWORD=@dmin123

WORKDIR /app

COPY init.sql /docker-entrypoint-initdb.d/

EXPOSE 5432

