import BaseEntity from "@/core/ddd/entity.base";
import { CreateUserProps } from "./user.types";
import { v4 as uuidv4 } from "uuid";
import { UserModel } from "../database/user.model";

export class UserEntity extends BaseEntity {
  private _props: UserModel;

  private constructor(props: UserModel) {
    super(props);
    this._props = props;
  }

  // ================= FACTORIES =================

  static createNew(props: CreateUserProps): UserEntity {
    if (!props.email) throw new Error("User must have an email");
    if (!props.username) throw new Error("User must have a username");
    if (!props.passwordHash) throw new Error("User must have a passwordHash");

    const now = new Date().toISOString();

    const uuid = uuidv4();

    return new UserEntity({
      id: uuid,
      isEnabled: true,
      isDeleted: false,
      createdBy: uuid,
      createdAt: now,
      updatedBy: uuid,
      updatedAt: now,
      deletedBy: null,
      deletedAt: null,
      email: props.email,
      passwordHash: props.passwordHash,
      username: props.username,
      currencyType: "USD",

      displayName: null,
      bio: null,
      profilePictureUrl: null,
      country: null,
      state: null,
      city: null,
      zipCode: null,
      streetAddress: null,
      timeZone: "Pacific Time (US & Canada)",
      tokenVersion: 1,
    });
  }

  static fromPersistence(props: UserModel): UserEntity {
    return new UserEntity(props);
  }

  // ========== GETTERS ==========
  get email() {
    return this._props.email;
  }
  get passwordHash() {
    return this._props.passwordHash;
  }
  get username() {
    return this._props.username;
  }
  get currencyType() {
    return this._props.currencyType;
  }
  get displayName() {
    return this._props.displayName;
  }
  get bio() {
    return this._props.bio;
  }
  get profilePictureUrl() {
    return this._props.profilePictureUrl;
  }
  get country() {
    return this._props.country;
  }
  get state() {
    return this._props.state;
  }
  get city() {
    return this._props.city;
  }
  get zipCode() {
    return this._props.zipCode;
  }
  get streetAddress() {
    return this._props.streetAddress;
  }
  get timeZone() {
    return this._props.timeZone;
  }
  get tokenVersion() {
    return this._props.tokenVersion;
  }
}
