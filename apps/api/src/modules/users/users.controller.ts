import {
  FastifyReplyTypeBox,
  FastifyRequestTypeBox,
} from "@/schemas/common.schema";
import { CreateUserSchema } from "./users.schema";
import { FastifyReply, FastifyRequest } from "fastify";
import { ERRORS, handleServerError } from "@/helpers/errors.helper";
import {
  checkEmailExists,
  createUser,
  getAllUsers,
  getUserById,
} from "./users.service";
import { STANDARD } from "@/constants";
import { CreateUser, UserType } from "./users.interface";
import { genSalt } from "@/utils/auth";

export const getAllUsersHandler = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    const users = await getAllUsers(request.server.db);

    return reply.code(STANDARD.OK.statusCode).send({
      success: true,
      message: STANDARD.OK.message,
      data: users,
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

    const user = await getUserById(request.server.db, Number(userId));

    if (!user) {
      return reply
        .code(ERRORS.userNotExists.statusCode)
        .send(ERRORS.userNotExists.message);
    }

    return reply.code(STANDARD.OK.statusCode).send({
      success: true,
      message: STANDARD.OK.message,
      data: user,
    });
  } catch (error) {
    return handleServerError(reply, error);
  }
};

export const createUserHandler = async (
  request: FastifyRequest<{
    Body: CreateUser;
  }>,
  reply: FastifyReply,
) => {
  try {
    const { email, password } = request.body;
    // email & pwd must be provided
    if (!email || !password) {
      return reply.code(400).send({
        message: "Email and password must be provided.",
      });
    }
    // check email exists
    const isEmailExisted = await checkEmailExists(request.server.db, email);
    if (isEmailExisted[0]) {
      return reply
        .code(ERRORS.userExists.statusCode)
        .send(ERRORS.userExists.message);
    }

    const hashPwd = await genSalt(10, password);
    const createdUser = await createUser(request.server.db, email, hashPwd);

    return reply.code(STANDARD.CREATE.statusCode).send({
      success: true,
      message: STANDARD.CREATE.message,
      data: createdUser,
    });
  } catch (error) {
    return handleServerError(reply, error);
  }
};

export const updateUserById = async (
  request: FastifyRequest<{
    Body: UserType;
  }>,
  reply: FastifyReply,
) => {};
