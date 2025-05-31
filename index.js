const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const scenariosRoutes = require("./routes/scenarios");
const usersRoutes = require("./routes/users"); // Importation du fichier de routes

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use("/api", [scenariosRoutes, usersRoutes]);

app.get("/scenarios", (req, res) => {
  res.send("Bienvenue sur l’API RPG !");
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`🚀 Serveur démarré sur http://localhost:${PORT}`);
});

/**
 * https://console.firebase.google.com/u/0/project/jeu-de-role-8d3e7/firestore/databases/-default-/data/~2Fusers
 */
