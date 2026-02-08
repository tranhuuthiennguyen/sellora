import Type, { Static } from "typebox";
import { passwordSchema } from "../login-user/login-user.schema";

export const changePasswordRequestDtoSchema = Type.Object({
  email: Type.String(),
  oldPassword: passwordSchema,
  newPassword: passwordSchema,
});

export type changePasswordRequestDto = Static<
  typeof changePasswordRequestDtoSchema
>;
