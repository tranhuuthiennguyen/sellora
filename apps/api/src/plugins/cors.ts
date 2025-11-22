import fp from "fastify-plugin";
import cors from "@fastify/cors";

export default fp(async (app) => {
  await app.register(cors, {
    origin: "*",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Origin",
      "X-Requested-With",
      "Accept",
    ],
  });
});
