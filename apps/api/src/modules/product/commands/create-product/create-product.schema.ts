import Type, { Static } from "typebox";
import { productSchema } from "../../database/product.model";

export const createProductRequestDtoSchema = Type.Omit(productSchema, [
  "id",
  "isEnabled",
  "isDeleted",
  "createdBy",
  "createdAt",
  "updatedBy",
  "updatedAt",
  "deletedBy",
  "deletedAt",
  "contentUpdatedAt",
]);

export type createProductRequestDto = Static<
  typeof createProductRequestDtoSchema
>;
