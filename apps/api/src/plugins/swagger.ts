// src/plugins/swagger.ts
import fp from "fastify-plugin";
import fastifySwagger from "@fastify/swagger";

export default fp(async (app) => {
  try {
    await app.register(fastifySwagger, {
      openapi: {
        openapi: "3.0.0",
        info: {
          title: "Sellora API Swagger",
          description: "Testing Sellora API endpoints Swagger",
          version: "0.1.0",
        },
        servers: [
          {
            url: "http://localhost:5000",
            description: "Development server",
          },
        ],
        tags: [
          { name: "user", description: "User endpoints" },
          { name: "auth", description: "Auth endpoints" },
        ],
        components: {
          securitySchemes: {
            apiKey: {
              type: "apiKey",
              name: "apiKey",
              in: "header",
            },
          },
        },
        externalDocs: {
          url: "https://swagger.io",
          description: "Find more info here",
        },
      },
    });
  } catch (error: any) {
    throw new Error(error.message);
  }
  app.log.info("Swagger registered.");
});
