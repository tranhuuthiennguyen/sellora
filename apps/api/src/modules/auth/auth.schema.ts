import { LoginInputSchema, LoginResponseSchema } from "@sellora/shared/auth";
import { FastifySchema } from "fastify";

export const LoginSchema: FastifySchema = {
  body: LoginInputSchema,
  response: LoginResponseSchema,
};
