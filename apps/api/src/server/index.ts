import path from "node:path";
import { FastifyInstance } from "fastify";
import AutoLoad from "@fastify/autoload";
import UnderPressure from "@fastify/under-pressure";
import env from "../config/env";
import { JsonSchemaToTsProvider } from "@fastify/type-provider-json-schema-to-ts";
import { di } from "./di";

export class Server {
  constructor(private readonly fastify: FastifyInstance) {}

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
      options: {
        autoPrefix: "api",
      },
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
    await this.registerPlugins();
    await this.configureDI();
    await this.registerModules();
    await this.registerHealth();

    return this.fastify.withTypeProvider<JsonSchemaToTsProvider>();
  }
}
