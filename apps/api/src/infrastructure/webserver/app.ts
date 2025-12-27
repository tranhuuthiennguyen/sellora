import logger from "@/utils/logger";
import { schemaErrorFormatter } from "@/utils/schemaErrorFormatter";
import fastify, { FastifyBaseLogger, FastifyInstance } from "fastify";
import * as dotenv from "dotenv";
import { envOptions, Envs } from "../config";
import fastifyEnv from "@fastify/env";
import ajvErrors from "ajv-errors";
import { TypeSchema } from "@/core/domain/validation/schemas";
dotenv.config();

class App {
  public app: FastifyInstance;
  public host: string | undefined = undefined;
  public port: number | undefined = undefined;

  constructor(appInit: { plugins: any; routes: any; schemas: TypeSchema[] }) {
    this.app = fastify({
      loggerInstance: logger as FastifyBaseLogger,
      // schemaErrorFormatter: schemaErrorFormatter,
      ajv: {
        customOptions: {
          allErrors: true,
          coerceTypes: true,
        },
        plugins: [ajvErrors],
      },
    });

    this.app.addHook("preHandler", (req, _reply, done) => {
      if (req.body) {
        req.log.info({ body: req.body }, "parsed body");
      }
      done();
    });

    this.register(appInit.plugins);
    this.routes(appInit.routes);
    this.addSchemas(appInit.schemas);
    this.setErrorHandler();
  }

  private register(plugins: {
    forEach: (arg0: (plugin: any) => void) => void;
  }) {
    plugins.forEach((plugin) => {
      this.app.register(plugin);
    });
  }

  public routes(routes: { forEach: (arg0: (routes: any) => void) => void }) {
    routes.forEach((route) => {
      const router = new route();
      this.app.register(router.routes, { prefix: router.prefix_path });
    });

    this.app.get("/health-check", async (req, reply) => {
      reply.send({ healthcheck: "server is alive" });
    });
  }

  public addSchemas(schemas: TypeSchema[]) {
    schemas.forEach((schema) => {
      this.app.addSchema({
        $id: schema.id,
        ...schema.schema,
      });
    });
  }

  private setErrorHandler() {
    this.app.setErrorHandler((error: any, _request, reply) => {
      if (error.validation) {
        // format validation error
        const messages = Object.fromEntries(
          error.validation.map((v: any) => {
            return [v.instancePath.substring(1), v.message];
          }),
        );

        return reply.code(400).send({
          success: false,
          code: error.code,
          message: messages,
        });
      }

      // return reply.code(500).send({
      //   success: false,
      //   message: "Something went wrong.",
      // });
    });
  }

  public async config() {
    await this.app.register(fastifyEnv, envOptions);
  }

  public async listen() {
    try {
      const envs = this.app.getEnvs<Envs>();
      this.host = envs.API_HOST ?? "development";
      this.port = Number(envs.API_PORT) ?? 5000;

      await this.app.listen({
        host: this.host,
        port: this.port,
      });
    } catch (error) {
      this.app.log.error(error);
      process.exit(1);
    }
  }
}

export default App;
