import { FastifyRequestTypeBox } from "@schemas/typebox.schema";
import { FastifyInstance } from "fastify";

export const usersRoutes = (app: FastifyInstance) => {
  //get all
  app.get("/", (request, reply) => {
    return reply.send({
      message: "hello from /users/",
    });
  });
};
