import { ERROR400, ERROR409, ERROR500, responseProperty } from "@/constants";
import { Type } from "@sinclair/typebox";
import { FastifySchema } from "fastify";

export const CreateUserBody = Type.Object({
  username: Type.String(),
  email: Type.String({
    format: "email",
    errorMessage: { format: "Invalid Email" },
  }),
  password: Type.String({
    format: "regex",
    pattern: "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[#?!@$%^&*-])(?=.{8,})",
    errorMessage: {
      pattern:
        "password must minimum of 8 characters, 1 uppercase, lowercase, number and a special character",
    },
  }),
});

export const CreateUserSchema: FastifySchema = {
  body: CreateUserBody,
  response: {
    201: {
      type: "object",
      properties: {
        ...responseProperty,
        data: {
          type: "object",
          properties: {
            username: { type: "string" },
            email: { type: "string" },
          },
        },
      },
    },
    400: ERROR400,
    409: ERROR409,
    500: ERROR500,
  },
};

export const GetUserByIdSchema: FastifySchema = {};
