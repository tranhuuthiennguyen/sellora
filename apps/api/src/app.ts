import fastify, { FastifySchemaValidationError } from "fastify";
import {
  TypeBoxTypeProvider,
  TypeBoxValidatorCompiler,
} from "@fastify/type-provider-typebox";
import { envOptions } from "@config";
import fastifyEnv from "@fastify/env";
import authRouter from "@modules/auth/auth.router";
import usersRouter from "@modules/users/users.router";

import corsPlugin from "@plugins/cors";
import dbPlugin from "@plugins/db";
import swaggerPlugin from "@plugins/swagger";
import swaggerUiPlugin from "@plugins/swagger-ui";
import secureSession from "@plugins/secure-session";
import auth from "@plugins/auth";
import { logger } from "@utils/logger";
import ajvErrors from "ajv-errors";
import { schemaErrorFormatter } from "@utils/schemaErrorFormatter";
import formatRegistry from "@plugins/format-registry";
import { DefaultErrorFunction, SetErrorFunction } from "@sellora/shared";

export async function buildApp() {
  const app = fastify({
    loggerInstance: logger,
    schemaErrorFormatter: schemaErrorFormatter,
    ajv: {
      customOptions: {
        allErrors: true,
      },
      // plugins: [ajvErrors],
    },
  })
    .withTypeProvider<TypeBoxTypeProvider>()
    .setValidatorCompiler(TypeBoxValidatorCompiler);

  SetErrorFunction((parameter) => {
    return "errorMessage" in parameter.schema
      ? parameter.schema.errorMessage
      : DefaultErrorFunction(parameter);
  });

  //Register plugins
  app.register(formatRegistry);
  app.register(corsPlugin);
  app.register(swaggerPlugin);
  app.register(swaggerUiPlugin);
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
  app.setErrorHandler((error: any, _request, reply) => {
    if (error.validation) {
      const message = error.validation.map((v: any) => v.message).join(", ");
      return reply.code(400).send({
        success: false,
        message: message,
      });
    }

    return reply.code(500).send({
      success: false,
      message: "Something went wrong.",
    });
  });

  //Health check

  await app.ready();

  return app;
}
