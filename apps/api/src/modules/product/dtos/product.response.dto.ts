import Type, { Static } from "typebox";
import { productSchema } from "../database/product.model";

export const productResponseDtoSchema = Type.Omit(productSchema, [
  "deletedBy",
  "deletedAt",
] as const);

export type ProductResponseDto = Static<typeof productResponseDtoSchema>;
