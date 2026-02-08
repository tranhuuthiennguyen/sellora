import path from "node:path";
import { FastifyInstance } from "fastify";
import AutoLoad from "@fastify/autoload";
import Cors from "@fastify/cors";
import Helmet from "@fastify/helmet";
import UnderPressure from "@fastify/under-pressure";
import env from "../config/env";
import { di } from "./di";
import mercurius from "mercurius";
import getGQL from "./plugins/gql";

export class Server {
  constructor(private readonly fastify: FastifyInstance) {}

  async registerGraphQL() {
    await this.fastify.register(mercurius, {
      schema: await getGQL(),
      graphiql: env.isDevelopment,
      defineMutation: true,
    });
  }

  async registerHelmet() {
    await this.fastify.register(Helmet, {
      global: true,
      contentSecurityPolicy: !env.isDevelopment,
      crossOriginEmbedderPolicy: !env.isDevelopment,
    });
  }

  async registerCors() {
    await this.fastify.register(Cors, {
      origin: "http://localhost:3000",
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
  }

  async registerPlugins() {
    await this.fastify.register(AutoLoad, {
      dir: path.join(__dirname, "plugins"),
      dirNameRoutePrefix: false,
    });
  }

  async configureDI() {
    await di(this.fastify);
  }

  async registerModules() {
    await this.fastify.register(AutoLoad, {
      dir: path.join(__dirname, "../modules"),
      dirNameRoutePrefix: false,
      matchFilter: (filePath) => {
        const regex = env.isProduction
          ? /.(route|resolver).js$/
          : /.(route|resolver).(ts|js)$/;
        return regex.test(filePath);
      },
    });
  }

  async registerHealth() {
    await this.fastify.register(UnderPressure);
  }

  async bootstrap() {
    await this.registerGraphQL();
    await this.registerHelmet();
    await this.registerCors();
    await this.registerPlugins();
    await this.configureDI();
    await this.registerModules();
    await this.registerHealth();

    return this.fastify;
  }
}
