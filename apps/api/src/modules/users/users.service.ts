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
      role: users.role,
      avatarUrl: users.avatarUrl,
      createdAt: users.createdAt,
      updatedAt: users.updatedAt,
    });

  return result[0];
};

export const checkUserExists = async (
  db: PostgresJsDatabase<typeof schema>,
  params: { userId?: number; email?: string },
) => {
  if (!params.userId && !params.email) {
    throw new Error("Either email or userId must be provided");
  }

  const condition = params.userId
    ? eq(users.id, params.userId)
    : eq(users.email, params.email!);

  return await db.query.users.findFirst({
    where: condition,
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
    return await db.delete(users).where(eq(users.id, userId)).returning();
  } catch (error) {
    throw new Error(`Drizzle Error: ${error}`);
  }
};
