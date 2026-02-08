import { CreateUserProps } from "./user.types";
import { v4 as uuidv4 } from "uuid";
import { UserModel } from "../database/user.model";
import { ConflictException } from "@/core/exceptions";
import { compare, hash } from "@/core/utils/password.util";
import { Address, Preferences, UserProfile } from "./value-objects";
import { AggregateRoot } from "@/core/ddd/aggregate-root";
import { UserPasswordChangedEvent } from "./events/user-password-changed.event";

export class UserEntity extends AggregateRoot {
  private _email: string;
  private _passwordHash: string;
  private _username: string;
  private _profile: UserProfile;
  private _address: Address;
  private _preferences: Preferences;
  private _tokenVersion: number;

  private constructor(props: UserModel) {
    super(props);
    this._email = props.email;
    this._passwordHash = props.passwordHash;
    this._username = props.username;
    this._tokenVersion = props.tokenVersion;

    this._profile = new UserProfile(
      props.displayName,
      props.bio,
      props.profilePictureUrl,
    );

    this._address = new Address(
      props.country,
      props.state,
      props.city,
      props.zipCode,
      props.streetAddress,
    );

    this._preferences = new Preferences(props.currencyType, props.timeZone);
  }

  // ========== GETTERS ==========
  get email(): string {
    return this._email;
  }
  get passwordHash(): string {
    return this._passwordHash;
  }
  get username(): string {
    return this._username;
  }
  get currencyType(): string {
    return this._preferences.currencyType;
  }
  get displayName(): string | null {
    return this._profile.displayName;
  }
  get bio(): string | null {
    return this._profile.bio;
  }
  get profilePictureUrl(): string | null {
    return this._profile.profilePictureUrl;
  }
  get country(): string | null {
    return this._address.country;
  }
  get state(): string | null {
    return this._address.state;
  }
  get city(): string | null {
    return this._address.city;
  }
  get zipCode(): string | null {
    return this._address.zipCode;
  }
  get streetAddress(): string | null {
    return this._address.streetAddress;
  }
  get timeZone(): string {
    return this._preferences.timeZone;
  }
  get tokenVersion(): number {
    return this._tokenVersion;
  }

  // ========== METHODS ==========

  async changePassword(newPassword: string): Promise<void> {
    if (!newPassword) {
      throw new Error("New password hash must be provided");
    }
    if (await compare(newPassword, this._passwordHash)) {
      throw new ConflictException(
        "New password must be different from the old password.",
      );
    }

    this._passwordHash = await hash(newPassword);

    this.addDomainEvent(
      new UserPasswordChangedEvent({
        userId: this.id,
        changedAt: new Date(),
      }),
    );

    this.touch(this._id);
  }

  updateProfile(
    input: {
      displayName?: string | null;
      bio?: string | null;
      profilePictureUrl?: string | null;
    },
    userId: string,
  ): boolean {
    const newProfile = new UserProfile(
      input.displayName !== undefined
        ? input.displayName
        : this._profile.displayName,
      input.bio !== undefined ? input.bio : this._profile.bio,
      input.profilePictureUrl !== undefined
        ? input.profilePictureUrl
        : this._profile.profilePictureUrl,
    );

    if (this._profile.equals(newProfile)) {
      return false;
    }

    this._profile = newProfile;

    // TODO: addDomainEvent

    this.touch(userId);
    return true;
  }

  updateAddress(
    input: {
      country?: string | null;
      state?: string | null;
      city?: string | null;
      zipCode?: string | null;
      streetAddress?: string | null;
    },
    userId: string,
  ): boolean {
    const newAddress = new Address(
      input.country !== undefined ? input.country : this._address.country,
      input.state !== undefined ? input.state : this._address.state,
      input.city !== undefined ? input.city : this._address.city,
      input.zipCode !== undefined ? input.zipCode : this._address.zipCode,
      input.streetAddress !== undefined
        ? input.streetAddress
        : this._address.streetAddress,
    );

    if (this._address.equals(newAddress)) {
      return false;
    }

    this._address = newAddress;

    // TODO: addDomainEvent

    this.touch(userId);
    return true;
  }

  updatePreferences(
    input: {
      currencyType?: string;
      timeZone?: string;
    },
    userId: string,
  ): boolean {
    const newPreferences = new Preferences(
      input.currencyType !== undefined
        ? input.currencyType
        : this._preferences.currencyType,
      input.timeZone !== undefined
        ? input.timeZone
        : this._preferences.timeZone,
    );

    if (this._preferences.equals(newPreferences)) {
      return false;
    }

    this._preferences = newPreferences;

    // TODO: addDomainEvent

    this.touch(userId);
    return true;
  }

  // ================= FACTORIES =================

  static async createNew(
    props: CreateUserProps,
    hassedPassword: string,
  ): Promise<UserEntity> {
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
      passwordHash: hassedPassword,
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
      tokenVersion: 0,
    });
  }

  static fromPersistence(props: UserModel): UserEntity {
    return new UserEntity(props);
  }
}
