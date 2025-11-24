import fp from "fastify-plugin";
import cors from "@fastify/cors";

export default fp(async (app) => {
  try {
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
  } catch (error: any) {
    throw new Error(error.mesage);
  }
  app.log.info("Cors registered.");
});
