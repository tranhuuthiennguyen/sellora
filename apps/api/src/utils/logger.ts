import pino from "pino"
import { env } from "@api/config/env.config"

export const logger = pino({
  transport: {
    target: 'pino-pretty',
    options: {
      translateTime: 'HH:MM:ss Z',
      ignore: 'pid,hostname',
    },
  },
  level: env.LOG_LEVEL
})