import fp from "fastify-plugin";

export default fp(async (app) => {
  app.addHook("onRoute", (route) => {
    console.log("📘 Registered route:", route.method, route.url);
    console.log("Schema:", JSON.stringify(route.schema, null, 2));
  });

  app.addHook("preValidation", async (req) => {
    console.log("📥 Incoming body:", req.body);
  });

  app.setErrorHandler((err: any, req, reply) => {
    console.log("❌ Validation error:", err.validation);
    reply.status(400).send(err);
  });
});
