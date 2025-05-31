const classes = require("./classList");

function generateStats(selectedClass) {
  const playerClass = classes.find((cls) => cls.name === selectedClass);
  if (!playerClass) throw new Error("Classe invalide.");

  const { statsRange, multipliers, bonus } = playerClass;

  const character = {
    class: selectedClass,
    healthPoints: 100 * multipliers.healthPoints,
    bonus,
    stats: {
      strength:
        Math.floor(
          Math.random() * (statsRange.strength[1] - statsRange.strength[0] + 1)
        ) + statsRange.strength[0],
      agility:
        Math.floor(
          Math.random() * (statsRange.agility[1] - statsRange.agility[0] + 1)
        ) + statsRange.agility[0],
      intelligence:
        Math.floor(
          Math.random() *
            (statsRange.intelligence[1] - statsRange.intelligence[0] + 1)
        ) + statsRange.intelligence[0],
      luck:
        Math.floor(
          Math.random() * (statsRange.luck[1] - statsRange.luck[0] + 1)
        ) + statsRange.luck[0],
    },
  };

  return character;
}

module.exports = generateStats;
