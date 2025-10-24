import { users } from "@/db/schema";
import { PostgresJsDatabase } from "drizzle-orm/postgres-js";
import * as schema from "@db/schema";
import { eq, sql } from "drizzle-orm";
import { UserType } from "./users.interface";

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
  const result = await db
    .select()
    .from(users)
    .where(sql`${users.id} = ${userId}`)
    .limit(1);

  return result[0];
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
  return await db.selectDistinct().from(users).where(eq(users.email, email));
};
