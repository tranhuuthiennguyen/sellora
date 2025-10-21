import fastify from "fastify";
import { logger } from "@utils/logger";
import dbPlugin from "@plugins/db.plugin";
import { schemaErrorFormatter } from "@utils/schemaErrorFormatter";
import { TypeBoxTypeProvider } from "@fastify/type-provider-typebox";
import ajvErrors from "ajv-errors";
import { envOptions } from "@config";
import fastifyEnv from "@fastify/env";

export async function buildApp() {
  const app = fastify({
    loggerInstance: logger,
    schemaErrorFormatter: schemaErrorFormatter,
    ajv: {
      customOptions: {
        coerceTypes: false,
        allErrors: true,
      },
      plugins: [ajvErrors],
    },
  }).withTypeProvider<TypeBoxTypeProvider>();

  app.register(fastifyEnv, envOptions);

  app.register(dbPlugin);

  //Register middlewares

  //Register routes

  //Set error handler
  app.setErrorHandler((error, _request, reply) => {
    app.log.error(error);
    reply.status(500).send({ error: "Something went wrong" });
  });

  //Health check

  //Root route
  app.register(
    async (instance, opts) => {
      instance.get("/", async (request, reply) => {
        return { message: "Hello World!" };
      });
    },
    { prefix: "/api" },
  );

  return app;
}
