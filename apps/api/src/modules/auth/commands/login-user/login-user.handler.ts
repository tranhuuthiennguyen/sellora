import { UserRepositoryPort } from "@/modules/user/database/user.repository.port";
import { authActionCreator } from "../..";
import { LoginUserRequestDto } from "./login-user.schema";
import { ICommandBus } from "@/core/cqrs/bus.types";
import { TokenServicePort } from "../../services/jwt.token.service";
import { UserNotFoundError } from "@/modules/user/domain/user.error";
import { UserEntity } from "@/modules/user/domain/user.entity";
import { InvalidCredentialsErrorException } from "@/core/exceptions";
import { compare } from "@/core/utils/password.util";

export type LoginUserCommandResult = Promise<{
  accessToken: string;
  refreshToken: string;
  user: UserEntity;
}>;

export const loginUserCommand =
  authActionCreator.actionCreator<LoginUserRequestDto>("login");
export const loginUserEvent =
  authActionCreator.actionCreator<LoginUserRequestDto>("login");

class LoginUserHandler {
  private readonly userRepository: UserRepositoryPort;
  private readonly jwtTokenService: TokenServicePort;
  private readonly commandBus: ICommandBus;
  private readonly logger: any;

  constructor({ userRepository, jwtTokenService, commandBus, logger }) {
    this.userRepository = userRepository;
    this.jwtTokenService = jwtTokenService;
    this.commandBus = commandBus;
    this.logger = logger;
  }

  async handler({
    payload,
  }: ReturnType<typeof loginUserCommand>): LoginUserCommandResult {
    const { email, password } = payload;
    const user = await this.userRepository.findOneByEmail(email);
    if (!user) {
      throw new UserNotFoundError();
    }
    if (!user.passwordHash) {
      throw new InvalidCredentialsErrorException(
        "Password associate with this email hasn't been setup",
      );
    }
    const isPasswordValid = await compare(password, user.passwordHash);
    if (!isPasswordValid) {
      throw new InvalidCredentialsErrorException("Incorrect password");
    }
    const accessToken = await this.jwtTokenService.generateAccessToken(user);
    const refreshToken = await this.jwtTokenService.generateRefreshToken(user);
    this.logger.info(`LoginUserHandler(): access token signed`);
    this.logger.info(`LoginUserHandler(): refresh token signed`);
    return {
      accessToken,
      refreshToken,
      user,
    };
  }

  init() {
    this.commandBus.register(loginUserCommand.type, this.handler.bind(this));
  }
}

export default LoginUserHandler;
