import { FastifyReply, FastifyRequest } from "fastify";
import { ERRORS, handleServerError } from "@helpers/errors.helper";
import { checkUserExists, createUser } from "@modules/users/users.service";
import { compareHash, genSalt } from "@utils/auth";
import {
  FastifyReplyTypeBox,
  FastifyRequestTypeBox,
} from "@/schemas/common.schema";
import { CreateUserSchema } from "@modules/users/users.schema";
import { LoginSchema } from "./auth.schema";
import type { CreateUserDto, LoginInputDto, UserEntity } from "@sellora/shared";

export const registerHandler = async (
  request: FastifyRequestTypeBox<typeof CreateUserSchema>,
  reply: FastifyReplyTypeBox<typeof CreateUserSchema>,
) => {
  try {
    const { email, password, username, currencyType } =
      request.body as CreateUserDto;

    const user = await checkUserExists(request.server.db, { email });
    if (user) {
      return reply.code(409).send({
        success: false,
        message: ERRORS.userExists.message,
      });
    }

    const hashPwd = await genSalt(10, password);

    const payload = {
      email: email,
      passwordHash: hashPwd,
      username: username,
      currencyType: currencyType,
    };
    const createdUser: UserEntity = await createUser(
      request.server.db,
      payload,
    );

    if (!createdUser) {
      return reply.code(500).send({
        success: false,
        message: ERRORS.internalServerError.message,
      });
    }

    request.session.set("authUser", {
      id: createdUser.id,
      email: createdUser.email,
    });

    return reply.code(201).send({
      success: true,
      user: createdUser,
    });
  } catch (error) {
    return handleServerError(reply, error);
  }
};

export const loginHandler = async (
  request: FastifyRequestTypeBox<typeof LoginSchema>,
  reply: FastifyReplyTypeBox<typeof LoginSchema>,
) => {
  try {
    const { email, password } = request.body as LoginInputDto;

    const res = await checkUserExists(request.server.db, { email });

    if (!res) {
      return reply.code(404).send({
        success: false,
        message: ERRORS.userNotExists.message,
      });
    }

    const checkPassword = await compareHash(password, res.passwordHash);

    if (!checkPassword) {
      return reply.code(401).send({
        success: false,
        message: ERRORS.userCredError.message,
      });
    }

    request.session.set("authUser", {
      id: res.user.id,
      email: res.user.email,
    });

    return reply.code(200).send({
      success: true,
      user: res.user as unknown as UserEntity,
    });
  } catch (error) {
    return handleServerError(reply, error);
  }
};

export const logoutHandler = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    request.session.delete();
    return reply.code(200).send({
      success: true,
      message: "User logged out successfully.",
    });
  } catch (error) {
    return handleServerError(reply, error);
  }
};
