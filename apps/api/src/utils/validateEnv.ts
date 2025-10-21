import { Type } from "@sinclair/typebox";

export const EnvSchema = Type.Object({
  NODE_ENV: Type.Union([
    Type.Literal("development"),
    Type.Literal("testing"),
    Type.Literal("production"),
  ]),
  LOG_LEVEL: Type.Union([
    Type.Literal("debug"),
    Type.Literal("info"),
    Type.Literal("warn"),
    Type.Literal("error"),
    Type.Literal("fatal"),
  ]),
  API_HOST: Type.String(),
  API_PORT: Type.String(),
  DATABASE_URL: Type.String(),
});
