import { drizzle, NodePgDatabase } from "drizzle-orm/node-postgres";
import * as schema from "@/infrastructure/database/schema";
import { Pool, PoolClient } from "pg";
import * as dotenv from "dotenv";
import logger from "@/utils/logger";
dotenv.config();

class DbConnection {
  private pool: Pool;
  public db: NodePgDatabase<typeof schema>;
  constructor() {
    this.pool = new Pool({
      connectionString: process.env.DATABASE_URL,
    });

    this.db = drizzle(this.pool, { schema });
  }

  public async closeConnection() {
    await this.pool.end();
  }
}

export default DbConnection;
