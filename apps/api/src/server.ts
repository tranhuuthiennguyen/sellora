import moduleAlias from "module-alias";

// ugliest file entry ever
moduleAlias.addAliases({
  "@": `${__dirname}`,
  "@certs": `${__dirname}/certs`,
  "@config": `${__dirname}/config`,
  "@contants": `${__dirname}/constants`,
  "@db": `${__dirname}/db`,
  "@modules": `${__dirname}/modules`,
  "@plugins": `${__dirname}/plugins`,
  "@schemas": `${__dirname}/schemas`,
  "@utils": `${__dirname}/utils`,
  "@helpers": `${__dirname}/helpers`,
  "@application": `${__dirname}/application`,
  "@domain": `${__dirname}/domain`,
  "@infrastructure": `${__dirname}/infrastructure`,
  "@interface": `${__dirname}/interface`,
});

import App from "@/infrastructure/webserver/app";
import { EmailSchema, PasswordSchema } from "@/core/domain/validation/schemas";
import AuthRoute from "./interface/routes/auth.route";

const startServer = async () => {
  const app = new App({
    plugins: [],
    routes: [AuthRoute],
    schemas: [EmailSchema, PasswordSchema],
  });

  await app.config();

  await app.listen();

  // Graceful shutdown
  const signals: NodeJS.Signals[] = ["SIGINT", "SIGTERM"];
  signals.forEach((signal) => {
    process.on(signal, async () => {
      try {
        await app.app.close();
        app.app.log.info(`Close application on ${signal}`);
        process.exit(0);
      } catch (err: any) {
        app.app.log.error(`Error closing application on ${signal}`, err);
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
