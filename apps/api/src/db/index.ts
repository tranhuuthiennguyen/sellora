import fp from 'fastify-plugin'
import * as schema from "@api/db/schema"
import { env } from '@api/config/env.config'
import { drizzle } from 'drizzle-orm/node-postgres'
import { Pool } from 'pg'
import { logger } from '@api/utils/logger'

const dbPlugin = fp(async (fastify) => {
  const pool = await new Pool({
    connectionString: env.DATABASE_URL
    })
      .connect()
      .then((client) => {
        logger.info("Connected to database.")
        return client
      })
      .catch((error) => {
        logger.error(`Failed to connect to database ${String(error)}`)
        throw new Error(`Failed to connect to database ${String(error)}`)
    });
  const db = drizzle(pool, { schema })
  fastify.decorate('db', db)

  fastify.addHook('onClose', () => {
    pool.on('end', () => {
      logger.info('Database connection closed.')
    })
  })
}, {
  name: 'db-plugin'
})

export default dbPlugin;