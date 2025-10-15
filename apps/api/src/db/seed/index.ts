import { Pool } from "pg";
import * as dotenv from "dotenv";
import { drizzle } from "drizzle-orm/node-postgres";
import * as schema from "@api/db/schema";
import { seedUsers } from "./users";
import { reset } from "drizzle-seed";
import { seedCategories } from "./categories";
import { seedDecks } from "./decks";
import { seedCards } from "./cards";
dotenv.config();

const main = async () => {
  const client = new Pool({
    connectionString: process.env.DATABASE_URL,
  });

  const db = drizzle(client, { schema });

  await reset(db, schema);

  await seedUsers(db, 10);
  await seedCategories(db);
  await seedDecks(db, 20);
  await seedCards(db, 40);

  client.end();
};

main();
