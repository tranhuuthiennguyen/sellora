import { Type, Static } from "typebox";
import { passwordSchema } from "../login-user/login-user.schema";

export const registerUserRequestDtoSchema = Type.Object({
  password: passwordSchema,
  email: Type.String({
    format: "email",
    errorMessage: "must be a valid",
  }),
});

export type registerUserRequestDto = Static<
  typeof registerUserRequestDtoSchema
>;
