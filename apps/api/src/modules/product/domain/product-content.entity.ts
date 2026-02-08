import BaseEntity from "@/core/ddd/entity.base";
import { ProductContentModel } from "../database/product-content.model";
import { ContentType } from "./product.types";
import { v4 as uuidv4 } from "uuid";

export default class ProductContentEntity extends BaseEntity {
  private readonly _productId: string;
  private readonly _title: string;
  private readonly _contentType: ContentType;
  private readonly _description: string | null;
  private readonly _position: number;

  private constructor(props: ProductContentModel) {
    super(props);
    this._productId = props.productId;
    this._title = props.title;
    this._contentType = props.contentType;
    this._description = props.description;
    this._position = props.position;
  }

  // ============= GETTERS =============
  get productId(): string {
    return this._productId;
  }

  get title(): string {
    return this._title;
  }

  get contentType(): ContentType {
    return this._contentType;
  }

  get description(): string | null {
    return this._description;
  }

  get position(): number {
    return this._position;
  }

  // ============ METHODS ============

  // ============ FACTORIES ===========
  static createNew(
    props: {
      productId: string;
      contentType: ContentType;
      title: string;
      description: string;
      position: number;
    },
    userId: string,
  ): ProductContentEntity {
    const uuid = uuidv4();
    const now = new Date().toISOString();

    return new ProductContentEntity({
      id: uuid,
      isEnabled: true,
      isDeleted: false,
      createdBy: userId,
      createdAt: now,
      updatedBy: userId,
      updatedAt: now,
      deletedBy: null,
      deletedAt: null,
      productId: props.productId,
      contentType: props.contentType,
      title: props.title,
      description: props.description,
      position: props.position,
    });
  }

  static fromPersistence(props: ProductContentModel): ProductContentEntity {
    return new ProductContentEntity(props);
  }
}
