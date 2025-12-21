import { FastifyReply, FastifyRequest } from "fastify";
import { handleServerError } from "@helpers/errors.helper";
import {
  checkUserExists,
  createUser,
  generateUniqueUsername,
  getUserById,
} from "@modules/users/users.service";
import { compareHash, genSalt } from "@utils/auth";
import {
  FastifyReplyTypeBox,
  FastifyRequestTypeBox,
} from "@/schemas/common.schema";
import { CreateUserSchema } from "@modules/users/users.schema";
import { ChangePasswordSchema, LoginSchema } from "@modules/auth/auth.schema";
import {
  generateAccessToken,
  generateRefreshToken,
  updatePassword,
  verifyPassword,
} from "@modules/auth/auth.service";
import { CreateUserDto, UserEntity } from "@sellora/shared/user";
import { ERRORS } from "@sellora/shared/lib";
import { ChangePasswordDto, LoginInputDto } from "@sellora/shared/auth";
import { EnvSchema } from "@/utils/validateEnv";
import { HASH_SALT, STANDARD } from "@/constants";

export const registerHandler = async (
  request: FastifyRequestTypeBox<typeof CreateUserSchema>,
  reply: FastifyReplyTypeBox<typeof CreateUserSchema>,
) => {
  try {
    const { email, password } = request.body as CreateUserDto;

    const user = await checkUserExists(request.server.db, { email });
    if (user) {
      return reply.code(409).send({
        success: false,
        message: ERRORS.userExists.message,
      });
    }

    const hashPwd = await genSalt(HASH_SALT, password);

    const username = await generateUniqueUsername(request.server.db, email);

    const payload = {
      email: email,
      passwordHash: hashPwd,
      username: username,
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

    const { NODE_ENV } = request.getEnvs<typeof EnvSchema>();

    return reply
      .setCookie("refreshToken", refreshToken, {
        // domain: 'http://localhost:3000',
        path: "/",
        secure: true,
        httpOnly: true,
        sameSite: "none",
        maxAge: 60 * 60 * 24 * 30,
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
    reply.clearCookie("refreshToken", {
      path: "/",
      secure: true,
      httpOnly: true,
      sameSite: "none",
    });
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
    const refreshToken = request.cookies.refreshToken;

    const decoded: any = await request.server.jwt.decode(refreshToken!);

    const user = await getUserById(request.server.db, decoded.id);

    return reply.code(200).send({
      success: true,
      user,
    });
  } catch (error) {
    return handleServerError(reply, error);
  }
};

export const changePasswordHandler = async (
  request: FastifyRequestTypeBox<typeof ChangePasswordSchema>,
  reply: FastifyReplyTypeBox<typeof ChangePasswordSchema>,
) => {
  try {
    const { oldPassword, newPassword } = request.body as ChangePasswordDto;
    const userId = request.currentUser.id as number;

    const res = await verifyPassword(request.server.db, userId, oldPassword);

    if (res === null) {
      return reply.code(404).send({
        success: false,
        message: ERRORS.userNotExists.message,
      });
    }

    if (res === false) {
      // incorrect
      return reply.code(400).send({
        success: false,
        message: "Incorrect Password",
      });
    } else {
      // ==== correct old password prompt -> save new valid password
      const res = await updatePassword(request.server.db, userId, newPassword);

      return reply.code(200).send({
        success: true,
        message: STANDARD.OK,
      });
    }
  } catch (error) {
    return handleServerError(reply, error);
  }
};
