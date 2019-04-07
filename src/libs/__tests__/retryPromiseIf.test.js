const retryPromiseIf = require('../retryPromiseIf');

describe('retryPromiseIf', () => {
  it('It should resolve if one of the retries resolved', async () => {
    const promise = retryPromiseIf((retries) => {
      if (retries === 0) {
        return Promise.reject('foo');
      }
      return Promise.resolve('resolved');
    }, {
      noOfRetries: 2,
      retryIf: () => true,
    });

    await expect(promise).resolves.toEqual('resolved');
  });

  it('If promise failed it should return last rejected promise', async () => {
    const promise = retryPromiseIf((retries) => {
      if (retries === 0) {
        return Promise.reject('foo');
      }
      return Promise.reject('bar');
    }, {
      noOfRetries: 2,
      retryIf: () => true,
    });

    await expect(promise).rejects.toEqual('bar');
  });

  it('It should keep retrying the given no of retries', async () => {
    const promise = retryPromiseIf((retries) => {
      if (retries < 4) {
        return Promise.reject('foo');
      }
      return Promise.resolve('bar');
    }, {
      noOfRetries: 5,
      retryIf: () => true,
    });

    await expect(promise).resolves.toEqual('bar');
  });

  it('It should retry only if the given condition is true', async () => {
    const promise = retryPromiseIf((retries) => {
      if (retries < 2) {
        return Promise.reject('foo');
      } else if (retries < 3) {
        // It should stop retrying here and return a rejected promise
        return Promise.reject('bar');
      }
      return Promise.resolve('resolved');
    }, {
      noOfRetries: 5,
      retryIf: err => err === 'foo',
    });

    await expect(promise).rejects.toEqual('bar');
  });
});
