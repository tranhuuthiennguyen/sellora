abstract class BaseEntity {
  protected readonly _id: string;
  protected _createdAt: string;
  protected _updatedAt: string;

  constructor(props: { id: string; createdAt: string; updatedAt: string }) {
    this._id = props.id;
    this._createdAt = props.createdAt;
    this._updatedAt = props.updatedAt;
  }

  // ========== GETTERS ==========
  get id() {
    return this._id;
  }

  get createdAt() {
    return this._createdAt;
  }

  get updatedAt() {
    return this._updatedAt;
  }
}

export default BaseEntity;
