import {
  CreateProductProps,
  ProductPersistedProps,
  ProductStatus,
} from "./product.types";
import { ProductModel } from "../database/product.model";
import { v4 as uuidv4 } from "uuid";
import { ArgumentInvalidException } from "@/core/exceptions";
import { AggregateRoot } from "@/core/ddd/aggregate-root";

export default class ProductEntity extends AggregateRoot {
  private _props: ProductPersistedProps;

  private constructor(props: ProductModel) {
    super(props);
    this._props = {
      sellerId: props.sellerId,
      title: props.title,
      description: props.description,
      priceCents: props.priceCents,
      status: props.status,
      contentUpdatedAt: props.contentUpdatedAt,
    };
  }

  // ================= FACTORIES =================

  static createNew(props: CreateProductProps): ProductEntity {
    if (!props.sellerId)
      throw new ArgumentInvalidException("Product must have a seller ID");
    if (!props.title)
      throw new ArgumentInvalidException("Product must have a title");

    const now = new Date().toISOString();
    const uuid = uuidv4();

    return new ProductEntity({
      id: uuid,
      isEnabled: true,
      isDeleted: false,
      createdBy: uuid,
      createdAt: now,
      updatedBy: uuid,
      updatedAt: now,
      deletedBy: null,
      deletedAt: null,
      sellerId: props.sellerId,
      title: props.title,
      description: props.description,
      priceCents: props.priceCents,
      status: props.status,
      contentUpdatedAt: now,
    });
  }

  static fromPersistence(props: ProductModel): ProductEntity {
    return new ProductEntity(props);
  }

  // ============== BEHAVIORS ==============

  updateDetails(
    input: {
      title?: string;
      description?: string | null;
      priceCents?: number;
      status?: ProductStatus;
    },
    userId: string,
  ) {
    let changed = false;

    if (input.title !== undefined && input.title !== this._props.title) {
      if (!input.title)
        throw new ArgumentInvalidException("Title cannot be empty");
      this._props.title = input.title;
      changed = true;
    }

    if (
      input.description !== undefined &&
      input.description !== this._props.description
    ) {
      if (!input.description)
        throw new ArgumentInvalidException("description cannot be empty");
      this._props.description = input.description;
      changed = true;
    }

    if (
      input.priceCents !== undefined &&
      input.priceCents !== this._props.priceCents
    ) {
      if (input.priceCents < 0)
        throw new ArgumentInvalidException("Price cannot be negative");
      this._props.priceCents = input.priceCents;
      changed = true;
    }

    if (input.status !== undefined && input.status !== this._props.status) {
      if (!input.status)
        throw new ArgumentInvalidException("product status cannot be empty");
      this._props.status = input.status;
      changed = true;
    }

    if (changed) {
      this.touch(userId);
    }

    return changed;
  }

  markContentUpdated(userId: string) {
    const now = new Date().toISOString();
    this._props.contentUpdatedAt = now;
    this.touch(userId);
  }

  // ========== GETTERS ==========
  get sellerId() {
    return this._props.sellerId;
  }

  get title() {
    return this._props.title;
  }

  get description() {
    return this._props.description;
  }

  get priceCents() {
    return this._props.priceCents;
  }

  get status() {
    return this._props.status;
  }

  get contentUpdatedAt() {
    return this._props.contentUpdatedAt;
  }
}
