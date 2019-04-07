class DomainError extends Error {
  constructor(message) {
    super(message);
    // Ensure the name of this error is the same as the class name
    this.name = this.constructor.name;
    // This clips the constructor invocation from the stack trace.
    // It's not absolutely essential, but it does make the stack trace a little nicer.
    Error.captureStackTrace(this, this.constructor);
  }
}

class ApiResponseError extends DomainError {
  constructor(status, body, config, response) {
    super(`Request failed with status code ${status}`);
    this.data = { status, body, config, response };
  }
}

class ClientRequestError extends DomainError {
  constructor(clientRequest) {
    super(`Request failed with an empty response.`);
    this.data = { clientRequest };
  }
}

module.exports = {
  ApiResponseError,
  ClientRequestError,
};
