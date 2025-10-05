import path from "path";
import dotenv from "dotenv"
import * as z from 'zod'

export default function loadConfig(): void {
  const envPath = path.join(__dirname, '..', '..', '.env');

  const envConfig = dotenv.config({path: envPath})

  if (envConfig.error) {
    throw new Error(
      `Failed to load .env file from path ${envPath}: ${envConfig.error.message}`
    )
  }

  const schema = z.looseObject({
    NODE_ENV: z.enum(["development", "testing", "production"]),
    LOG_LEVEL: z.enum(["debug", "info", "warn", "error", "fatal"]),
    API_HOST: z.string(),
    API_PORT: z.string()
  });

  const parsedEnv = schema.safeParse(process.env);

  if(!parsedEnv.success) {
    throw new Error(`Env config validation error: ${parsedEnv.error}`)
  }
}