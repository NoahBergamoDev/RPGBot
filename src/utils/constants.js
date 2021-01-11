// const RuleSystem = require("../models/RuleSystem");
// const Attribute = require("../models/Attribute");

const Dices = {
  D4: 0,
  D6: 1,
  D8: 2,
  D10: 3,
  D12: 4,
  D20: 5,
  D100: 6,
};
const AttackRollType = {
  ADVANTAGE: 0,
  DISADVANTAGE: 1,
  STRAIGHT_ROLL: 2,
};

const AttributeRollType = {
  EXCLUDE_MIN: 0,
  EXCLUDE_MAX: 1,
  EXCLUDE_MIN_MAX: 2,
  STRAIGHT_ROLL: 3,
};
// const DungeonsNDragons5E = new RuleSystem(
//   "D&D 5E",
//   [
//     new Attribute("Strength", "STR"),
//     new Attribute("Dexterity", "DEX"),
//     new Attribute("Constituiton", "CON"),
//     new Attribute("Intelligence", "INT"),
//     new Attribute("Wisdom", "WIS"),
//     new Attribute("Charisma", "CHA"),
//   ],
//   Dices.D6,
//   4,
//   AttributeRollType.EXCLUDE_MIN
// );

const SessionFrequency = {
  ONE_SHOT: 0,
  DAILY: 1,
  TWICE_A_WEEK: 2,
  WEEKLY: 3,
  BIWEEKLY: 4,
  MONTHLY: 5,
  OTHERS: 6,
};

module.exports = Object.freeze({
  DICES: Dices,
  ATTACK_ROLL_TYPE: AttackRollType,
  ATTRIBUTE_ROLL_TYPE: AttributeRollType,
  // DUNGEONS_N_DRAGONS_5E: DungeonsNDragons5E,
  DUNGEONS_N_DRAGONS_5E: "",
  SESSION_FREQUENCY: SessionFrequency,
});
