import envSchema from "env-schema";

enum NodeEnv {
  development = "development",
  production = "production",
  test = "test",
}

export enum LogLevel {
  debug = "debug",
  info = "info",
  warn = "warn",
  error = "error",
}

const schema = {
  type: "object",
  required: [
    "NODE_ENV",
    "LOG_LEVEL",
    "API_HOST",
    "API_PORT",
    "DATABASE_URL",
    "REDIS_URL",
  ],
  properties: {
    NODE_ENV: {
      type: "string",
      enum: Object.values(NodeEnv) as readonly NodeEnv[],
    },
    LOG_LEVEL: {
      type: "string",
      enum: Object.values(LogLevel) as readonly LogLevel[],
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
    REDIS_URL: {
      type: "string",
    },
  },
};

export type Envs = {
  NODE_ENV: "development" | "production" | "test";
  LOG_LEVEL: "debug" | "info" | "warn" | "error";
  API_HOST: string;
  API_PORT: string;
  DATABASE_URL: string;
  REDIS_URL: string;
};

const env = envSchema<Envs>({
  schema: schema,
  dotenv: true,
});

export default {
  nodeEnv: env.NODE_ENV,
  isDevelopment: env.NODE_ENV === NodeEnv.development,
  isProduction: env.NODE_ENV === NodeEnv.production,
  version: process.env.npm_package_version ?? "0.0.0",
  log: {
    level: env.LOG_LEVEL,
  },
  server: {
    host: env.API_HOST,
    port: env.API_PORT,
  },
  db: {
    url: env.DATABASE_URL,
  },
  redis: {
    url: env.REDIS_URL,
  },
};
