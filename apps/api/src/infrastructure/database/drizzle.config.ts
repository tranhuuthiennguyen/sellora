import * as dotenv from "dotenv";
import { defineConfig } from "drizzle-kit";
dotenv.config();

export default defineConfig({
  dialect: "postgresql",
  schema: "./src/infrastructure/database/schema.ts",
  out: "./src/infrastructure/database/migrations",
  dbCredentials: {
    url: String(process.env.DATABASE_URL),
  },
  migrations: {
    schema: "public",
  },
});
