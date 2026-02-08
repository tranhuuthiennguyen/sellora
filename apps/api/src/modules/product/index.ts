import { ActionCreatorFactory } from "@/core/cqrs/action-creator";
import { ProductRepositoryPort } from "./database/product.repository.port";
import ProductMapper from "./product.mapper";

declare global {
  export interface Dependencies {
    productMapper: ProductMapper;
    productRepository: ProductRepositoryPort;
  }
}

export const productActionCreator = new ActionCreatorFactory("product");
