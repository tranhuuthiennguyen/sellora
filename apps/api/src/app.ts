import fastify from "fastify";
import { TypeBoxTypeProvider } from "@fastify/type-provider-typebox";
import ajvErrors from "ajv-errors";
import { envOptions } from "@config";
import fastifyEnv from "@fastify/env";
import authRouter from "@modules/auth/auth.router";
import usersRouter from "@modules/users/users.router";
import dbPlugin from "@plugins/db";
import secureSession from "@plugins/secure-session";
import auth from "@plugins/auth";
import { logger } from "@utils/logger";
import { schemaErrorFormatter } from "@utils/schemaErrorFormatter";

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

  //Register plugins
  app.register(fastifyEnv, envOptions);
  app.register(dbPlugin);
  app.register(secureSession);
  app.register(auth);

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
