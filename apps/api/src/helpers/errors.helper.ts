import { AppError, ERRORS } from "@sellora/shared";
import { FastifyReply } from "fastify";

export const handleServerError = (reply: FastifyReply, error: any) => {
  reply.log.error(`Server error: ${error.message}`);

  if (error instanceof AppError) {
    return reply.code(error.statusCode).send({
      success: false,
      message: error.message,
    });
  }

  return reply.code(ERRORS.internalServerError.statusCode).send({
    success: false,
    message: ERRORS.internalServerError.message,
  });
};
