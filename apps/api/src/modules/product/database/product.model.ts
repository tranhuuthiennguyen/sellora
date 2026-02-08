import { baseSchema } from "@/core/ddd/model.base";
import Type, { Static } from "typebox";

export const productSchema = Type.Intersect([
  baseSchema,
  Type.Object({
    sellerId: Type.String(),
    title: Type.String({
      minLength: 1,
    }),
    description: Type.Union([Type.String(), Type.Null()]),
    priceCents: Type.Integer({
      minimum: 0,
    }),
    status: Type.Enum(["draft", "published"]),
    contentUpdatedAt: Type.String({ format: "date-time" }),
  }),
]);

export type ProductModel = Static<typeof productSchema>;
