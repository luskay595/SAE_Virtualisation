# Utiliser une image de base légère de Node.js
FROM node:14-alpine

# Définir le répertoire de travail dans le conteneur
WORKDIR /app

# Copier les fichiers package.json et package-lock.json
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier le reste des fichiers de l'application
COPY . .

# Construire l'application pour la production
RUN npm run build

# Installer un serveur HTTP léger pour servir les fichiers statiques
RUN npm install -g serve
RUN npm install cors
# Exposer le port sur lequel l'application s'exécutera
EXPOSE 8085

# Commande pour lancer l'application Vue.js
CMD ["serve", "-s", "dist", "-l", "8085"]

