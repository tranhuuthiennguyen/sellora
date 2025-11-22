import { FastifySchema } from "fastify";
import { LoginInputSchema, LoginResponseSchema } from "@sellora/shared";

export const LoginSchema: FastifySchema = {
  body: LoginInputSchema,
  response: LoginResponseSchema,
};
