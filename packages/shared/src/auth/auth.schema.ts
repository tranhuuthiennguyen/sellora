import { EmailSchema, PasswordSchema } from "../validation/format";
import { BaseResponseSchema } from "../lib/common.schema";
import { UserSchema } from "../users/user.schema";
import { Type } from "@sinclair/typebox";

export const LoginInputSchema = Type.Object({
  email: EmailSchema,
  password: PasswordSchema,
});

export const LoginResponseSchema = {
  200: Type.Object({
    success: Type.Boolean(),
    user: UserSchema,
  }),
  401: BaseResponseSchema,
  404: BaseResponseSchema,
};
