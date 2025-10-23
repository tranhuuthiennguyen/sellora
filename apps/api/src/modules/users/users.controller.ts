import {
  FastifyReplyTypeBox,
  FastifyRequestTypeBox,
} from "@/schemas/typebox.schema";
import { CreateUserSchema } from "./users.schema";
import { FastifyReply, FastifyRequest } from "fastify";
import { ERRORS, handleServerError } from "@/helpers/errors.helper";
import { getAllUsers, getUserById } from "./users.service";
import { STANDARD } from "@/constants";
import { GetUserType } from "./users.interface";

export const getAllUsersHandler = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    const users = await getAllUsers(request.server.db);

    return reply.code(STANDARD.OK.statusCode).send({
      value: users,
    });
  } catch (error) {
    return handleServerError(reply, error);
  }
};

export const getUserByIdHandler = async (
  request: FastifyRequest<{
    Params: {
      userId: string;
    };
  }>,
  reply: FastifyReply,
) => {
  try {
    const { userId } = request.params;

    const user = await getUserById(Number(userId), request.server.db);

    if (!user) {
      return reply
        .code(ERRORS.userNotExists.statusCode)
        .send(ERRORS.userNotExists.message);
    }

    return reply.code(STANDARD.OK.statusCode).send(user);
  } catch (error) {
    return handleServerError(reply, error);
  }
};

export const createUserHandler = async (
  request: FastifyRequestTypeBox<typeof CreateUserSchema>,
  reply: FastifyReplyTypeBox<typeof CreateUserSchema>,
) => {
  //TO-DO
};
