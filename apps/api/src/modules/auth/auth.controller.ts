import { FastifyReply, FastifyRequest } from "fastify";
import { ERRORS, handleServerError } from "@helpers/errors.helper";
import { CreateUser } from "@modules/users/users.interface";
import { checkUserExists, createUser } from "@modules/users/users.service";
import { compareHash, genSalt } from "@utils/auth";
import { STANDARD } from "@/constants";
import { sendError, sendSuccess } from "@utils/response";

export const registerHandler = async (
  request: FastifyRequest<{
    Body: CreateUser;
  }>,
  reply: FastifyReply,
) => {
  const { email, password, username, currencyType } = request.body;
  if (!email || !password || !username || !currencyType) {
    return reply.code(400).send({
      message: "Email, password, username and currency type must be provided.",
    });
  }
  try {
    const user = await checkUserExists(request.server.db, { email });
    if (user) {
      return sendError(reply, {
        statusCode: ERRORS.userExists.statusCode,
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
    const createdUser = await createUser(request.server.db, payload);

    if (!createdUser) {
      return sendError(reply, {
        statusCode: ERRORS.internalServerError.statusCode,
        message: ERRORS.internalServerError.message,
      });
    }

    request.session.set("authUser", {
      id: createdUser.id,
      email: createdUser.email,
    });

    return sendSuccess(reply, {
      statusCode: STANDARD.CREATE.statusCode,
      message: STANDARD.CREATE.message,
      data: createdUser,
    });
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
    const user = await checkUserExists(request.server.db, { email });
    if (!user) {
      request.log.error(`User with email ${email} doesn't exist.`);
      return sendError(reply, {
        statusCode: ERRORS.userNotExists.statusCode,
        message: ERRORS.userNotExists.message,
      });
    }

    const checkPassword = await compareHash(password, user.passwordHash);

    if (!checkPassword) {
      request.log.error(`Wrong password for email ${email}`);
      return sendError(reply, {
        statusCode: ERRORS.userCredError.statusCode,
        message: ERRORS.userCredError.message,
      });
    }

    request.session.set("authUser", {
      id: user.id,
      email: user.email,
    });

    return sendSuccess(reply, {
      statusCode: STANDARD.OK.statusCode,
      message: "USER_LOGGED_IN",
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
    request.session.delete();
    request.log.debug("User has logged out.");
    return sendSuccess(reply, {
      statusCode: STANDARD.OK.statusCode,
      message: "USER_LOGOUT_SUCCESSFULLY",
    });
  } catch (error) {
    return handleServerError(reply, error);
  }
};
