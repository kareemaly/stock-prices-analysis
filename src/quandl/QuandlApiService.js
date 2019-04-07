const DatasetRow = require('../stocks/DatasetRow');

class QuandlApiService {
  constructor(apiService) {
    this.apiService = apiService;
  }

  /**
   * GET dataset rows from quandl API.
   * @param  {String} symbol
   * @param  {Object|String} startDate
   * @param  {Object|String} endDate
   * @param  {String} apiKey
   * @return {Promise.<DatasetRow[]>}
   */
  getDataset({
    symbol,
    startDate,
    endDate,
    apiKey,
  }) {
    const params = {
      api_key: apiKey,
      start_date: startDate,
      end_date: endDate,
      order: 'asc',
    };

    const url = `https://www.quandl.com/api/v3/datasets/WIKI/${symbol}.json`;

    return this.apiService.get(url, { params })
      .then(
        ({
          data: {
            dataset: {
              column_names,
              data,
            },
          },
        }) => data.map(
          row => new DatasetRow({
            date: row[column_names.indexOf('Date')],
            open: row[column_names.indexOf('Open')],
            high: row[column_names.indexOf('High')],
            low: row[column_names.indexOf('Low')],
            close: row[column_names.indexOf('Close')],
          }),
        )
      );
  }
}

module.exports = QuandlApiService;
