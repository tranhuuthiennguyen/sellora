import Type, { Static } from "typebox";

export const passwordSchema = Type.String({
  format: "regex",
  minLength: 1,
  pattern: "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[#?!@$%^&*-])(?=.{8,})",
  errorMessage:
    "must be minimum of 8 characters, 1 uppercase, lowercase, number and a special character",
});

export const loginUserRequestDtoSchema = Type.Object({
  password: passwordSchema,
  email: Type.String({
    format: "email",
    errorMessage: "must be a valid",
  }),
});

export type LoginUserRequestDto = Static<typeof loginUserRequestDtoSchema>;
