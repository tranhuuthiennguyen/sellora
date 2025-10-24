import fastify from "fastify";
import { logger } from "@utils/logger";
import dbPlugin from "@plugins/db.plugin";
import { schemaErrorFormatter } from "@utils/schemaErrorFormatter";
import { TypeBoxTypeProvider } from "@fastify/type-provider-typebox";
import ajvErrors from "ajv-errors";
import { envOptions } from "@config";
import fastifyEnv from "@fastify/env";
import authRouter from "@/modules/auth/auth.router";
import usersRouter from "./modules/users/users.router";

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

  await app.register(fastifyEnv, envOptions);

  app.register(dbPlugin);

  //Register middlewares

  //Register routes
  app.register(
    (fastify, _, done) => {
      //Root route
      app.register(async (instance, opts) => {
        instance.get("/", async (request, reply) => {
          return { message: "Hello World!" };
        });
      });
      fastify.register(authRouter, { prefix: "/auth" });
      fastify.register(usersRouter, { prefix: "/users" });

      done();
    },
    { prefix: "/api" },
  );

  //Set error handler
  app.setErrorHandler((error, _request, reply) => {
    app.log.error(error);

    if (error.validation) {
      const message = error.validation.map((v) => v.message).join(", ");
      reply.status(400).send({ error: "Validation Error", message });
    }
    reply.status(500).send({ error: "Something went wrong" });
  });

  //Health check

  return app;
}
