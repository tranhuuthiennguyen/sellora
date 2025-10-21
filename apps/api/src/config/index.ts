import { EnvSchema } from "@utils/validateEnv";
import path from "path";

export const envPath = path.join(__dirname, "..", "..", ".env");

export const envOptions = {
  dotenv: { path: envPath },
  schema: EnvSchema,
  confKey: "config",
};
