import { FastifyReply, FastifyRequest } from "fastify";
import { ERRORS, handleServerError } from "@helpers/errors.helper";
import {
  checkEmailExists,
  createUser,
  deleteUserById,
  getAllUsers,
  getUserById,
  updateUserById,
} from "./users.service";
import { STANDARD } from "@/constants";
import { CreateUser, UserType } from "./users.interface";
import { genSalt } from "@utils/auth";

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
    Params: { userId: number };
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
    const user = await checkEmailExists(request.server.db, email);
    if (user) {
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

export const updateUserByIdHandler = async (
  request: FastifyRequest<{
    Params: { userId: number };
    Body: UserType;
  }>,
  reply: FastifyReply,
) => {
  const { userId } = request.params;
  const body = request.body;

  try {
    const updatedUser = await updateUserById(request.server.db, userId, body);

    if (!updatedUser) {
      return reply.code(ERRORS.userNotExists.statusCode).send({
        success: false,
        message: ERRORS.userNotExists.message,
      });
    }

    return reply.code(STANDARD.OK.statusCode).send({
      success: true,
      message: "UPDATED",
      data: updatedUser,
    });
  } catch (error) {
    return handleServerError(reply, error);
  }
};

export const deleteUserByIdHandler = async (
  request: FastifyRequest<{
    Params: { userId: number };
  }>,
  reply: FastifyReply,
) => {
  try {
    const { userId } = request.params;

    const deletedId = await deleteUserById(request.server.db, userId);

    if (!deletedId[0]) {
      return reply.code(ERRORS.userNotExists.statusCode).send({
        success: false,
        message: ERRORS.userNotExists.message,
      });
    }

    return reply.code(STANDARD.OK.statusCode).send({
      success: true,
      message: "USER_DELETED",
    });
  } catch (error) {
    return handleServerError(reply, error);
  }
};
