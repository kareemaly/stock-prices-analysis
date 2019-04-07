const moment = require('moment');
const util = require('util');
const ApiService = require('./src/libs/ApiService');
const retryPromiseIf = require('./src/libs/retryPromiseIf');
const QuandlApiService = require('./src/quandl/QuandlApiService');
const { ApiResponseError, ClientRequestError } = require('./src/libs/errors');
const createLogger = require('./src/libs/createLogger');
const sortRowsByDrawDown = require('./src/stocks/sortRowsByDrawDown');
const {
  getDrawdownInfo,
  getReturnInfo,
  getRowInfo,
} = require('./src/stocks/infoRenderer');

const dateFormat = 'YYYY-MM-DD';

/**
 * Validate date inputs have the correct format
 * @param {String} startDate
 * @param {String} endDate
 * @throws Error if there was a validation error
 */
const validateDates = ({ startDate, endDate }) => {
  if (!moment(startDate, dateFormat).isValid()) {
    throw new Error(`--start is not valid format ${dateFormat}`);
  }

  if (endDate && !moment(endDate, dateFormat).isValid()) {
    throw new Error(`--end is not valid format ${dateFormat}`);
  }
};

/**
 * Call the api to get stock dataset rows.
 * @param {Object} serviceArgs
 * @return {Promise.resolve<Dataset[]>}
 */
const getStockDatasetRows = (serviceArgs) => {
  const stockApiService = new QuandlApiService(
    new ApiService()
  );

  return retryPromiseIf(
    () => stockApiService.getDataset(serviceArgs),
    {
      // Retry if it was a client request error (network error)
      retryIf: error => error instanceof ClientRequestError,
      noOfRetries: 3,
      delay: 1000,
    },
  );
};

/**
 * Print dataset information
 * @param {DatasetRow[]} datasetRows
 */
const printDatasetInfo = (datasetRows) => {
  datasetRows
    .forEach(row => console.log(getRowInfo(row)));

  console.log('');
  console.log('First 3 Drawdowns:');
  const drawdownSortedRows = sortRowsByDrawDown(datasetRows);

  drawdownSortedRows
    .slice(0, 3)
    .forEach(row => console.log(getDrawdownInfo(row)));

  console.log('');
  console.log(`Maximum drawdown: ${getDrawdownInfo(drawdownSortedRows[0])}`);
  console.log('');
  console.log(getReturnInfo(datasetRows))
};

/**
 * Display error to the user
 * @param err
 * @param logger
 */
const displayError = (err, logger) => {
  if (err instanceof ApiResponseError) {
    logger.error('Stock api responded with ' + JSON.stringify({
      status: err.data.status,
      message: err.data.body,
    }, null, 2));
  }

  else if (err instanceof ClientRequestError) {
    logger.error('Make sure you are connected to the network and try again.');
  }

  else {
    logger.error(err.message);
  }
};

/**
 * Run the stats
 * @param  {String} symbol  e.g. AAPL
 * @param  {String} start   Date string with format YYYY-MM-DD
 * @param  {String} end     Date string with format YYYY-MM-DD
 * @param  {String} key     API key
 * @param  {Boolean} verbose to change logging level to verbose
 */
const run = async ({
  symbol,
  start: startDate,
  end: endDate,
  key: apiKey,
  verbose,
}) => {
  const logger = createLogger({
    level: verbose ? 'verbose' : 'info',
  });

  try {
    // Validate dates formates
    await validateDates({ startDate, endDate });

    // Call api to get dataset rows
    const serviceArgs = { symbol, startDate, endDate, apiKey };
    logger.verbose(util.format('Calling quandl API with params %j', serviceArgs));
    const datasetRows = await getStockDatasetRows(serviceArgs);

    // Print dataset information
    await printDatasetInfo(datasetRows);
  } catch(err) {
    displayError(err, logger);
  }
};

run(
  require('yargs')
    .usage('Usage: $0 [options]')
    .help('h')
    .version(false)
    .describe('start', `date in format ${dateFormat}`)
    .describe('end', `date in format ${dateFormat}`)
    .describe('key', 'API Key')
    .describe('symbol', 'e.g. AAPL')
    .describe('verbose', 'Log level verbose')
    .alias('h', 'help')
    .alias('v', 'verbose')
    .boolean('verbose')
    .demandOption(['symbol', 'start', 'key'])
    .argv
);
