import { FastifyInstance } from "fastify";
import {
  createUserHandler,
  getAllUsersHandler,
  getUserByIdHandler,
  updateUserById,
} from "./users.controller";
import {
  CreateUserSchema,
  GetAllUsersResponseSchema,
  GetUserByIdSchema,
} from "./users.schema";

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
  fastify.post(
    "/",
    {
      schema: CreateUserSchema,
    },
    createUserHandler,
  );
  //UPDATE BY ID
  fastify.patch(
    "/:userId",
    {
      schema: {},
    },
    updateUserById,
  );
  //DELETE BY ID
};

export default usersRouter;
