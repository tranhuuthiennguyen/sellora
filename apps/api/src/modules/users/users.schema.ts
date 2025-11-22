import { FastifySchema } from "fastify";
import {
  CreateUserInputSchema,
  CreateUserResponseSchema,
  DeleteUserResponseSchema,
  GetAllUsersResponseSchema,
  GetUserByIdResponseSchema,
  UpdateUserInputSchema,
  UpdateUserResponseSchema,
} from "@sellora/shared";
import { Type } from "@fastify/type-provider-typebox";

export const GetUserByIdSchema: FastifySchema = {
  params: {
    userId: Type.Number(),
  },
  response: GetUserByIdResponseSchema,
};

export const GetAllUsersSchema: FastifySchema = {
  response: GetAllUsersResponseSchema,
};

export const CreateUserSchema = {
  body: CreateUserInputSchema,
  response: CreateUserResponseSchema,
};

export const UpdateUserSchema: FastifySchema = {
  params: {
    userId: Type.Number(),
  },
  body: UpdateUserInputSchema,
  response: UpdateUserResponseSchema,
};

export const DeleteUserSchema: FastifySchema = {
  params: {
    userId: Type.Number(),
  },
  response: DeleteUserResponseSchema,
};
