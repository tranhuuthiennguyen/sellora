import pino from "pino";
import * as dotenv from "dotenv";
import { envPath } from "@config";

dotenv.config({ path: envPath });

export const logger = pino({
  transport: {
    target: "pino-pretty",
    options: {
      translateTime: "HH:MM:ss Z",
      ignore: "pid,hostname",
    },
  },
  level: process.env.LOG_LEVEL,
});
