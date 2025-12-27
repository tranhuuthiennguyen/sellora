export type TypeSchema = {
  id: string;
  schema: object;
};

export const EmailSchema: TypeSchema = {
  id: "emailSchema",
  schema: {
    type: "string",
    format: "email",
    errorMessage: "must be a valid email address",
  },
};

export const PasswordSchema: TypeSchema = {
  id: "passwordSchema",
  schema: {
    type: "string",
    format: "regex",
    pattern: "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[#?!@$%^&*-])(?=.{8,})",
    errorMessage: {
      pattern:
        "must be minimum of 8 characters, 1 uppercase, lowercase, number and a special character",
    },
  },
};
