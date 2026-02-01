import Type, { Static } from "typebox";

export const createProductRequestDtoSchema = Type.Object({
  sellerId: Type.String(),
  title: Type.String(),
  description: Type.Optional(Type.String()),
  priceCents: Type.Integer({
    default: 0,
  }),
  status: Type.Enum(["draft", "published"]),
});

export type createProductRequestDto = Static<
  typeof createProductRequestDtoSchema
>;
