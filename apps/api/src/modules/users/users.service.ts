import { PostgresJsDatabase } from "drizzle-orm/postgres-js";
import { eq } from "drizzle-orm";
import * as schema from "@db/schema";
import { users } from "@db/schema";

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
      role: false,
    },
    where: eq(users.id, userId),
  });
};

export const createUser = async (
  db: PostgresJsDatabase<typeof schema>,
  email: string,
  passwordHash: string,
) => {
  const result = await db
    .insert(users)
    .values({
      email: email.trim(),
      passwordHash: passwordHash.trim(),
    })
    .returning({
      id: users.id,
      username: users.username,
      email: users.email,
      avatarUrl: users.avatarUrl,
      createdAt: users.createdAt,
      updatedAt: users.updatedAt,
    });

  return result[0];
};

export const checkEmailExists = async (
  db: PostgresJsDatabase<typeof schema>,
  email: string,
) => {
  return await db.query.users.findFirst({
    where: eq(users.email, email),
  });
};

export const checkUserExists = async (
  db: PostgresJsDatabase<typeof schema>,
  userId: number,
) => {
  return await db.query.users.findFirst({
    where: eq(users.id, userId),
  });
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
    return await db.delete(users).where(eq(users.id, userId)).returning({
      deletedId: users.id,
    });
  } catch (error) {
    throw new Error("Drizzle error.");
  }
};
