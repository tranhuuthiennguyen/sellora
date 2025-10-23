import { CreateUserBody, GetUserSchema } from "@modules/users/users.schema";
import { Static } from "@fastify/type-provider-typebox";

export type CreateUser = Static<typeof CreateUserBody>;

export type GetUserType = Static<typeof GetUserSchema>;
