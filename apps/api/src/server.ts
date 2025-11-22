import moduleAlias from "module-alias";

// ugliest file entry ever
moduleAlias.addAliases({
  "@": `${__dirname}`,
  "@config": `${__dirname}/config`,
  "@contants": `${__dirname}/constants`,
  "@db": `${__dirname}/db`,
  "@modules": `${__dirname}/modules`,
  "@plugins": `${__dirname}/plugins`,
  "@schemas": `${__dirname}/schemas`,
  "@utils": `${__dirname}/utils`,
  "@helpers": `${__dirname}/helpers`,
});

import { buildApp } from "@/app";
import { EnvSchema } from "@utils/validateEnv";

const startServer = async () => {
  const app = await buildApp();

  const { API_HOST, API_PORT } = app.getEnvs<typeof EnvSchema>();

  //start server
  try {
    await app.listen({
      port: Number(API_PORT),
      host: String(API_HOST),
    });
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }

  // Graceful shutdown
  const signals: NodeJS.Signals[] = ["SIGINT", "SIGTERM"];
  signals.forEach((signal) => {
    process.on(signal, async () => {
      try {
        await app.close();
        app.log.info(`Close application on ${signal}`);
        process.exit(0);
      } catch (err: any) {
        app.log.error(`Error closing application on ${signal}`, err);
        process.exit(1);
      }
    });
  });
};

process.on("unhandledRejection", (err) => {
  console.error("Unhandled Rejection:", err);
  process.exit(1);
});

startServer();
