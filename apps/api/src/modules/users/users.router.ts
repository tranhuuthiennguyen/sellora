import { FastifyInstance } from "fastify";
import {
  deleteUserByIdHandler,
  getAllUsersHandler,
  getUserByIdHandler,
  updateUserByIdHandler,
} from "./users.controller";
import {
  GetAllUsersSchema,
  GetUserByIdSchema,
  UpdateUserSchema,
} from "./users.schema";

const usersRouter = async (fastify: FastifyInstance) => {
  //GET ALL
  fastify.get("/", {
    schema: GetAllUsersSchema,
    // preHandler: fastify.authenticateUser,
    handler: getAllUsersHandler,
  });

  //GET BY ID
  fastify.get("/:userId", {
    schema: GetUserByIdSchema,
    preHandler: fastify.authenticateUser,
    handler: getUserByIdHandler,
  });
  //UPDATE BY ID
  fastify.patch("/:userId", {
    schema: UpdateUserSchema,
    preHandler: fastify.authenticateUser,
    handler: updateUserByIdHandler,
  });
  //DELETE BY ID
  fastify.delete("/:userId", {
    preHandler: fastify.authenticateUser,
    handler: deleteUserByIdHandler,
  });
};

export default usersRouter;
