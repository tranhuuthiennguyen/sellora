import { ActionCreatorFactory } from "@/core/cqrs/action-creator";
import UserMapper from "./user.mapper";
import { UserRepositoryPort } from "./database/user.repository.port";

declare global {
  export interface Dependencies {
    userMapper: UserMapper;
    userRepository: UserRepositoryPort;
  }
}

export const userActionCreator = new ActionCreatorFactory("user");
