import { PostgresJsDatabase } from "drizzle-orm/postgres-js";
import { FastifyReply } from "fastify";
import * as schema from "@db/schema";
import { eq } from "drizzle-orm";
import { compareHash, genSalt } from "@/utils/auth";
import { HASH_SALT } from "@/constants";

export const generateAccessToken = async (
  reply: FastifyReply,
  payload: any,
) => {
  return await reply.jwtSign(
    {
      id: payload.id,
    },
    {
      expiresIn: 60 * 10,
    },
  );
};

export const generateRefreshToken = async (
  reply: FastifyReply,
  payload: any,
) => {
  return await reply.jwtSign(
    {
      id: payload.id,
    },
    {
      expiresIn: "30d",
    },
  );
};

export const verifyPassword = async (
  db: PostgresJsDatabase<typeof schema>,
  userId: number,
  password: string,
): Promise<boolean | null> => {
  const user = await db.query.users.findFirst({
    where: eq(schema.users.id, userId),
  });

  if (!user) return null;

  return await compareHash(password, user.passwordHash);
};

export const updatePassword = async (
  db: PostgresJsDatabase<typeof schema>,
  userId: number,
  password: string,
) => {
  const pwdHash = await genSalt(HASH_SALT, password);
  const res = await db
    .update(schema.users)
    .set({
      passwordHash: pwdHash,
    })
    .where(eq(schema.users.id, userId));

  return res;
};
