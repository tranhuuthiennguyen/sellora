import { ExceptionBase } from "./exception-base";

enum ExceptionError {
  BAD_REQUEST = "BAD_REQUEST",
  CONFLICT = "CONFLICT",
  NOT_FOUND = "NOT_FOUND",
  INTERNAL_SERVER_ERROR = "INTERNAL_SERVER_ERROR",
  DATABASE_ERROR = "DATABASE_ERROR",
  INVALID_CREDENTIALS = "INVALID_CREDENTIALS",
  FORBIDDEN_ERROR = "FORBIDDEN_ERROR",
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
  readonly statusCode = 404;
  readonly error = ExceptionError.NOT_FOUND;
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

export class ForbiddenErrorException extends ExceptionBase {
  static readonly message = "Action Forbidden";
  readonly statusCode = 403;
  readonly error = ExceptionError.FORBIDDEN_ERROR;

  constructor() {
    super(ForbiddenErrorException.message);
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
