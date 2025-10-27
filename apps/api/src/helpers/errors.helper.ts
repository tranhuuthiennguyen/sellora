import { FastifyReply } from "fastify";

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
  unauthorizedAccess: new AppError("Unauthorized access", 401),
  internalServerError: new AppError("Internal Server Error", 500),
};

export const handleServerError = (reply: FastifyReply, error: any) => {
  reply.log.error(error);

  if (error instanceof AppError) {
    return reply.status(error.statusCode).send({ message: error.message });
  }

  return reply
    .status(ERRORS.internalServerError.statusCode)
    .send(ERRORS.internalServerError.message);
};
