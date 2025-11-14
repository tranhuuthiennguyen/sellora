import { BaseResponseSchema } from "@schemas/common.schema";
import { Type } from "@sinclair/typebox";
import { FastifySchema } from "fastify";

export const UserSchema = Type.Object({
  id: Type.Number(),
  email: Type.String({
    format: "email",
    errorMessage: { format: "Invalid Email" },
  }),
  username: Type.String(),
  displayName: Type.String(),
  bio: Type.String(),
  currencyType: Type.String(),
  profilePictureUrl: Type.String(),
  country: Type.String(),
  state: Type.String(),
  city: Type.String(),
  zipCode: Type.String(),
  streetAddress: Type.String(),
  createdAt: Type.String({ format: "date-time" }),
  updatedAt: Type.String({ format: "date-time" }),
});

export const GetUserByIdSchema: FastifySchema = {
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
  username: Type.String(),
  currencyType: Type.String(),
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

export const DeleteUserSchema: FastifySchema = {
  response: {
    200: BaseResponseSchema,
  },
};
