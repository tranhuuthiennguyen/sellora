import { BasePersistedProps } from "@/core/ddd/model.base";
import { ProductModel } from "../database/product.model";

export type ProductStatus = "draft" | "published";

export type ProductPersistedProps = Omit<
  ProductModel,
  keyof BasePersistedProps
>;

export type CreateProductProps = Omit<
  ProductPersistedProps,
  "contentUpdatedAt"
>;
