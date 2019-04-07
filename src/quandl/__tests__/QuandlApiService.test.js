const QuandlApiService = require('../QuandlApiService');
const DatasetRow = require('../../stocks/DatasetRow');

describe('QuandlApiService', () => {
  const apiService = {
    get: jest.fn(),
  };

  it('It should resolve with the data returned by axios', async () => {
    const quandlApiService = new QuandlApiService(apiService);

    apiService.get.mockImplementationOnce(() => Promise.resolve({
      data: {
        dataset: {
          column_names: ['Date', 'High', 'Low', 'Close', 'Open'],
          data: [
            ['today', 10, 20, 30, 40],
            ['today', 10, 20, 30, 40],
          ],
        }
      }
    }));

    const result = await quandlApiService.getDataset({});

    expect(result).toBeInstanceOf(Array);
    expect(result.length).toBe(2);
    expect(result[0]).toBeInstanceOf(DatasetRow);
    expect(result[0].getDate()).toEqual('today');
    expect(result[0].getHigh()).toEqual(10);
    expect(result[0].getLow()).toEqual(20);
    expect(result[0].getClose()).toEqual(30);
    expect(result[0].getOpen()).toEqual(40);
  });
});
