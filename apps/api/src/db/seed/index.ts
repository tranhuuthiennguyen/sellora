import { Pool } from "pg";
import * as dotenv from "dotenv";
import { drizzle } from "drizzle-orm/node-postgres";
import * as schema from "@db/schema";
import { reset } from "drizzle-seed";
import { seedUsers } from "./users";
dotenv.config();

const main = async () => {
  const client = new Pool({
    connectionString: process.env.DATABASE_URL,
  });

  const db = drizzle(client, { schema });

  await reset(db, schema);

  await seedUsers(db, 10);

  client.end();
};

main();
