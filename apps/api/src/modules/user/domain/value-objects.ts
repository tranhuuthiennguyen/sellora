import { ArgumentInvalidException } from "@/core/exceptions";

export class UserProfile {
  constructor(
    public readonly displayName: string | null,
    public readonly bio: string | null,
    public readonly profilePictureUrl: string | null,
  ) {
    if (displayName !== null && !displayName.trim()) {
      throw new ArgumentInvalidException("Display name cannot be empty string");
    }

    if (bio !== null && bio.length > 500) {
      throw new ArgumentInvalidException("Bio cannot exceed 500 characters");
    }
  }

  equals(other: UserProfile): boolean {
    return (
      this.displayName === other.displayName &&
      this.bio === other.bio &&
      this.profilePictureUrl === other.profilePictureUrl
    );
  }

  static createDefault(): UserProfile {
    return new UserProfile(null, null, null);
  }
}

export class Address {
  constructor(
    public readonly country: string | null,
    public readonly state: string | null,
    public readonly city: string | null,
    public readonly zipCode: string | null,
    public readonly streetAddress: string | null,
  ) {}

  equals(other: Address): boolean {
    return (
      this.country === other.country &&
      this.state === other.state &&
      this.city === other.city &&
      this.zipCode === other.zipCode &&
      this.streetAddress === other.streetAddress
    );
  }

  static createDefault(): Address {
    return new Address(null, null, null, null, null);
  }

  isEmpty(): boolean {
    return (
      !this.country &&
      !this.state &&
      !this.city &&
      !this.zipCode &&
      !this.streetAddress
    );
  }
}

export class Preferences {
  constructor(
    public readonly currencyType: string,
    public readonly timeZone: string,
  ) {
    if (!currencyType) {
      throw new ArgumentInvalidException("Currency type is required");
    }

    if (!timeZone) {
      throw new ArgumentInvalidException("Time zone is required");
    }
  }

  equals(other: Preferences): boolean {
    return (
      this.currencyType === other.currencyType &&
      this.timeZone === other.timeZone
    );
  }

  static createDefault(): Preferences {
    return new Preferences("USD", "Pacific Time (US & Canada)");
  }
}
