import {
  ChangePasswordInputSchema,
  ChangePasswordResponseSchema,
  LoginInputSchema,
  LoginResponseSchema,
} from "@sellora/shared";
import { FastifySchema } from "fastify";

export const LoginSchema: FastifySchema = {
  body: LoginInputSchema,
  response: LoginResponseSchema,
};

export const ChangePasswordSchema: FastifySchema = {
  body: ChangePasswordInputSchema,
  response: ChangePasswordResponseSchema,
};
