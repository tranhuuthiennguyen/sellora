import fastify from "fastify";
import { TypeBoxTypeProvider, TypeBoxValidatorCompiler, Format } from "@fastify/type-provider-typebox";
import fastifyEnv from "@fastify/env";
import authRouter from "../src/modules/auth/auth.router";
import usersRouter from "../src/modules/users/users.router";

import corsPlugin from "../src/plugins/cors";
import dbPlugin from "../src/plugins/db";
import swaggerPlugin from "../src/plugins/swagger";
import swaggerUiPlugin from "../src/plugins/swagger-ui";
import secureSession from "../src/plugins/secure-session";
import auth from "../src/plugins/auth";
import ajvErrors from "ajv-errors";
import { schemaErrorFormatter } from "../src/utils/schemaErrorFormatter";
import formatRegistry from "../src/plugins/format-registry";

export async function buildTestServer() {
  const app = fastify({
    logger: false,
    schemaErrorFormatter: schemaErrorFormatter,
    ajv: {
      customOptions: {
        allErrors: true,
      },
      plugins: [ajvErrors],
    },
  }).withTypeProvider<TypeBoxTypeProvider>()
    .setValidatorCompiler(TypeBoxValidatorCompiler)

  //Register plugins
  app.register(formatRegistry)
  // app.register(corsPlugin)
  // app.register(dbPlugin);
  // app.register(secureSession);
  // app.register(auth);

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
    app.log.error(error);

    if (error.validation) {
      const message = error.validation.map((v: any) => v.message).join(", ");
      reply.status(400).send({ error: "Validation Error", message });
    }
    reply.status(500).send({ error: "Something went wrong" });
  });

  //Health check

  await app.ready()

  return app;
}