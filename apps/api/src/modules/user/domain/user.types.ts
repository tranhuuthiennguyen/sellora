export type CreateUserProps = {
  email: string;
  passwordHash: string;
  username: string;
};

export type PersistedUserProps = {
  id: string;
  email: string;
  passwordHash: string;
  username: string;
  currencyType: string;

  displayName: string | null;
  bio: string | null;
  profilePictureUrl: string | null;
  country: string | null;
  state: string | null;
  city: string | null;
  zipCode: string | null;
  streetAddress: string | null;
  timeZone: string;

  tokenVersion: number;

  createdAt: string;
  updatedAt: string;
};
