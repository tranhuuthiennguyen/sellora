import BaseEntity from "@/core/ddd/entity.base";
import { CreateProductProps } from "./product.types";
import { ProductModel } from "../database/product.model";
import { v4 as uuidv4 } from "uuid";

export class ProductEntity extends BaseEntity {
  private _props: ProductModel;

  private constructor(props: ProductModel) {
    super(props);
    this._props = props;
  }

  // ================= FACTORIES =================

  static createNew(props: CreateProductProps): ProductEntity {
    if (!props.sellerId) throw new Error("Product must have a seller ID");
    if (!props.title) throw new Error("Product must have a title");

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
      description: props.description ?? null,
      priceCents: props.priceCents,
      status: props.status,
      contentUpdatedAt: now,
    });
  }

  static fromPersistence(props: ProductModel): ProductEntity {
    return new ProductEntity(props);
  }

  // ============== BEHAVIORS ==============

  updateDetails(input: {
    title?: string;
    description?: string | null;
    priceCents?: number;
  }) {
    let changed = false;

    if (input.title !== undefined && input.title !== this._props.title) {
      if (!input.title) throw new Error("Title cannot be empty");
      this._props.title = input.title;
      changed = true;
    }

    if (
      input.description !== undefined &&
      input.description !== this._props.description
    ) {
      this._props.description = input.description;
      changed = true;
    }

    if (
      input.priceCents !== undefined &&
      input.priceCents !== this._props.priceCents
    ) {
      if (input.priceCents < 0) throw new Error("Price cannot be negative");
      this._props.priceCents = input.priceCents;
      changed = true;
    }

    if (changed) {
      this.touch();
    }
  }

  publish() {
    if (this._props.status === "published") return;
    this._props.status = "published";
    this.touch();
  }

  unpublish() {
    if (this._props.status === "draft") return;
    this._props.status = "draft";
    this.touch();
  }

  markContentUpdated() {
    const now = new Date().toISOString();
    this._props.contentUpdatedAt = now;
    this.touch();
  }

  private touch() {
    this._updatedAt = new Date().toISOString();
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
