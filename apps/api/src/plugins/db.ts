import fp from "fastify-plugin";
import { drizzle } from "drizzle-orm/node-postgres";
import { PostgresJsDatabase } from "drizzle-orm/postgres-js";
import { Pool } from "pg";
import { logger } from "@utils/logger";
import { EnvSchema } from "@utils/validateEnv";
import * as schema from "@db/schema";

declare module "fastify" {
  interface FastifyInstance {
    db: PostgresJsDatabase<typeof schema>;
  }
}

const dbPlugin = fp(
  async (fastify) => {
    try {
      const { DATABASE_URL } = fastify.getEnvs<typeof EnvSchema>();

      const pool = await new Pool({
        connectionString: String(DATABASE_URL),
      })
        .connect()
        .then((client) => {
          logger.info("Connected to database.");
          return client;
        })
        .catch((error) => {
          logger.error(`Failed to connect to database ${String(error)}`);
          throw new Error(`Failed to connect to database ${String(error)}`);
        });

      const db = drizzle(pool, { schema });
      fastify.decorate("db", db);

      fastify.addHook("onClose", () => {
        pool.on("end", () => {
          logger.info("Database connection closed.");
        });
      });
    } catch (error: any) {
      throw new Error(error.mesage);
    }
  },
  {
    name: "db-plugin",
  },
);

export default dbPlugin;
