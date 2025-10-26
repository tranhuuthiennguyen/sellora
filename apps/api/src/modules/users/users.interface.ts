import {
  CreateUserBody,
  UpdateUserBody,
  UserSchema,
} from "@modules/users/users.schema";
import { Static } from "@fastify/type-provider-typebox";

export type CreateUser = Static<typeof CreateUserBody>;

export type UpdateUser = Static<typeof UpdateUserBody>;

export type UserType = Static<typeof UserSchema>;
