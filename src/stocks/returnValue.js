/**
 * @param  {DatasetRow} firstRow
 * @param  {DatasetRow} lastRow
 * @return {Number}
 */
const getReturnValue = (firstRow, lastRow) =>
  lastRow.getClose() - firstRow.getClose();

/**
 * @param  {DatasetRow} firstRow
 * @param  {DatasetRow} lastRow
 * @return {Number}
 */
const getReturnValuePercentage = (firstRow, lastRow) =>
  (getReturnValue(firstRow, lastRow) / lastRow.getClose()) * 100;

module.exports = {
  getReturnValue,
  getReturnValuePercentage,
};
