import { Mapper } from "@/core/ddd/mapper.interface";
import { ProductEntity } from "./domain/product.entity";
import { ProductResponseDto } from "./dtos/product.response.dto";
import { ajv } from "@/core/utils/validator.util";
import { ArgumentInvalidException } from "@/core/exceptions";
import { ProductModel, productSchema } from "./database/product.model";

class ProductMapper implements Mapper<
  ProductEntity,
  ProductModel,
  ProductResponseDto
> {
  toPersistence(entity: ProductEntity): ProductModel {
    const validator = ajv.compile(productSchema);
    const record: ProductModel = {
      id: entity.id,
      isEnabled: entity.isEnabled,
      isDeleted: entity.isDeleted,
      createdBy: entity.createdBy,
      updatedBy: entity.updatedBy,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
      deletedAt: entity.deletedAt,
      deletedBy: entity.deletedBy,
      description: entity.description,
      sellerId: entity.sellerId,
      title: entity.title,
      priceCents: entity.priceCents,
      status: entity.status,
      contentUpdatedAt: entity.contentUpdatedAt,
    };

    const validate = validator(record);
    if (!validate) {
      throw new ArgumentInvalidException(
        JSON.stringify(validator.errors),
        new Error("Mapper Validation error"),
        record,
      );
    }

    return record;
  }

  toDomain(record: ProductModel): ProductEntity {
    return ProductEntity.fromPersistence({
      id: record.id,
      isEnabled: record.isEnabled,
      isDeleted: record.isDeleted,
      createdBy: record.createdBy,
      updatedBy: record.updatedBy,
      deletedAt: record.deletedAt,
      deletedBy: record.deletedBy,
      createdAt: record.createdAt,
      updatedAt: record.updatedAt,
      sellerId: record.sellerId,
      title: record.title,
      description: record.description,
      priceCents: record.priceCents,
      status: record.status,
      contentUpdatedAt: record.contentUpdatedAt,
    });
  }

  toResponse(entity: ProductEntity): ProductResponseDto {
    return {
      id: entity.id,
      isEnabled: entity.isEnabled,
      isDeleted: entity.isDeleted,
      createdBy: entity.createdBy,
      createdAt: entity.createdAt,
      updatedBy: entity.updatedBy,
      updatedAt: entity.updatedAt,
      sellerId: entity.sellerId,
      title: entity.title,
      description: entity.description,
      priceCents: entity.priceCents,
      status: entity.status,
      contentUpdatedAt: entity.contentUpdatedAt,
    };
  }
}

export default ProductMapper;
