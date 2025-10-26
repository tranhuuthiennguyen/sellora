import { FastifyInstance } from "fastify";
import {
  createUserHandler,
  deleteUserByIdHandler,
  getAllUsersHandler,
  getUserByIdHandler,
  updateUserByIdHandler,
} from "./users.controller";
import {
  CreateUserSchema,
  GetAllUsersResponseSchema,
  GetUserByIdSchema,
  UpdateUserSchema,
} from "./users.schema";

const usersRouter = async (fastify: FastifyInstance) => {
  //GET ALL
  fastify.get(
    "/",
    {
      schema: GetAllUsersResponseSchema,
      preHandler: fastify.authenticateUser,
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
      schema: UpdateUserSchema,
    },
    updateUserByIdHandler,
  );
  //DELETE BY ID
  fastify.delete(
    "/:userId",
    {
      schema: {},
    },
    deleteUserByIdHandler,
  );
};

export default usersRouter;
