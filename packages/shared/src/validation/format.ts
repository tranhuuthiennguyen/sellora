import { Type } from "@sinclair/typebox";
import {
  DefaultErrorFunction,
  SetErrorFunction,
} from "@sinclair/typebox/errors";

const Email = /^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/i;

export function IsEmail(value: string): boolean {
  return Email.test(value);
}

export const EmailSchema = Type.String({
  format: "email",
  minLength: 1,
  errorMessage: {
    minLength: "Email cannot be empty",
    format: "Invalid email format",
  },
});

export const PasswordSchema = Type.String({
  format: "regex",
  minLength: 1,
  pattern: "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[#?!@$%^&*-])(?=.{8,})",
  errorMessage: {
    pattern:
      "password must minimum of 8 characters, 1 uppercase, lowercase, number and a special character",
  },
});

SetErrorFunction((parameter) => {
  return "errorMessage" in parameter.schema
    ? parameter.schema.errorMessage
    : DefaultErrorFunction(parameter);
});
