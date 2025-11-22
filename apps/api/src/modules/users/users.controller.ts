import { FastifyReply, FastifyRequest } from "fastify";
import { ERRORS, handleServerError } from "@helpers/errors.helper";
import {
  deleteUserById,
  getAllUsers,
  getUserById,
  updateUserById,
} from "./users.service";
import { STANDARD } from "@/constants";
import type { UserEntity } from "@sellora/shared";
import { sendError, sendSuccess } from "@utils/response";
import {
  FastifyReplyTypeBox,
  FastifyRequestTypeBox,
} from "@/schemas/common.schema";
import {
  DeleteUserSchema,
  GetUserByIdSchema,
  UpdateUserSchema,
} from "@modules/users/users.schema";

export const getAllUsersHandler = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    const users = await getAllUsers(request.server.db);

    return reply.code(200).send({
      success: true,
      users: users,
    });
  } catch (error) {
    return handleServerError(reply, error);
  }
};

export const getUserByIdHandler = async (
  request: FastifyRequestTypeBox<typeof GetUserByIdSchema>,
  reply: FastifyReplyTypeBox<typeof GetUserByIdSchema>,
) => {
  try {
    const { userId } = request.params as { userId: number };

    const user = (await getUserById(
      request.server.db,
      userId,
    )) as unknown as UserEntity;

    if (!user) {
      return reply.code(404).send({
        success: false,
        message: ERRORS.userNotExists.message,
      });
    }

    return reply.code(200).send({
      success: true,
      user: user,
    });
  } catch (error) {
    return handleServerError(reply, error);
  }
};

export const updateUserByIdHandler = async (
  request: FastifyRequestTypeBox<typeof UpdateUserSchema>,
  reply: FastifyReplyTypeBox<typeof UpdateUserSchema>,
) => {
  const { userId } = request.params as { userId: number };
  const body = request.body as UserEntity;

  try {
    const updatedUser = await updateUserById(request.server.db, userId, body);

    if (!updatedUser) {
      return reply.code(404).send({
        success: false,
        message: ERRORS.userNotExists.message,
      });
    }

    return reply.code(200).send({
      success: true,
      user: updatedUser,
    });
  } catch (error) {
    return handleServerError(reply, error);
  }
};

export const deleteUserByIdHandler = async (
  request: FastifyRequestTypeBox<typeof DeleteUserSchema>,
  reply: FastifyReplyTypeBox<typeof DeleteUserSchema>,
) => {
  try {
    const { userId } = request.params as { userId: number };

    const deletedId = await deleteUserById(request.server.db, userId);

    if (!deletedId[0]) {
      return reply.code(404).send({
        success: false,
        message: ERRORS.userNotExists.message,
      });
    }

    return reply.code(200).send({
      success: true,
      message: "User has been successfully deleted from the database.",
    });
  } catch (error) {
    return handleServerError(reply, error);
  }
};
