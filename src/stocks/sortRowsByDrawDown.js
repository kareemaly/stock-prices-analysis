/**
 * Sort dataset rows by drawdown percentage
 * @param {DatasetRow[]} rows
 * @return {DatasetRow[]}
 */
module.exports = rows => [...rows]
  .sort((a, b) => b.getDrawDownPercentage() - a.getDrawDownPercentage());
