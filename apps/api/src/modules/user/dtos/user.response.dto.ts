import Type, { Static } from "typebox";
import { userSchema } from "../database/user.model";

export const userResponseDtoSchema = Type.Omit(userSchema, [
  "passwordHash",
  "tokenVersion",
  "deletedBy",
  "deletedAt",
] as const);

export type UserResponseDto = Static<typeof userResponseDtoSchema>;
