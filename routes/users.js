const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
// const admin = require("../config/firebase"); // Connexion Firebase
const db = require("../config/firebase"); // Connexion Firebase

const verifyAdmin = require("../middleware/verifyAdmin");
const generateStats = require("../utils/generateStats");
const randomWeapon = require("../utils/randomWeapon");

const router = express.Router();
// const db = admin.firestore();

// Clé secrète pour le JWT (mettre dans .env)
const JWT_SECRET = process.env.JWT_SECRET;

// Route POST - Inscription
router.post("/users/register", async (req, res) => {
  try {
    const { username, email, password, userClass } = req.body; // ✅ Correction

    if (!username || !email || !password || !userClass) {
      return res
        .status(400)
        .json({ error: "Tous les champs sont obligatoires." });
    }

    // Hashage du mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);
    const stats = generateStats(userClass);
    const weapon = randomWeapon(userClass);

    // Création des données de l'utilisateur
    const newUser = {
      username,
      email,
      password: hashedPassword,
      createdAt: new Date().toISOString(), // Timestamp en UTC
      userClass,
      inventory: [weapon],
      isAdmin: false,
      stats,
    };

    // Sauvegarde dans Firebase
    const userRef = await db.collection("users").add(newUser);
    res.json("Compte créé avec succés !");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Route POST - Connexion
router.post("/users/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Vérification de l'utilisateur
    const userSnapshot = await db
      .collection("users")
      .where("email", "==", email)
      .get();
    if (userSnapshot.empty)
      return res.status(404).json({ error: "Utilisateur introuvable" });

    const userData = userSnapshot.docs[0].data();
    const userId = userSnapshot.docs[0].id;

    // Vérification du mot de passe
    const validPassword = await bcrypt.compare(password, userData.password);
    if (!validPassword)
      return res.status(401).json({ error: "Mot de passe incorrect" });

    // Génération du token JWT
    const token = jwt.sign({ id: userId, email }, JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({
      token,
      user: { id: userId, username: userData.username, email },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Route GET - Récupérer le profil utilisateur
router.get("/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const userRef = db.collection("users").doc(id);
    const userSnapshot = await userRef.get();

    if (!userSnapshot.exists)
      return res.status(404).json({ error: "Utilisateur non trouvé" });

    res.json(userSnapshot.data());
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Route PUT - Mise à jour des informations
router.put("/users/:id", verifyAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    await db.collection("users").doc(id).update(updatedData);
    res.json({ message: "Informations mises à jour avec succès !" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Route DELETE - Supprimer un compte
router.delete("/users/:id", verifyAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    await db.collection("users").doc(id).delete();
    res.json({ message: "Compte utilisateur supprimé avec succès !" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
