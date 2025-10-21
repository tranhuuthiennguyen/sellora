import { Static } from "@fastify/type-provider-typebox";
import { EnvSchema } from "@config";

declare global {
  namespace NodeJS {
    interface ProcessEnv extends Static<EnvSchema> {}
  }
}

export {};
