const moment = require('moment');
const util = require('util');
const {
  getReturnValue,
  getReturnValuePercentage,
} = require('./returnValue');

const getRowInfo = row =>
  util.format(
    '%s: Closed at %s (%s ~ %s)',
    moment(row.getDate()).format('DD.MM.YY'),
    row.getClose().toFixed(2),
    row.getLow().toFixed(2),
    row.getHigh().toFixed(2)
  );

const roundTo1DecimalPlaces = (num, decimalPlaces) =>
  Math.round(num * 10) / 10;

const getDrawdownInfo = row =>
  util.format(
    '-%d% (%d on %s -> %d on %s)',
    roundTo1DecimalPlaces(row.getDrawDownPercentage()),
    row.getHigh(),
    moment(row.getDate()).format('DD.MM.YY'),
    row.getLow(),
    moment(row.getDate()).format('DD.MM.YY')
  );

const getReturnInfo = rows => {
  const firstRow = rows[0];
  const lastRow = rows[rows.length - 1];
  return util.format(
    'Return: %d [%d%] (%d on %s -> %d on %s)',
    getReturnValue(firstRow, lastRow),
    roundTo1DecimalPlaces(getReturnValuePercentage(firstRow, lastRow)),
    firstRow.getClose(),
    moment(firstRow.getDate()).format('DD.MM.YY'),
    lastRow.getClose(),
    moment(lastRow.getDate()).format('DD.MM.YY')
  );
};


module.exports = {
  getReturnInfo,
  getDrawdownInfo,
  getRowInfo,
};
