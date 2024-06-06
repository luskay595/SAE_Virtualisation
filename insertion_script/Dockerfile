# Utiliser une image de base légère de Python
FROM python:3.8-slim

# Définir le répertoire de travail dans le conteneur
WORKDIR /app

# Copier le script Python et le fichier de configuration
COPY script.py .
COPY requirements.txt .

# Installer les dépendances Python
RUN pip install --no-cache-dir -r requirements.txt

# Commande pour exécuter le script Python
CMD ["python", "script.py"]

