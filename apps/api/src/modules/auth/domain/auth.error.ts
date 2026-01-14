import { InvalidCredentialsError } from "@/core/exceptions";

export class IncorrectPasswordError extends InvalidCredentialsError {
  static readonly message = "Incorrect password";
  constructor() {
    super(IncorrectPasswordError.message);
  }
}

export class UnauthorizedError extends InvalidCredentialsError {
  static readonly error = "UNAUTHORIZED";
  constructor() {
    super(UnauthorizedError.error);
  }
}
