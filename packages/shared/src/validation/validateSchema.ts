import { TSchema } from "@sinclair/typebox";
import { TypeCompiler } from "@sinclair/typebox/compiler";
import { UserSchema } from "../user/user.schema.js";

export function validateValue<T>(
  schema: TSchema,
  value: unknown,
): string | null {
  const C = TypeCompiler.Compile(schema);
  const ok = C.Check(value);

  if (ok) return null;

  const error = [...C.Errors(value)][0];
  return error?.message ?? "Invalid value";
}

export const UserFieldSchemas = {
  email: UserSchema.properties.email,
  username: UserSchema.properties.username,
  displayName: UserSchema.properties.displayName,
  bio: UserSchema.properties.bio,
  currencyType: UserSchema.properties.currencyType,
  profilePictureUrl: UserSchema.properties.profilePictureUrl,
  country: UserSchema.properties.country,
  state: UserSchema.properties.state,
  city: UserSchema.properties.city,
  zipCode: UserSchema.properties.zipCode,
  streetAddress: UserSchema.properties.streetAddress,
  timezone: UserSchema.properties.timezone,
};
