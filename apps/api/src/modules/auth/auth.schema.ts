import { Type } from "@sinclair/typebox";
import { FastifySchema } from "fastify";
import { CreateUserBody, UserSchema } from "../users/users.schema";
import { BaseResponseSchema } from "@schemas/common.schema";

export const LoginSchema: FastifySchema = {
  body: CreateUserBody,
  response: {
    200: Type.Intersect([
      BaseResponseSchema,
      Type.Object({
        data: UserSchema,
      }),
    ]),
    401: BaseResponseSchema,
    404: BaseResponseSchema,
  },
};
