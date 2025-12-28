export interface UserProps {
  id: string;
  email: string;
  passwordHash: string;
  username: string;
  currencyType: string;

  displayName?: string | null;
  bio?: string | null;
  profilePictureUrl?: string | null;
  country?: string | null;
  state?: string | null;
  city?: string | null;
  zipCode?: string | null;
  streetAddress?: string | null;

  createdAt?: string;
  updatedAt?: string;
}

export class UserEntity {
  private readonly _id: string;
  private _email: string;
  private _passwordHash: string;
  private _username: string;
  private _currencyType: string;

  private _displayName?: string | null;
  private _bio?: string | null;
  private _profilePictureUrl?: string | null;
  private _country?: string | null;
  private _state?: string | null;
  private _city?: string | null;
  private _zipCode?: string | null;
  private _streetAddress?: string | null;

  private _createdAt: string;
  private _updatedAt: string;

  constructor(props: UserProps) {
    // Required validations (domain invariants)
    // if (!props.id) throw new Error('User must have an id')
    // if (!props.email) throw new Error('User must have an email')
    // if (!props.passwordHash) throw new Error('User must have a password hash')
    // if (!props.username) throw new Error('User must have a username')
    // if (!props.currencyType) throw new Error('User must have a currencyType')

    this._id = props.id;
    this._email = props.email;
    this._passwordHash = props.passwordHash;
    this._username = props.username;
    this._currencyType = props.currencyType;

    this._displayName = props.displayName ?? null;
    this._bio = props.bio ?? null;
    this._profilePictureUrl = props.profilePictureUrl ?? null;
    this._country = props.country ?? null;
    this._state = props.state ?? null;
    this._city = props.city ?? null;
    this._zipCode = props.zipCode ?? null;
    this._streetAddress = props.streetAddress ?? null;

    this._createdAt = props.createdAt ?? new Date().toString();
    this._updatedAt = props.updatedAt ?? new Date().toString();
  }

  // ========== GETTERS ==========
  get id() {
    return this._id;
  }
  get email() {
    return this._email;
  }
  get passwordHash() {
    return this._passwordHash;
  }
  get username() {
    return this._username;
  }
  get currencyType() {
    return this._currencyType;
  }

  get displayName() {
    return this._displayName;
  }
  get bio() {
    return this._bio;
  }
  get profilePictureUrl() {
    return this._profilePictureUrl;
  }
  get country() {
    return this._country;
  }
  get state() {
    return this._state;
  }
  get city() {
    return this._city;
  }
  get zipCode() {
    return this._zipCode;
  }
  get streetAddress() {
    return this._streetAddress;
  }

  get createdAt() {
    return this._createdAt;
  }
  get updatedAt() {
    return this._updatedAt;
  }

  toObject(): UserProps {
    return {
      id: this._id,
      email: this._email,
      passwordHash: this._passwordHash,
      username: this._username,
      currencyType: this._currencyType,
      displayName: this._displayName,
      bio: this._bio,
      profilePictureUrl: this._profilePictureUrl,
      country: this._country,
      state: this._state,
      city: this._city,
      zipCode: this._zipCode,
      streetAddress: this._streetAddress,
      createdAt: this._createdAt,
      updatedAt: this._updatedAt,
    };
  }
}
