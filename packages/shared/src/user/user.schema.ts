import { EmailSchema, PasswordSchema } from "../validation/format.js";
import { BaseResponseSchema } from "../lib/common.schema.js";
import { Type } from "@sinclair/typebox";

export const UserSchema = Type.Object({
  id: Type.Number(),
  email: Type.String({
    format: "email",
    errorMessage: "Invalid Email",
  }),
  username: Type.String({
    minLength: 1,
  }),
  displayName: Type.Optional(Type.String()),
  bio: Type.Optional(
    Type.String({
      maxLength: 500,
    }),
  ),
  currencyType: Type.String(),
  profilePictureUrl: Type.Optional(Type.String()),
  country: Type.Optional(Type.String()),
  state: Type.Optional(Type.String()),
  city: Type.Optional(Type.String()),
  zipCode: Type.Optional(Type.String()),
  streetAddress: Type.Optional(Type.String()),
  timezone: Type.String(),
  createdAt: Type.String({ format: "date-time" }),
  updatedAt: Type.String({ format: "date-time" }),
});

export const GetUserByIdResponseSchema = {
  200: Type.Object({
    success: Type.Boolean(),
    user: UserSchema,
  }),
  404: BaseResponseSchema,
};

export const GetAllUsersResponseSchema = {
  200: Type.Object({
    success: Type.Boolean(),
    users: Type.Array(UserSchema),
  }),
};

export const CreateUserInputSchema = Type.Object({
  email: EmailSchema,
  password: PasswordSchema,
});

export const CreateUserResponseSchema = {
  201: Type.Object({
    success: Type.Boolean(),
    user: UserSchema,
  }),
  400: BaseResponseSchema,
  409: BaseResponseSchema,
  500: BaseResponseSchema,
};

export const UpdateUserInputSchema = Type.Partial(
  Type.Omit(UserSchema, ["id", "createdAt", "updatedAt"]),
);

export const UpdateUserResponseSchema = {
  200: Type.Object({
    success: Type.Boolean(),
    user: UserSchema,
  }),
  404: BaseResponseSchema,
};

export const DeleteUserResponseSchema = {
  200: BaseResponseSchema,
  404: BaseResponseSchema,
};
