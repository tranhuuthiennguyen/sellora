import Type, { Static } from "typebox";
import { userSchema } from "../../database/user.model";

export const updateUserRequestDtoSchema = Type.Partial(
  Type.Omit(userSchema, [
    "id",
    "isEnabled",
    "isDeleted",
    "createdBy",
    "createdAt",
    "updatedBy",
    "updatedAt",
    "deletedBy",
    "deletedAt",
    "passwordHash",
    "tokenVersion",
  ]),
);

export type updateUserRequestDto = Static<typeof updateUserRequestDtoSchema>;
