# 🔥 RPG Backend API

## 🏹 Introduction
Bienvenue dans l'API backend pour notre jeu de rôle ! Ce projet permet la gestion des utilisateurs, des scénarios, des classes et des armes avec Firebase.

## ⚡ Fonctionnalités principales
- **Gestion des utilisateurs** : Inscription, connexion, récupération de profil, suppression.
- **Classes de personnage** : Chaque joueur choisit une classe avec des stats uniques.
- **Inventaire et armes** : Attribution d'armes spécifiques en fonction de la classe.
- **Scénarios dynamiques** : Ajout, récupération et suppression de scénarios depuis une base de données.

## 🛠 Installation
### 📌 Prérequis
- Node.js (v16+)
- Firebase
- Git (optionnel)

#### 🚀 Démarrer le projet
1. Clone ce dépôt :
   ```bash
   git clone https://github.com/MathieuR-Git/JDR_backend.git
   cd rpg-backend

2. Installe les dépendances :
npm install

3. Configure Firebase :
Crée un fichier .env avec :
JWT_SECRET=ton_secret
FIREBASE_CREDENTIALS=chemin/vers/ton/fichier.json

4. Lance le serveur :
npm start

###📜 API Endpoints
🔹 Utilisateurs
Méthode	Endpoint	Description
POST	/api/users/register	Inscription d'un utilisateur
POST	/api/users/login	Connexion d'un utilisateur
GET	/api/users/:id	Récupération du profil
PUT	/api/users/:id	Mise à jour des infos (admin uniquement)
DELETE	/api/users/:id	Suppression du compte (admin uniquement)

🔹 Scénarios
Méthode	Endpoint	Description
POST	/api/scenarios/pending	Ajout de scénarios en attente
GET	/api/scenarios/pending	Récupération des scénarios
DELETE	/api/scenarios/pending/:id	Suppression d'un scénario

🎭 Classes et Stats
Chaque joueur choisit une classe, avec :
Stats variables (strength, agility, intelligence, luck).
Bonus de classe influençant son style de jeu.
Multiplicateurs (healthPoints, mana, etc.).
Arme de départ adaptée à la classe.

🔥 Technologies utilisées
Node.js
Express.js
Firebase Firestore
JWT (authentification)
Bcrypt (hashing de mot de passe)

🤝 Contribuer
Les contributions sont bienvenues ! Clone le repo, fais tes modifs et crée une pull request.

📌 Contact
Si tu as des questions ou besoin d'aide, ouvre une issue sur GitHub. 🎯
