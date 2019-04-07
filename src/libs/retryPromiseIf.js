/**
 * Helper function to create a promise that will resolve after a give delay millis
 * @param {Number} delay
 * @return {Promise}
 */
const delayPromise = (delay) => new Promise(resolve => {
  return setTimeout(resolve, delay);
});

/**
 * This helper function will retry promise for a given no of retries if:
 * - The promise fails
 * - A given condition is passed
 *
 * @param {Function} promiseFn
 * @param {Function} retryIf
 * @param {Number} noOfRetries
 * @param {Number} delay the delay between retries
 * @return {Promise}
 */
module.exports = (promiseFn, { retryIf, noOfRetries, delay = 0 }) => {
  let retries = 0;

  const callFn = async () => {
    try {
      return await promiseFn(retries);
    } catch(err) {
      retries ++;
      const shouldRetry = retryIf(err) && (retries < noOfRetries);
      if (shouldRetry) {
        await delayPromise(delay);
        return callFn();
      } else {
        throw err;
      }
    }
  };

  return callFn();
};
