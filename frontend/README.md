# Wishlist Frontend

This is the frontend application for the Wishlist project.

## Build and Run with Docker

```bash
cd SAE_Virtualisation/frontend
docker build -t wishlist-frontend .
docker run -d --name wishlist-frontend --network sae-network -p 8080:8080 wishlist-frontend

### Étapes pour Construire et Exécuter le Conteneur Docker

1. **Créer le Réseau Docker (si ce n'est pas déjà fait)**
    ```bash
    docker network create sae-network
    ```

2. **Construire l'Image Docker pour le Frontend**
    ```bash
    cd SAE_Virtualisation/frontend
    docker build -t wishlist-frontend .
    ```

3. **Exécuter le Conteneur Docker pour le Frontend**
    ```bash
    docker run -d --name wishlist-frontend --network sae-network -p 8080:8080 wishlist-frontend
    ```

En suivant cette structure et ces étapes, vous devriez pouvoir configurer, construire et exécuter le conteneur Docker pour la partie frontend de votre application de liste d'envies.

