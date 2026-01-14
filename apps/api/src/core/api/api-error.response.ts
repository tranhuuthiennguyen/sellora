import { Type, Static } from "typebox";

export const apiErrorResponseSchema = Type.Object(
  {
    status: Type.String(),
    statusCode: Type.Integer(),
    message: Type.String(),
    error: Type.String(),
    correlationId: Type.String(),
    subErrors: Type.Optional(
      Type.String({
        description: "Optional list of sub-errors",
      }),
    ),
  },
  { $id: "ApiErrorResponse" },
);

export type ApiErrorResponse = Static<typeof apiErrorResponseSchema>;
