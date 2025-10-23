import { Type } from "@sinclair/typebox";
import { FastifySchema } from "fastify";

export const GetUserSchema = Type.Object({
  username: Type.String(),
  email: Type.String({
    format: "email",
    errorMessage: { format: "Invalid Email" },
  }),
  role: Type.Union([
    Type.Literal("user"),
    Type.Literal("admin"),
    Type.Literal("moderator"),
  ]),
  avatarUrl: Type.String(),
  createdAt: Type.String({ format: "date-time" }),
  updatedAt: Type.String({ format: "date-time" }),
});

export const GetUserByIdSchema: FastifySchema = {
  params: Type.Object({
    userId: Type.String(),
  }),
  response: {
    200: GetUserSchema,
  },
};

export const GetAllUsersResponseSchema: FastifySchema = {
  response: {
    200: Type.Array(GetUserSchema),
  },
};

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
        data: {
          type: "object",
          properties: {
            username: { type: "string" },
            email: { type: "string" },
          },
        },
      },
    },
  },
};
