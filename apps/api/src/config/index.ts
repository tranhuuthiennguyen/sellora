import { EnvSchema } from "@utils/validateEnv";
import path from "path";
import { Static } from "@fastify/type-provider-typebox";

export const envPath = path.join(__dirname, "..", "..", ".env");

declare module "fastify" {
  interface FastifyInstance {
    config: Static<typeof EnvSchema>;
  }
}

declare global {
  namespace NodeJS {
    interface ProcessEnv extends Static<typeof EnvSchema> {}
  }
}

export const envOptions = {
  dotenv: { path: envPath },
  schema: EnvSchema,
  confKey: "config",
};
