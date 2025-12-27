import { FastifyInstance, FastifyPluginOptions } from "fastify";

export interface IRoute {
  prefix_path: string;
  routes: (
    fastify: FastifyInstance,
    _options: FastifyPluginOptions,
    _done: any,
  ) => Promise<void>;
}
