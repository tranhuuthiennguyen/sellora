import { FastifyReply, FastifyRequest } from "fastify";
import { handleServerError } from "@helpers/errors.helper";
import {
  checkUserExists,
  createUser,
  getUserById,
} from "@modules/users/users.service";
import { compareHash, genSalt } from "@utils/auth";
import {
  FastifyReplyTypeBox,
  FastifyRequestTypeBox,
} from "@/schemas/common.schema";
import { CreateUserSchema } from "@modules/users/users.schema";
import { LoginSchema } from "@modules/auth/auth.schema";
import {
  generateAccessToken,
  generateRefreshToken,
} from "@modules/auth/auth.service";
import { CreateUserDto, UserEntity } from "@sellora/shared/user";
import { ERRORS } from "@sellora/shared/lib";
import { LoginInputDto } from "@sellora/shared/auth";

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

    //////////////////////////////////////////////////
    ////// Issue access token and refresh token //////
    //////////////////////////////////////////////////
    const accessToken = await generateAccessToken(reply, res.user);

    const refreshToken = await generateRefreshToken(reply, res.user);

    return reply
      .setCookie("refreshToken", refreshToken, {
        // domain: 'http://localhost:5000',
        path: "/api",
        secure: true,
        httpOnly: true,
        sameSite: "lax",
      })
      .code(200)
      .send({
        success: true,
        accessToken,
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
    return reply.code(200).send({
      success: true,
      message: "User logged out successfully.",
    });
  } catch (error) {
    return handleServerError(reply, error);
  }
};

export const refreshTokenHandler = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    const refreshToken = request.cookies.refreshToken;

    if (!refreshToken)
      return reply.code(401).send({
        success: false,
        message: "Missing refresh token",
      });

    let payload: any;

    try {
      payload = await request.server.jwt.verify(refreshToken, {
        onlyCookie: true,
      });
    } catch (error: any) {
      return reply.code(401).send({
        success: false,
        message: `Invalid refresh token: ${error.message}`,
      });
    }

    const newAccessToken = await generateAccessToken(reply, payload);

    return reply.code(200).send({
      success: true,
      accessToken: newAccessToken,
    });
  } catch (error) {
    return handleServerError(reply, error);
  }
};

export const restoreSessionHandler = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    const userId = request.currentUser.id;
    const user = await getUserById(request.server.db, userId);

    if (!user) {
      return reply.code(401).send({
        success: false,
        message: ERRORS.unauthorizedAccess.message,
      });
    }

    return reply.code(200).send({
      success: true,
      user,
    });
  } catch (error) {
    return handleServerError(reply, error);
  }
};
