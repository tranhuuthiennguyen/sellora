import { FastifyReply, FastifyRequest } from "fastify";
import { ERRORS, handleServerError } from "@helpers/errors.helper";
import {
  checkUserExists,
  createUser,
  deleteUserById,
  getAllUsers,
  getUserById,
  updateUserById,
} from "./users.service";
import { STANDARD } from "@/constants";
import { CreateUser, UserType } from "./users.interface";
import { genSalt } from "@utils/auth";
import { sendError, sendSuccess } from "@utils/response";

export const getAllUsersHandler = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    const users = await getAllUsers(request.server.db);

    return sendSuccess(reply, {
      statusCode: STANDARD.OK.statusCode,
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
      return sendError(reply, {
        statusCode: ERRORS.userNotExists.statusCode,
        message: ERRORS.userNotExists.message,
      });
    }

    return sendSuccess(reply, {
      statusCode: STANDARD.OK.statusCode,
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
    // check user exists
    const user = await checkUserExists(request.server.db, { email });
    if (user) {
      return sendError(reply, {
        statusCode: ERRORS.userExists.statusCode,
        message: ERRORS.userExists.message,
      });
    }

    const hashPwd = await genSalt(10, password);
    const createdUser = await createUser(request.server.db, email, hashPwd);

    return sendSuccess(reply, {
      statusCode: STANDARD.CREATE.statusCode,
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
      return sendError(reply, {
        statusCode: ERRORS.userNotExists.statusCode,
        message: ERRORS.userNotExists.message,
      });
    }

    return sendSuccess(reply, {
      statusCode: STANDARD.OK.statusCode,
      message: "USER_DATA_UPDATED",
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
      return sendError(reply, {
        statusCode: ERRORS.userNotExists.statusCode,
        message: ERRORS.userNotExists.message,
      });
    }

    return sendSuccess(reply, {
      statusCode: STANDARD.OK.statusCode,
      message: "USER_DELETED",
    });
  } catch (error) {
    return handleServerError(reply, error);
  }
};
