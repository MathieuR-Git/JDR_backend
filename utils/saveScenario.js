const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
const path = require("path");
const pendingFilePath = path.resolve(
  __dirname,
  "../data/pending_scenarios.json"
);

// Fonction pour sauvegarder un scénario en attente de validation
function savePendingScenario(scenario) {
  let pendingScenarios = [];

  try {
    if (fs.existsSync(pendingFilePath)) {
      const rawData = fs.readFileSync(pendingFilePath, "utf-8");
      pendingScenarios = JSON.parse(rawData);
    }
  } catch (error) {
    console.error("Erreur lecture du fichier JSON:", error);
  }

  // Génération d’un ID **unique** à chaque appel
  const newScenario = { id: uuidv4(), ...scenario };

  pendingScenarios.push(newScenario);
  fs.writeFileSync(pendingFilePath, JSON.stringify(pendingScenarios, null, 2));

  console.log("Scénario ajouté avec succès :", newScenario);
}

module.exports = savePendingScenario;
