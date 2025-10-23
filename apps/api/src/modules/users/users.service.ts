import { users } from "@/db/schema";
import { PostgresJsDatabase } from "drizzle-orm/postgres-js";
import * as schema from "@db/schema";
import { sql } from "drizzle-orm";
import { GetUserType } from "./users.interface";

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
  userId: number,
  db: PostgresJsDatabase<typeof schema>,
) => {
  const result = await db
    .select()
    .from(users)
    .where(sql`${users.id} = ${userId}`)
    .limit(1);

  return result[0];
};
