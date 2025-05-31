const express = require("express");
const router = express.Router();
const fs = require("fs");
const db = require("../config/firebase");
const path = require("path");
const pendingFilePath = path.resolve(
  __dirname,
  "../data/pending_scenarios.json"
);
const savePendingScenario = require("../utils/saveScenario");
/** GET REQUESTS */
router.get("/scenarios", async (req, res) => {
  try {
    const snapshot = await db.collection("scenarios").get();
    const scenarios = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    res.json(scenarios);
  } catch (error) {
    res.status(500).json({ error: "pas d'bol " + error.message });
  }
});

router.get("/scenarios/pending", async (req, res) => {
  try {
    if (fs.existsSync(pendingFilePath)) {
      savePendingScenario(req.body);
      return res.json("Scénario en attente de validation.");
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/** POST REQUESTS */
router.post("/scenarios/", async (req, res) => {
  try {
    if (!fs.existsSync(pendingFilePath)) {
      return res.status(404).json({ error: "Aucun scénario en attente." });
    }

    // Lire les scénarios en attente
    const rawData = fs.readFileSync(pendingFilePath, "utf-8");
    const pendingScenarios = JSON.parse(rawData);

    // Enregistrer chaque scénario dans Firebase
    for (const scenario of pendingScenarios) {
      await db.collection("scenarios").doc(scenario.id).set(scenario);
    }

    // Option : Vider le fichier après validation
    fs.writeFileSync(pendingFilePath, JSON.stringify([], null, 2));

    res.json({
      message: "Tous les scénarios ont été enregistrés avec succès !",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/scenarios/pending", async (req, res) => {
  try {
    savePendingScenario(req.body);
    res.json({ message: "Scénario enregistré en attente de validation." });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**DELETE REQUESTS */

router.delete("/scenarios/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // Vérifier si le scénario existe dans Firebase
    const scenarioRef = db.collection("scenarios").doc(id);
    const scenarioSnapshot = await scenarioRef.get();

    if (!scenarioSnapshot.exists) {
      return res
        .status(404)
        .json({ error: "Scénario non trouvé dans la base de données." });
    }

    // Supprimer le scénario
    await scenarioRef.delete();

    res.json({
      message: "Scénario supprimé avec succès de la base de données !",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
router.delete("/scenarios/pending/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // Vérifier si le fichier existe
    if (!fs.existsSync(pendingFilePath)) {
      return res.status(404).json({ error: "Fichier JSON introuvable." });
    }

    // Lire les scénarios actuels
    const rawData = fs.readFileSync(pendingFilePath, "utf-8");
    let pendingScenarios = JSON.parse(rawData);

    // Filtrer les scénarios et supprimer celui avec l'ID correspondant
    const updatedScenarios = pendingScenarios.filter(
      (scenario) => scenario.id !== id
    );

    // Vérifier si un scénario a été supprimé
    if (pendingScenarios.length === updatedScenarios.length) {
      return res.status(404).json({ error: "Scénario non trouvé." });
    }

    // Écrire les scénarios mis à jour dans le fichier
    fs.writeFileSync(
      pendingFilePath,
      JSON.stringify(updatedScenarios, null, 2)
    );

    res.json({ message: "Scénario supprimé avec succès !" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;

module.exports = router;
