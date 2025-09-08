# Étape 1 : Image Node
FROM node:18

# Étape 2 : Dossier de travail
WORKDIR /app

# Étape 3 : Copier package.json + installer dépendances
COPY package*.json ./
RUN npm install

# Étape 4 : Copier le reste du projet
COPY . .

# Étape 5 : Exposer le port de ton backend (8000 d’après toi)
EXPOSE 8000

# Étape 6 : Lancer ton backend
# ⚠️ adapte la commande selon ton projet :
#   - "node server.js"
#   - ou "npm run start"
#   - ou "npm run dev" si tu veux le mode dev
CMD ["npm", "run", "start"]
