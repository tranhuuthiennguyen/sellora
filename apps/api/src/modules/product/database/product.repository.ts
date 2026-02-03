import SqlRepositoryBase from "@/core/db/sql-repository.base";
import { ProductEntity } from "../domain/product.entity";
import { ProductRepositoryPort } from "./product.repository.port";
import { DatabaseErrorException } from "@/core/exceptions";
import { ProductModel } from "./product.model";

class ProductRepository
  extends SqlRepositoryBase<ProductEntity, ProductModel>
  implements ProductRepositoryPort
{
  constructor({ db, productMapper, logger }) {
    super(db, "products", productMapper, logger);
  }

  async softDeleteOne(entity: ProductEntity): Promise<boolean> {
    try {
      const result = await this.db`
        UPDATE ${this.db(this.tableName)}
        SET
          is_deleted = ${entity.isDeleted},
          deleted_at = ${entity.deletedAt},
          deleted_by = ${entity.deletedBy}
        WHERE id = ${entity.id}
        RETURNING *
      `;
      return result.length > 0;
    } catch (error: any) {
      throw new DatabaseErrorException("Unknown database error", error);
    }
  }

  async updateOne(entity: ProductEntity) {
    try {
      const rows = await this.db`
        UPDATE ${this.db(this.tableName)}
        SET
          title = ${entity.title},
          description = ${entity.description},
          price_cents = ${entity.priceCents},
          status = ${entity.status},
          updated_at = ${entity.updatedAt},
          updated_by = ${entity.updatedBy},
          content_updated_at = ${entity.contentUpdatedAt}
        WHERE id = ${entity.id}
        RETURNING *
      `;
      return this.mapper.toDomain(rows[0]);
    } catch (error: any) {
      throw new DatabaseErrorException("Unknown database error", error);
    }
  }
}

export default ProductRepository;
