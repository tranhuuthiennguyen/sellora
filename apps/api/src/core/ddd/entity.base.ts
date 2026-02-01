import { BasePersistedProps } from "./model.base";

/**
 * RULES:
 * - all properties should not be undefine
 * - instead treating them as nullable
 * - undefine values from repository or to API are all handled by mappers
 */
abstract class BaseEntity {
  protected readonly _id: string;
  protected _isEnabled: boolean;
  protected _isDeleted: boolean;
  protected _createdBy: string;
  protected _createdAt: string;
  protected _updatedBy: string;
  protected _updatedAt: string;
  protected _deletedBy: string | null;
  protected _deletedAt: string | null;

  constructor(props: BasePersistedProps) {
    this._id = props.id;
    this._isEnabled = props.isEnabled;
    this._isDeleted = props.isDeleted;
    this._createdBy = props.createdBy;
    this._createdAt = props.createdAt;
    this._updatedBy = props.updatedBy;
    this._updatedAt = props.updatedAt;
    this._deletedBy = props.deletedBy ?? null;
    this._deletedAt = props.deletedAt ?? null;
  }

  // ========== GETTERS ==========
  get id() {
    return this._id;
  }

  get isEnabled() {
    return this._isEnabled;
  }

  get isDeleted() {
    return this._isDeleted;
  }

  get createBy() {
    return this._createdBy;
  }

  get createdAt() {
    return this._createdAt;
  }

  get updatedBy() {
    return this._updatedBy;
  }

  get updatedAt() {
    return this._updatedAt;
  }

  get deletedBy() {
    return this._deletedBy;
  }

  get deletedAt() {
    return this._deletedAt;
  }
}

export default BaseEntity;
