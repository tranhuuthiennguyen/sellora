import { baseSchema } from "@/core/ddd/model.base";
import Type, { Static } from "typebox";

export const userSchema = Type.Intersect([
  baseSchema,
  Type.Object({
    email: Type.String({
      format: "email",
      description: "must be in email format",
    }),
    passwordHash: Type.String(),
    username: Type.String({
      minLength: 1,
    }),
    displayName: Type.Union([Type.String(), Type.Null()]),
    bio: Type.Union([Type.String({ maxLength: 500 }), Type.Null()]),
    currencyType: Type.String(),
    profilePictureUrl: Type.Union([Type.String(), Type.Null()]),
    country: Type.Union([Type.String(), Type.Null()]),
    state: Type.Union([Type.String(), Type.Null()]),
    city: Type.Union([Type.String(), Type.Null()]),
    zipCode: Type.Union([Type.String(), Type.Null()]),
    streetAddress: Type.Union([Type.String(), Type.Null()]),
    timeZone: Type.String(),
    tokenVersion: Type.Integer(),
  }),
]);

export type UserModel = Static<typeof userSchema>;
