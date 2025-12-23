import { PostgresJsDatabase } from "drizzle-orm/postgres-js";
import { eq } from "drizzle-orm";
import * as schema from "@db/schema";
import { users } from "@db/schema";
import { UserEntity } from "@sellora/shared";

export const getAllUsers = async (db: PostgresJsDatabase<typeof schema>) => {
  const result = await db
    .select()
    .from(users)
    .catch((err) => {
      throw new Error(`Drizzle failed to get all users. ${err}`);
    });
  return result;
};

export const getUserById = async (
  db: PostgresJsDatabase<typeof schema>,
  userId: number,
) => {
  return await db.query.users.findFirst({
    columns: {
      passwordHash: false,
    },
    where: eq(users.id, userId),
  });
};

export const createUser = async (
  db: PostgresJsDatabase<typeof schema>,
  payload: {
    email: string;
    passwordHash: string;
    username: string;
  },
): Promise<UserEntity> => {
  const { email, passwordHash, username } = payload;
  const createdUser = (
    await db
      .insert(users)
      .values({
        email: email,
        passwordHash: passwordHash,
        username: username,
      })
      .returning({
        id: users.id,
        email: users.email,
        username: users.username,
        displayName: users.displayName,
        bio: users.bio,
        currencyType: users.currencyType,
        profilePictureUrl: users.profilePictureUrl,
        country: users.country,
        state: users.state,
        city: users.city,
        zipCode: users.zipCode,
        streetAddress: users.streetAddress,
        timezone: users.timezone,
        createdAt: users.createdAt,
        updatedAt: users.updatedAt,
      })
  )[0] as unknown as UserEntity;

  return createdUser;
};

export const checkUserExists = async (
  db: PostgresJsDatabase<typeof schema>,
  params: { userId?: number; email?: string },
) => {
  const condition = params.userId
    ? eq(users.id, params.userId)
    : eq(users.email, params.email!);

  const res = await db.query.users.findFirst({
    where: condition,
  });

  if (!res) return null;

  const { passwordHash, ...user } = res;

  return {
    passwordHash,
    user,
  };
};

export const updateUserById = async (
  db: PostgresJsDatabase<typeof schema>,
  userId: number,
  updates: Record<string, unknown>,
) => {
  const payload = {
    ...updates,
    updatedAt: new Date(),
  };

  const [updatedUser] = await db
    .update(users)
    .set(payload)
    .where(eq(users.id, userId))
    .returning();

  return updatedUser ?? null;
};

export const deleteUserById = async (
  db: PostgresJsDatabase<typeof schema>,
  userId: number,
) => {
  try {
    return await db.delete(users).where(eq(users.id, userId)).returning();
  } catch (error) {
    throw new Error(`Drizzle Error: ${error}`);
  }
};

export const emailToBaseUsername = (email: string) => {
  const username = email.split("@")[0]!;

  return username
    ?.toLocaleLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
};

export const generateUniqueUsername = async (
  db: PostgresJsDatabase<typeof schema>,
  email: string,
) => {
  const base = emailToBaseUsername(email);

  let username = base;
  let counter = 1;

  while (true) {
    const exists = (
      await db
        .selectDistinct({ username: users.username })
        .from(users)
        .where(eq(users.username, username))
    )[0];

    if (!exists) return username;

    username = `${base}-${counter}`;
    counter++;
  }
};
