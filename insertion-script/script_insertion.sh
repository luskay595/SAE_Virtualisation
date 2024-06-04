#!/bin/sh

psql -U user -d shopping_list -h postgres-db -c "INSERT INTO users (username, password) VALUES ('testuser', 'testpass');"
psql -U user -d shopping_list -h postgres-db -c "INSERT INTO shopping_lists (name, user_id) VALUES ('Test List', 1);"
psql -U user -d shopping_list -h postgres-db -c "INSERT INTO items (name, list_id) VALUES ('Milk', 1);"
psql -U user -d shopping_list -h postgres-db -c "INSERT INTO items (name, list_id) VALUES ('Bread', 1);"

