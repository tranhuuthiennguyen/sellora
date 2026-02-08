export type updateUserRequestDto = {
  displayName?: string | null;
  bio?: string | null;
  profilePictureUrl?: string | null;
  country?: string | null;
  state?: string | null;
  city?: string | null;
  zipCode?: string | null;
  streetAddress?: string | null;
  email?: string;
  username?: string;
  currencyType?: string;
  timeZone?: string;
};

export type getUserResponseDto = {
  displayName?: string | null;
  bio?: string | null;
  profilePictureUrl?: string | null;
  country?: string | null;
  state?: string | null;
  city?: string | null;
  zipCode?: string | null;
  streetAddress?: string | null;
  email: string;
  username: string;
  currencyType: string;
  timeZone: string;
  id: string;
  createdAt: string;
  updatedAt: string;
};
