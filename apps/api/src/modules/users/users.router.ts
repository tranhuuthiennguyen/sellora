import { FastifyInstance } from "fastify";
import {
  createUserHandler,
  getAllUsersHandler,
  getUserByIdHandler,
} from "./users.controller";
import { GetAllUsersResponseSchema, GetUserByIdSchema } from "./users.schema";

const usersRouter = async (fastify: FastifyInstance) => {
  //GET ALL
  fastify.get(
    "/",
    {
      schema: GetAllUsersResponseSchema,
    },
    getAllUsersHandler,
  );

  //GET BY ID
  fastify.get(
    "/:userId",
    {
      schema: GetUserByIdSchema,
    },
    getUserByIdHandler,
  );
  //CREATE USER
  fastify.post("/", createUserHandler);
  //UPDATE BY ID

  //DELETE BY ID
};

export default usersRouter;
