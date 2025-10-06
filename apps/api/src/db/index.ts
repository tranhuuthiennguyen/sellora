import 'dotenv/config'
import { drizzle } from 'drizzle-orm/node-postgres'

const db = drizzle(String(process.env.DATABASE_URL))