import { Static } from "@sinclair/typebox";
import { UserSchema } from "./user.schema.js";

export type UserEntity = Static<typeof UserSchema>;
