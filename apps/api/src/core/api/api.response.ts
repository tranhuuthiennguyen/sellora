import { Type, Static, TProperties } from "typebox";

export const apiResponseSchema = <Properties extends TProperties>(
  properties: Properties,
) =>
  Type.Object(
    {
      status: Type.String(),
      statusCode: Type.Integer(),
      message: Type.String(),
      correlationId: Type.String(),
      data: Type.Optional(Type.Object({ ...properties })),
    },
    { additionalProperties: false },
  );

export type ApiResponse = Static<typeof apiResponseSchema>;
