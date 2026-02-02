import { RepositoryPort } from "@/core/db/repository.port";
import { ProductEntity } from "../domain/product.entity";

export interface ProductRepositoryPort extends RepositoryPort<ProductEntity> {
  updateOne: (entity: ProductEntity) => Promise<ProductEntity>;
  softDeleteOne: (entity: ProductEntity) => Promise<boolean>;
}
