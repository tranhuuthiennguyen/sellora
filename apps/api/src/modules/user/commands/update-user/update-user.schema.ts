import Type, { Static } from "typebox";
import { userSchema } from "../../database/user.repository";

export const updateUserRequestDtoSchema = Type.Partial(
  Type.Omit(userSchema, [
    "id",
    "passwordHash",
    "createdAt",
    "updatedAt",
    "tokenVersion",
  ]),
);

export type updateUserRequestDto = Static<typeof updateUserRequestDtoSchema>;
