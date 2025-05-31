const jwt = require("jsonwebtoken");
const admin = require("../config/firebase");

// Middleware de vérification des permissions
async function verifyAdmin(req, res, next) {
  try {
    const token = req.headers.authorization?.split(" ")[1]; // Extraction du token
    if (!token)
      return res.status(401).json({ error: "Accès refusé. Token manquant." });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userRef = db.collection("users").doc(decoded.id);
    const userSnapshot = await userRef.get();

    if (!userSnapshot.exists)
      return res.status(404).json({ error: "Utilisateur introuvable." });

    const userData = userSnapshot.data();
    if (!userData.isAdmin)
      return res
        .status(403)
        .json({ error: "Accès refusé. Autorisation insuffisante." });

    next(); // Autorisation validée
  } catch (error) {
    res.status(401).json({ error: "Token invalide ou expiré." });
  }
}

module.exports = verifyAdmin;
