import { PostgresJsDatabase } from "drizzle-orm/postgres-js";
import * as schema from "@db/schema";
import { Static } from "@fastify/type-provider-typebox";
import { Env } from "@/config";

declare module "fastify" {
  interface FastifyInstance {
    db: PostgresJsDatabase<typeof schema>;
  }
}

declare module "fastify" {
  interface FastifyInstance {
    config: Env;
  }
}
