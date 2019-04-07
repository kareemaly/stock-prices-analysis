const mockAxios = require('axios');
const ApiService = require('../ApiService');
const { ApiResponseError, ClientRequestError } = require('../errors');

describe('ApiService', () => {
  it('It should resolve with the data returned by axios', async () => {
    const apiService = new ApiService();
    const data = { results: ['foo'] };

    // setup
    mockAxios.mockImplementationOnce(() =>
      Promise.resolve({ data: { results: ['foo'] } })
    );

    const promise = apiService.get('/foo');

    await expect(promise).resolves.toEqual({ data });
  });

  it('It should send query params and url to axios', async () => {
    const apiService = new ApiService();

    const params = { test: 'true' };

    apiService.get('/foo', { params });

    expect(mockAxios.mock.calls[0][0]).toEqual({
      method: 'GET',
      url: '/foo',
      params,
    });
  });

  it('It should reject with ApiResponseError if status is not 2xx', async () => {
    const apiService = new ApiService();

    // setup
    mockAxios.mockImplementationOnce(() =>
      Promise.reject({ response: {status: 500} })
    );

    const promise = apiService.get('/foo');

    expect(promise).rejects.toBeInstanceOf(ApiResponseError);
  });

  it('It should reject with ClientRequest if there was request but empty response', async () => {
    const apiService = new ApiService();

    // setup
    mockAxios.mockImplementationOnce(() =>
      Promise.reject({ response: null, request: {} })
    );

    const promise = apiService.get('/foo');

    expect(promise).rejects.toBeInstanceOf(ClientRequestError);
  });

  it('It should reject with the original error if unknown', async () => {
    const apiService = new ApiService();

    // setup
    mockAxios.mockImplementationOnce(() =>
      Promise.reject({ unknownError: 'bar' })
    );

    const promise = apiService.get('/foo');

    expect(promise).rejects.toEqual({ unknownError: 'bar' });
  });
});
