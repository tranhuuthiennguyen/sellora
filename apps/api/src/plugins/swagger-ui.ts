// src/plugins/swagger-ui.ts
import fp from "fastify-plugin";
import fastifySwaggerUi from "@fastify/swagger-ui";

export default fp(async (app) => {
  try {
    await app.register(fastifySwaggerUi, {
      routePrefix: "/docs",
      uiConfig: {
        docExpansion: "full",
        deepLinking: false,
      },
      uiHooks: {
        onRequest(request, reply, done) {
          done();
        },
        preHandler(request, reply, done) {
          done();
        },
      },
      staticCSP: true,
      transformStaticCSP: (header) => header,
      transformSpecification: (swaggerObject) => swaggerObject,
      transformSpecificationClone: true,
    });
  } catch (error: any) {
    throw new Error(error.message);
  }
  app.log.info("Swagger UI registered.");
});
