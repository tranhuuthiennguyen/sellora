export { validateSchema } from "./validation/validateSchema";
export { IsEmail } from "./validation/format";
export { BaseResponseSchema } from "./lib/common.schema";

export { LoginInputSchema, LoginResponseSchema } from "./auth/auth.schema";
export type { LoginInputDto } from "./auth/auth.dto";

export {
  UserSchema,
  GetUserByIdResponseSchema,
  GetAllUsersResponseSchema,
  CreateUserInputSchema,
  CreateUserResponseSchema,
  UpdateUserInputSchema,
  UpdateUserResponseSchema,
  DeleteUserResponseSchema,
} from "./users/user.schema";
export type { CreateUserDto, UpdateUserDto } from "./users/user.dto";
export type { UserEntity } from "./users/user.entity";

export {
  SetErrorFunction,
  DefaultErrorFunction,
} from "@sinclair/typebox/errors";

export type { ApiSuccessResponse, ApiErrorResponse } from "./http/response";
