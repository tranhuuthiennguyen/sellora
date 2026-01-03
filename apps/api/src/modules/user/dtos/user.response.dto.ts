import Type, { Static } from "typebox";
import { baseResponseDtoSchema } from "@/core/api/response.base";

export const userResponseDtoSchema = Type.Intersect([
  baseResponseDtoSchema,
  Type.Object({
    email: Type.String({
      format: "email",
      description: "must be in email format",
    }),
    username: Type.String({
      example: "deeznut69",
      description: "User's username",
    }),
    displayName: Type.Optional(
      Type.String({
        example: "Deez Nut",
        description: "User's display name",
      }),
    ),
    bio: Type.Optional(
      Type.String({
        example: "Ligma balls",
        bio: "User's delulu text",
      }),
    ),
    currencyType: Type.String(),
    profilePictureUrl: Type.Optional(Type.String()),
    country: Type.Optional(Type.String()),
    state: Type.Optional(Type.String()),
    city: Type.Optional(Type.String()),
    zipCode: Type.Optional(Type.String()),
    streetAddress: Type.Optional(Type.String()),
    timeZone: Type.String(),
  }),
]);

export type UserResponseDto = Static<typeof userResponseDtoSchema>;
