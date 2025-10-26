import { ERRORS, handleServerError } from "@helpers/errors.helper";
import { FastifyReply, FastifyRequest } from "fastify";
import { CreateUser } from "../users/users.interface";
import { checkEmailExists } from "../users/users.service";
import { compareHash } from "@utils/auth";
import { STANDARD } from "@/constants";

export const registerHandler = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
  } catch (error) {
    return handleServerError(reply, error);
  }
};

export const loginHandler = async (
  request: FastifyRequest<{
    Body: CreateUser;
  }>,
  reply: FastifyReply,
) => {
  try {
    const { email, password } = request.body as {
      email: string;
      password: string;
    };
    const user = await checkEmailExists(request.server.db, email);
    if (!user) {
      request.log.error(`User with email ${email} doesn't exist.`);
      return reply.code(ERRORS.userNotExists.statusCode).send({
        success: false,
        message: ERRORS.userNotExists.message,
      });
    }

    const checkPassword = await compareHash(password, user.passwordHash);

    if (!checkPassword) {
      request.log.error(`Wrong password for email ${email}`);
      return reply.code(ERRORS.userCredError.statusCode).send({
        success: false,
        message: ERRORS.userCredError.message,
      });
    }

    request.session.set("authUser", {
      id: user.id,
      email: user.email,
      role: user.role,
    });

    return reply.code(STANDARD.OK.statusCode).send({
      success: true,
      message: "USER_LOGIN_SUCCESSFULLY",
      data: user,
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
  } catch (error) {
    return handleServerError(reply, error);
  }
};
