import { EmailSchema, PasswordSchema } from "../validation/format.js";
import { BaseResponseSchema } from "../lib/common.schema.js";
import { UserSchema } from "../user/user.schema.js";
import { Type } from "@sinclair/typebox";

export const LoginInputSchema = Type.Object({
  email: EmailSchema,
  password: PasswordSchema,
});

export const LoginResponseSchema = {
  200: Type.Object({
    success: Type.Boolean(),
    accessToken: Type.String(),
    user: UserSchema,
  }),
  401: BaseResponseSchema,
  404: BaseResponseSchema,
};
