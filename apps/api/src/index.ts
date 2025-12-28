import { env } from "@/config";
import { Server } from "@/server";
import { closeDbConnection } from "@/core/db/postgres";
import GracefulServer from "@gquittet/graceful-server";
import Fastify from "fastify";
import { randomUUID } from "node:crypto";

async function init() {
  const fastify = Fastify({
    logger: {
      level: env.log.level,
      redact: ["headers.authorization"],
    },
    genReqId: function (req) {
      // header best practice: don't use "x-" https://www.rfc-editor.org/info/rfc6648 and keep it lowercase
      return (req.headers["request-id"] as string) ?? randomUUID();
    },
    routerOptions: {
      ignoreDuplicateSlashes: true,
    },
    ajv: {
      customOptions: {
        allErrors: true,
        coerceTypes: true,
        keywords: ["example"],
      },
    },
  });

  const server = new Server(fastify);

  const app = await server.bootstrap();

  const gracefulServer = GracefulServer(app.server, {
    closePromises: [closeDbConnection],
  });

  gracefulServer.on(GracefulServer.READY, () => {
    app.log.info("Server is ready");
  });

  gracefulServer.on(GracefulServer.SHUTTING_DOWN, () => {
    app.log.info("Server is shutting down");
  });

  gracefulServer.on(GracefulServer.SHUTDOWN, (error) => {
    app.log.info("Server is down because of", error.message);
  });

  try {
    await app.listen({ host: env.server.host, port: Number(env.server.port) });
    gracefulServer.setReady();
  } catch (error) {
    app.log.error(error);
    // eslint-disable-next-line n/no-process-exit,unicorn/no-process-exit
    process.exit(1);
  }
}

init();
