class BaseError extends Error {
  code = 500;
  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, BaseError.prototype);
    this.name = this.constructor.name;
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, BaseError);
    }
  }
}

class NotFoundError extends BaseError {
  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, NotFoundError.prototype);
    this.name = this.constructor.name;
    this.code = 404;
  }
}

class ValidationError extends BaseError {
  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, NotFoundError.prototype);
    this.name = this.constructor.name;
    this.code = 400;
  }
}

class DbError extends BaseError {
  code = 500;
}

class ExternalAPIError extends BaseError {
  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, ExternalAPIError.prototype);
    this.name = this.constructor.name;
    this.code = 404;
  }
}

class UnAuthorized extends BaseError {
  code = 401;
  constructor(status: number, message: string) {
    super(message);
    this.code = status;
    Object.setPrototypeOf(this, ExternalAPIError.prototype);
    this.name = this.constructor.name;
  }
}

export {
  BaseError,
  DbError,
  ExternalAPIError,
  NotFoundError,
  UnAuthorized,
  ValidationError,
};
