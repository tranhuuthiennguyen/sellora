import path from "path";
import dotenv from "dotenv"
import * as z from 'zod'


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
  API_PORT: z.string(),
  DATABASE_URL: z.string()
});

export const env = schema.parse(process.env);

if(!env.success) {
  throw new Error(`Env config validation error: ${env.error}`)
}
