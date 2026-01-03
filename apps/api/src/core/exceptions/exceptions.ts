import { ExceptionBase } from "./exception-base";

enum ExceptionError {
  BAD_REQUEST = "Bad Request",
  CONFLICT = "Conflict",
  NOT_FOUND = "Not Found",
  INTERNAL_SERVER_ERROR = "Internal Server Error",
  DATABASE_ERROR = "Database Error",
  INVALID_CREDENTIALS = "Invalid Credentials",
}

/**
 * Used to indicate that an incorrect argument was provided to a method/function/class constructor
 *
 * @class ArgumentInvalidException
 * @extends {ExceptionBase}
 */
export class ArgumentInvalidException extends ExceptionBase {
  readonly statusCode = 400;
  readonly error = ExceptionError.BAD_REQUEST;
}

/**
 * Used to indicate conflicting entities (usually in the database)
 *
 * @class ConflictException
 * @extends {ExceptionBase}
 */
export class ConflictException extends ExceptionBase {
  readonly statusCode = 409;
  readonly error = ExceptionError.CONFLICT;
}

/**
 * Used to indicate that entity is not found
 *
 * @class NotFoundException
 * @extends {ExceptionBase}
 */
export class NotFoundException extends ExceptionBase {
  static readonly mesasge = ExceptionError.NOT_FOUND;
  readonly statusCode = 404;
  readonly error = ExceptionError.NOT_FOUND;

  constructor(message: string = NotFoundException.mesasge) {
    super(message);
  }
}

export class InvalidCredentialsError extends ExceptionBase {
  readonly statusCode = 401;
  readonly error = ExceptionError.INVALID_CREDENTIALS;
}

/**
 * Used to indicate an internal server error that does not fall under all other errors
 *
 * @class InternalServerErrorException
 * @extends {ExceptionBase}
 */
export class InternalServerErrorException extends ExceptionBase {
  static readonly message = ExceptionError.INTERNAL_SERVER_ERROR;
  readonly error = ExceptionError.INTERNAL_SERVER_ERROR;
  readonly statusCode = 500;

  constructor(message: string = InternalServerErrorException.message) {
    super(message);
  }
}

export class DatabaseErrorException extends ExceptionBase {
  static readonly message = "Database error";
  readonly error = ExceptionError.INTERNAL_SERVER_ERROR;
  constructor(message: string = DatabaseErrorException.message, cause?: Error) {
    super(message, cause);
  }

  readonly statusCode = 500;
}

export class ProviderErrorException extends ExceptionBase {
  static readonly message = "Provider error";
  readonly error = ExceptionError.INTERNAL_SERVER_ERROR;
  constructor(
    message: string = InternalServerErrorException.message,
    cause?: Error,
  ) {
    super(message, cause);
  }

  readonly statusCode = 500;
}
