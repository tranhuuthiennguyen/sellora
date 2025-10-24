import { BaseResponseSchema } from "@schemas/common.schema";
import { Type } from "@sinclair/typebox";
import { FastifySchema } from "fastify";

export const UserSchema = Type.Object({
  id: Type.Number(),
  username: Type.String(),
  email: Type.String({
    format: "email",
    errorMessage: { format: "Invalid Email" },
  }),
  avatarUrl: Type.String(),
  createdAt: Type.String({ format: "date-time" }),
  updatedAt: Type.String({ format: "date-time" }),
});

export const GetUserByIdSchema: FastifySchema = {
  params: Type.Object({
    userId: Type.String(),
  }),
  response: {
    200: Type.Intersect([
      BaseResponseSchema,
      Type.Object({
        data: UserSchema,
      }),
    ]),
  },
};

export const GetAllUsersResponseSchema: FastifySchema = {
  response: {
    200: Type.Intersect([
      BaseResponseSchema,
      Type.Object({
        data: Type.Array(UserSchema),
      }),
    ]),
  },
};

export const CreateUserBody = Type.Object({
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
    201: Type.Intersect([
      BaseResponseSchema,
      Type.Object({
        data: UserSchema,
      }),
    ]),
  },
};

export const UpdateUserBody = Type.Partial(UserSchema);

export const UpdateUserSchema: FastifySchema = {
  body: UpdateUserBody,
  response: {
    200: Type.Intersect([
      BaseResponseSchema,
      Type.Object({
        data: UserSchema,
      }),
    ]),
  },
};
