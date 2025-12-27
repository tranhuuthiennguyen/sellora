import { Type } from "@sinclair/typebox";
import { UserSchema } from "../entry";

export const ProductSchema = Type.Object({
  id: Type.Number(),
  seller: Type.Omit(UserSchema, [
    "currencyType",
    "timezone",
    "createdAt",
    "updatedAt",
  ]),
  title: Type.String(),
  description: Type.Optional(Type.String()),
  priceCents: Type.Number(),
  published: Type.Boolean(),
  tags: Type.Array(Type.String()),
  category: Type.String(),
  files: Type.Optional(Type.Array(Type.String())),
  createdAt: Type.String({ format: "date-time" }),
  updatedAt: Type.String({ format: "date-time" }),
});

export const GetAllProductsResponseSchema = {
  200: Type.Object({
    success: Type.Boolean(),
    products: Type.Array(ProductSchema),
  }),
};
