import path from "path";

export const envPath = path.join(__dirname, "..", "..", "..", ".env");

const schema = {
  type: "object",
  required: ["NODE_ENV", "LOG_LEVEL", "API_HOST", "API_PORT", "DATABASE_URL"],
  properties: {
    NODE_ENV: {
      type: "string",
      enum: ["development", "testing", "production"],
    },
    LOG_LEVEL: {
      type: "string",
      enum: ["debug", "info", "warn", "error", "fatal"],
    },
    API_HOST: {
      type: "string",
      default: "localhost",
    },
    API_PORT: {
      type: "integer",
      default: 5000,
    },
    DATABASE_URL: {
      type: "string",
    },
  },
};

export type Envs = {
  NODE_ENV?: "development" | "testing" | "production" | undefined;
  LOG_LEVEL?: "debug" | "info" | "warn" | "error" | "fatal" | undefined;
  API_HOST?: string | undefined;
  API_PORT?: string | undefined;
  DATABASE_URL?: string | undefined;
};

declare module "fastify" {
  interface FastifyInstance {
    config: Envs;
  }
}

export const envOptions = {
  dotenv: { path: envPath },
  schema: schema,
  confKey: "config",
};
