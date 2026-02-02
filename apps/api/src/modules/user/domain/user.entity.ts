import BaseEntity from "@/core/ddd/entity.base";
import { CreateUserProps, UserPersistedProps } from "./user.types";
import { v4 as uuidv4 } from "uuid";
import { UserModel } from "../database/user.model";
import { ArgumentInvalidException, ConflictException } from "@/core/exceptions";
import * as bcrypt from "bcrypt";
import { updateUserRequestDto } from "../commands/update-user/update-user.schema";

export class UserEntity extends BaseEntity {
  private _props: UserPersistedProps;

  private constructor(props: UserModel) {
    super(props);
    this._props = {
      email: props.email,
      passwordHash: props.passwordHash,
      username: props.username,
      currencyType: props.currencyType,
      displayName: props.displayName,
      bio: props.bio,
      profilePictureUrl: props.profilePictureUrl,
      country: props.country,
      state: props.state,
      city: props.city,
      zipCode: props.zipCode,
      streetAddress: props.streetAddress,
      timeZone: props.timeZone,
      tokenVersion: props.tokenVersion,
    };
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

  // ========== METHODS ==========
  hash(value: string, saltRounds = 10): Promise<string> {
    return new Promise((resolve, reject) => {
      bcrypt.genSalt(saltRounds, (err, salt) => {
        if (err) return reject(err);
        bcrypt.hash(value, salt, (err, hash) => {
          if (err) return reject(err);
          resolve(hash);
        });
      });
    });
  }

  comparePassword(password: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      bcrypt.compare(password, this._props.passwordHash, (err, result) => {
        if (err) return reject(err);
        resolve(result);
      });
    });
  }

  async changePassword(newPassword: string): Promise<void> {
    if (!newPassword) {
      throw new Error("New password hash must be provided");
    }
    if (await this.comparePassword(newPassword)) {
      throw new ConflictException(
        "New password must be different from the old password.",
      );
    }
    this._props.passwordHash = await this.hash(newPassword);
  }

  updateDetails(input: updateUserRequestDto) {
    let changed = false;

    if (
      input.username !== undefined &&
      input.username !== this._props.username
    ) {
      if (!input.username)
        throw new ArgumentInvalidException("username cannot be empty");
      this._props.username = input.username;
      changed = true;
    }

    if (
      input.displayName !== undefined &&
      input.displayName !== this._props.displayName
    ) {
      if (!input.displayName)
        throw new ArgumentInvalidException("display name cannot be empty");
      this._props.displayName = input.displayName;
      changed = true;
    }

    if (input.bio !== undefined && input.bio !== this._props.bio) {
      if (!input.bio) throw new ArgumentInvalidException("bio cannot be empty");
      this._props.bio = input.bio;
      changed = true;
    }

    if (
      input.currencyType !== undefined &&
      input.currencyType !== this._props.currencyType
    ) {
      if (!input.currencyType)
        throw new ArgumentInvalidException("currency type cannot be empty");
      this._props.currencyType = input.currencyType;
      changed = true;
    }

    if (
      input.profilePictureUrl !== undefined &&
      input.profilePictureUrl !== this._props.profilePictureUrl
    ) {
      if (!input.profilePictureUrl)
        throw new ArgumentInvalidException(
          "profile picture url cannot be empty",
        );
      this._props.profilePictureUrl = input.profilePictureUrl;
      changed = true;
    }

    if (input.country !== undefined && input.country !== this._props.country) {
      if (!input.country)
        throw new ArgumentInvalidException("country cannot be empty");
      this._props.country = input.country;
      changed = true;
    }

    if (input.state !== undefined && input.state !== this._props.state) {
      if (!input.state)
        throw new ArgumentInvalidException("state cannot be empty");
      this._props.state = input.state;
      changed = true;
    }

    if (input.city !== undefined && input.city !== this._props.city) {
      if (!input.city)
        throw new ArgumentInvalidException("city cannot be empty");
      this._props.city = input.city;
      changed = true;
    }

    if (input.zipCode !== undefined && input.zipCode !== this._props.zipCode) {
      if (!input.zipCode)
        throw new ArgumentInvalidException("zip code cannot be empty");
      this._props.zipCode = input.zipCode;
      changed = true;
    }

    if (
      input.streetAddress !== undefined &&
      input.streetAddress !== this._props.streetAddress
    ) {
      if (!input.streetAddress)
        throw new ArgumentInvalidException("street address cannot be empty");
      this._props.streetAddress = input.streetAddress;
      changed = true;
    }

    if (
      input.timeZone !== undefined &&
      input.timeZone !== this._props.timeZone
    ) {
      if (!input.timeZone)
        throw new ArgumentInvalidException("time zone cannot be empty");
      this._props.timeZone = input.timeZone;
      changed = true;
    }

    if (changed) {
      this.touch();
    }
  }

  private touch() {
    this._updatedAt = new Date().toISOString();
    this._updatedBy = this.id;
  }

  // ================= FACTORIES =================

  static async createNew(props: CreateUserProps): Promise<UserEntity> {
    if (!props.email) throw new Error("User must have an email");
    if (!props.username) throw new Error("User must have a username");
    if (!props.password) throw new Error("User must have a password");

    const now = new Date().toISOString();
    const uuid = uuidv4();
    const hashed = await new UserEntity({} as UserModel).hash(props.password);

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
      passwordHash: hashed,
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
}
