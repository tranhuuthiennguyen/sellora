import { Static } from "@sinclair/typebox";
import { ChangePasswordInputSchema, LoginInputSchema } from "./auth.schema.js";

export type LoginInputDto = Static<typeof LoginInputSchema>;

export type ChangePasswordDto = Static<typeof ChangePasswordInputSchema>;
