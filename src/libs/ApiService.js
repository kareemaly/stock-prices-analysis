const axios = require('axios');
const {
  ClientRequestError,
  ApiResponseError,
} = require('./errors');

class ApiService {
  async makeRequest(options) {
    try {
      return await axios(options);
    } catch(error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        throw new ApiResponseError(
          error.response.status,
          error.response.data,
          error.config,
          error.response,
        );
      } else if (error.request) {
        // The request was made but no response was received (most likely network error)
        // `error.request` is an instance of http.ClientRequest
        throw new ClientRequestError(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        throw error;
      }
    }
  }

  get(url, { params } = {}) {
    return this.makeRequest({
      method: 'GET',
      url,
      params,
    })
  }
}

module.exports = ApiService;
