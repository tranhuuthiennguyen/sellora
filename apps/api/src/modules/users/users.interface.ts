import { CreateUserBody } from "@modules/users/users.schema";
import { Static } from "@fastify/type-provider-typebox";

export type CreateUser = Static<typeof CreateUserBody>;

export interface GetUser {
  username: string;
  email: string;
}
