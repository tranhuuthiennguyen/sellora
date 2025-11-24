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
    onRequest: fastify.authenticateUser,
    handler: getAllUsersHandler,
  });

  //GET BY ID
  fastify.get("/:userId", {
    schema: GetUserByIdSchema,
    onRequest: fastify.authenticateUser,
    handler: getUserByIdHandler,
  });
  //UPDATE BY ID
  fastify.patch("/:userId", {
    schema: UpdateUserSchema,
    onRequest: fastify.authenticateUser,
    handler: updateUserByIdHandler,
  });
  //DELETE BY ID
  fastify.delete("/:userId", {
    onRequest: fastify.authenticateUser,
    handler: deleteUserByIdHandler,
  });
};

export default usersRouter;
