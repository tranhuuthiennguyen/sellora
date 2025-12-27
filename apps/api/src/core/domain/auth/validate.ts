export const LoginSchema = {
  body: {
    type: "object",
    required: ["email", "password"],
    properties: {
      email: { $ref: "emailSchema" },
      password: { $ref: "passwordSchema" },
    },
  },
  response: {
    200: {
      type: "object",
      required: ["success"],
      properties: {
        success: {
          type: "boolean",
        },
        message: {
          type: "string",
        },
      },
    },
  },
};
