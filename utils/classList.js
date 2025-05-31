const classes = [
  {
    name: "Guerrier",
    statsRange: {
      strength: [10, 12],
      agility: [5, 7],
      intelligence: [3, 5],
      luck: [4, 6],
    },
    multipliers: { healthPoints: 1.2, mana: 0.5 }, // Vie élevée, mana faible
    bonus: { physicalResistance: 3 }, // Réduit les dégâts physiques reçus
    weapons: ["Épée du Vagabond", "Marteau de Guerre", "Hache de Bataille"],
  },
  {
    name: "Mage",
    statsRange: {
      strength: [3, 5],
      agility: [6, 8],
      intelligence: [10, 12],
      luck: [5, 7],
    },
    multipliers: { healthPoints: 0.8, mana: 1.5 }, // Vie faible, mana élevé
    bonus: { spellPower: 3 }, // Augmente la puissance des sorts
    weapons: ["Bâton de l'Aether", "Grimoire des Arcanes", "Sceptre Étoilé"],
  },
  {
    name: "Voleur",
    statsRange: {
      strength: [5, 7],
      agility: [10, 12],
      intelligence: [6, 8],
      luck: [7, 9],
    },
    multipliers: { healthPoints: 1.0, criticalChance: 1.2 }, // Critique plus fréquent
    bonus: { evasion: 2 }, // Augmente les chances d'esquive
    weapons: ["Dague du Crépuscule", "Épée Fine", "Arbalète Légère"],
  },
  {
    name: "Nécromancien",
    statsRange: {
      strength: [4, 6],
      agility: [6, 8],
      intelligence: [9, 11],
      luck: [5, 7],
    },
    multipliers: { healthPoints: 1.0, summonPower: 1.5 }, // Renforce les invocations
    bonus: { undeadMastery: 3 }, // Les invocations ont plus de vie
    weapons: ["Bâton des Ombres", "Grimoire Maudit", "Amulette d’Invocation"],
  },
  {
    name: "Berserker",
    statsRange: {
      strength: [12, 14],
      agility: [7, 9],
      intelligence: [3, 5],
      luck: [6, 8],
    },
    multipliers: { healthPoints: 1.3, rageMultiplier: 1.5 }, // Plus il prend de dégâts, plus il devient fort
    bonus: { bloodlust: 4 }, // Gagne de la force en combat prolongé
    weapons: ["Hache Massacreuse", "Marteau d'Obsidienne", "Épée à Deux Mains"],
  },
  {
    name: "Paladin",
    statsRange: {
      strength: [8, 10],
      agility: [5, 7],
      intelligence: [7, 9],
      luck: [4, 6],
    },
    multipliers: { healthPoints: 1.1, healingPower: 1.3 }, // Bonus aux soins et vie moyenne
    bonus: { holyShield: 3 }, // Réduit les dégâts magiques reçus
    weapons: ["Épée Sacrée", "Marteau Bénit", "Bâton de Lumière"],
  },
];

module.exports = classes;
