import fastify from 'fastify'
import { env } from "@api/config/env.config"
import { logger } from "@api/utils/logger"
import dbPlugin from '@api/db'

const port = Number(env.API_PORT) || 5001
const host = String(env.API_HOST)

const startServer = async () => {
  const server = fastify({
    loggerInstance: logger
  })

  //Register database
  server.register(dbPlugin)

  //Register middlewares

  //Register routes

  //Set error handler
  server.setErrorHandler((error, _request, reply) => {
    server.log.error(error);
    reply.status(500).send({error: 'Something went wrong'})
  })

  //Health check

  //Root route
  server.get('/', (request, reply) => {
    reply.status(200).send({message: 'Hello from quizzer server!'})
  })

  // Graceful shutdown
  const signals: NodeJS.Signals[] = ['SIGINT', 'SIGTERM']
  signals.forEach((signal) => {
    process.on(signal, async() => {
      try {
        await server.close()
        server.log.error(`Close application on ${signal}`)
        process.exit(0)
      } catch (err: any) {
        server.log.error(`Error closing application on ${signal}`, err)
        process.exit(1)
      }
    })
  })

  //start server
  try {
    await server.listen({
      port,
      host,
    })
  } catch (err) {
    server.log.error(err);
    process.exit(1)
  }
}

process.on('unhandledRejection', (err) => {
  console.error('Unhandled Rejection:', err)
  process.exit(1)
})

startServer()