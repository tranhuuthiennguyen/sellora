import { ActionCreatorFactory } from "@/core/cqrs/action-creator";
import { TokenServicePort } from "./services/jwt.token.service";
import { UserRepositoryPort } from "../user/database/user.repository.port";
import UsernameService from "./services/username.service";

declare global {
  export interface Dependencies {
    userRepository: UserRepositoryPort;
    jwtTokenService: TokenServicePort;
    usernameService: UsernameService;
  }
}

export const authActionCreator = new ActionCreatorFactory("auth");
