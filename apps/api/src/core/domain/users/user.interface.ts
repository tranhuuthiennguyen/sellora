export interface UserInterface {
  id?: number;
  email?: string;
  username?: string;
  displayName?: string | null;
  bio?: string | null;
  currencyType?: string;
  profilePictureUrl?: string | null;
  country?: string | null;
  state?: string | null;
  city?: string | null;
  zipCode?: string | null;
  streetAddress?: string | null;
  timezone?: string | null;
  createdAt?: Date | null;
  updatedAt?: Date | null;
}
