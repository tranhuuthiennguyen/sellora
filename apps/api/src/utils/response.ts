import { FastifyReply } from "fastify";

type SuccessResponseOptions<T> = {
  statusCode: number;
  message: string;
  data?: T;
};

type ErrorResponseOptions = {
  statusCode: number;
  message: string;
};

export const sendSuccess = <T>(
  reply: FastifyReply,
  { statusCode, message, data }: SuccessResponseOptions<T>,
) => {
  return reply.code(statusCode).send({
    success: true,
    message,
    data: data ?? null,
  });
};

export const sendError = (
  reply: FastifyReply,
  { statusCode, message }: ErrorResponseOptions,
) => {
  return reply.code(statusCode).send({
    success: false,
    message,
  });
};
