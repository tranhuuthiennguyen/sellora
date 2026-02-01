import { ProductModel } from "../database/product.model";

export type ProductStatus = "draft" | "published";

export type CreateProductProps = Pick<
  ProductModel,
  "sellerId" | "title" | "description" | "priceCents" | "status"
>;
