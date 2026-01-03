import { UserRepositoryPort } from "@/modules/user/database/user.repository.port";
import { authActionCreator } from "../..";
import { LoginUserRequestDto } from "./login-user.schema";
import { ICommandBus, IEventBus } from "@/core/cqrs/bus.types";
import { InvalidCredentialsError, NotFoundException } from "@/core/exceptions";
import { PasswordServicePort } from "../../infrastructure/password.service";
import { TokenServicePort } from "../../infrastructure/jwt.token.service";
import { UserEntity } from "@/modules/user/domain/user.entity";

export type LoginUserCommandResult = Promise<{
  accessToken: string;
  user: UserEntity;
}>;

export const loginUserCommand =
  authActionCreator.actionCreator<LoginUserRequestDto>("login");
export const loginUserEvent =
  authActionCreator.actionCreator<LoginUserRequestDto>("login");

class LoginUserHandler {
  private readonly userRepository: UserRepositoryPort;
  private readonly passwordService: PasswordServicePort;
  private readonly jwtTokenService: TokenServicePort;
  private readonly commandBus: ICommandBus;
  private readonly eventBus: IEventBus;

  constructor({
    userRepository,
    passwordService,
    jwtTokenService,
    commandBus,
    eventBus,
  }) {
    this.userRepository = userRepository;
    this.passwordService = passwordService;
    this.jwtTokenService = jwtTokenService;
    this.commandBus = commandBus;
    this.eventBus = eventBus;
  }

  async handler({
    payload,
  }: ReturnType<typeof loginUserCommand>): LoginUserCommandResult {
    const { email, password } = payload;
    const user = await this.userRepository.findOneByEmail(email);
    if (!user) {
      throw new NotFoundException("User with this email doesn't exist");
    }
    if (!user.passwordHash) {
      throw new InvalidCredentialsError(
        "Password associate with this email hasn't been setup",
      );
    }
    const isPasswordValid = await this.passwordService.compare(
      password,
      user.passwordHash,
    );
    if (!isPasswordValid) {
      throw new InvalidCredentialsError("Incorrect password");
    }
    const accessToken = await this.jwtTokenService.generateAccessToken(user);
    // this.eventBus.emit(loginUserEvent(payload))

    return {
      accessToken,
      user,
    };
  }

  init() {
    this.commandBus.register(loginUserCommand.type, this.handler.bind(this));
  }
}

export default LoginUserHandler;
