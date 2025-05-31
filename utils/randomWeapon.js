const classes = require("./classList");

function getRandomWeapon(className) {
  const playerClass = classes.find(cls => cls.name === className);
  if (!playerClass || !playerClass.weapons) return "Arme inconnue";
  
//   const weapons = playerClass.weapons;
    return playerClass.weapons[
      Math.floor(Math.random() * playerClass.weapons.length)
    ];

}

module.exports = getRandomWeapon;
