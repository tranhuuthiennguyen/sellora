import moduleAlias from "module-alias";

moduleAlias.addAliases({
  "@": `${__dirname}`,
  "@config": `${__dirname}/config`,
  "@contants": `${__dirname}/constants`,
  "@db": `${__dirname}/db`,
  "@modules": `${__dirname}/modules`,
  "@plugins": `${__dirname}/plugins`,
  "@schemas": `${__dirname}/schemas`,
  "@utils": `${__dirname}/utils`,
  "@types": `${__dirname}/types`,
});

import { buildApp } from "@/app";

const startServer = async () => {
  const app = await buildApp();

  // Graceful shutdown
  const signals: NodeJS.Signals[] = ["SIGINT", "SIGTERM"];
  signals.forEach((signal) => {
    process.on(signal, async () => {
      try {
        await app.close();
        app.log.error(`Close application on ${signal}`);
        process.exit(0);
      } catch (err: any) {
        app.log.error(`Error closing application on ${signal}`, err);
        process.exit(1);
      }
    });
  });

  //start server
  try {
    await app.listen({
      port: Number(app.config.API_PORT),
      host: String(app.config.API_HOST),
    });
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

process.on("unhandledRejection", (err) => {
  console.error("Unhandled Rejection:", err);
  process.exit(1);
});

startServer();
