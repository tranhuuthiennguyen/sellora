import { Static } from "@sinclair/typebox";
import { CreateUserInputSchema, UpdateUserInputSchema } from "./user.schema.js";

export type CreateUserDto = Static<typeof CreateUserInputSchema>;

export type UpdateUserDto = Static<typeof UpdateUserInputSchema>;
