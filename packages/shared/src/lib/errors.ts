export class AppError extends Error {
  statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    Object.setPrototypeOf(this, AppError.prototype);
  }
}

export const ERRORS = {
  userExists: new AppError("User with this Email/Username already exists", 409),
  userNotExists: new AppError("User not exists", 404),
  userCredError: new AppError("Invalid credential", 401),
  unauthorizedAccess: new AppError("Unauthorized", 401),
  internalServerError: new AppError("Internal Server Error", 500),
} as const;
