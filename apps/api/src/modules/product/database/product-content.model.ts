import { baseSchema } from "@/core/ddd/model.base";
import Type, { Static } from "typebox";

export const productContentSchema = Type.Intersect([
  baseSchema,
  Type.Object({
    productId: Type.String(),
    contentType: Type.Enum(["file", "rich_text"]),
    title: Type.String({
      minLength: 1,
    }),
    description: Type.Union([Type.String(), Type.Null()]),
    position: Type.Integer(),
  }),
]);

export type ProductContentModel = Static<typeof productContentSchema>;
