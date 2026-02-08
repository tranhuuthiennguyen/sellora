import { ConflictException, NotFoundException } from "@/core/exceptions";

export class UserAlreadyExistsError extends ConflictException {
  static readonly message = "User already exists";

  constructor(cause?: Error, metadata?: unknown) {
    super(UserAlreadyExistsError.message, cause, metadata);
  }
}

export class UserNotFoundError extends NotFoundException {
  static readonly message = "User not found";

  constructor() {
    super(UserNotFoundError.message);
  }
}
