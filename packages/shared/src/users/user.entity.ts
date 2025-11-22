import { Static } from "@sinclair/typebox";
import { UserSchema } from "./user.schema";

export type UserEntity = Static<typeof UserSchema>;
