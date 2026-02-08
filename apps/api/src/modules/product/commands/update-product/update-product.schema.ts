import Type, { Static } from "typebox";
import { productSchema } from "../../database/product.model";

export const updateProductRequestDtoSchema = Type.Omit(
  Type.Partial(productSchema),
  [
    "id",
    "sellerId",
    "createdAt",
    "updatedAt",
    "createdBy",
    "updatedBy",
    "deletedAt",
    "deletedBy",
    "contentUpdatedAt",
    "isDeleted",
    "isEnabled",
  ],
);

export type updateProductRequestDto = Static<
  typeof updateProductRequestDtoSchema
>;
