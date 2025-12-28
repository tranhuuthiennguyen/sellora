import { UserEntity } from "./domain/user.entity";
import UserRepository from "./database/user.repository";
import { ActionCreatorFactory } from "@/core/cqrs/action-creator";
import UserMapper from "./user.mapper";

declare global {
  export interface Dependencies {
    userMapper: UserMapper;
    userRepository: UserRepository;
    userEntity: typeof UserEntity;
  }
}

export const userActionCreator = new ActionCreatorFactory("user");
