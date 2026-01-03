import { ActionCreatorFactory } from "@/core/cqrs/action-creator";
import AuthService from "./domain/auth.service";
import { PasswordServicePort } from "./infrastructure/password.service";
import { TokenServicePort } from "./infrastructure/jwt.token.service";
import { UserRepositoryPort } from "../user/database/user.repository.port";

declare global {
  export interface Dependencies {
    userRepository: UserRepositoryPort;
    authService: AuthService;
    passwordService: PasswordServicePort;
    jwtService: TokenServicePort;
  }
}

export const authActionCreator = new ActionCreatorFactory("auth");
