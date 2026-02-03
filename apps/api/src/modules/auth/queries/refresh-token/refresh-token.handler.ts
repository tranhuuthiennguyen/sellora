import { UserRepositoryPort } from "@/modules/user/database/user.repository.port";
import { authActionCreator } from "../..";
import { TokenServicePort } from "../../services/jwt.token.service";
import { UserNotFoundError } from "@/modules/user/domain/user.error";
import { InvalidCredentialsErrorException } from "@/core/exceptions";

export type RefreshTokenQueryResult = Promise<{
  accessToken: string;
  refreshToken: string;
}>;
export const refreshTokenQuery =
  authActionCreator.actionCreator<string>("refresh-token");

class RefreshTokenHandler {
  private readonly queryBus: any;
  private readonly jwtTokenService: TokenServicePort;
  private readonly userRepository: UserRepositoryPort;

  constructor({ queryBus, jwtTokenService, userRepository }) {
    this.queryBus = queryBus;
    this.jwtTokenService = jwtTokenService;
    this.userRepository = userRepository;
  }

  async handler({
    payload,
  }: ReturnType<typeof refreshTokenQuery>): RefreshTokenQueryResult {
    try {
      const decoded = await this.jwtTokenService.verify(payload);

      const user = await this.userRepository.findOneByEmail(decoded.email);

      if (!user) throw new UserNotFoundError();

      const accessToken = await this.jwtTokenService.generateAccessToken(user);
      const newRefresh = await this.jwtTokenService.generateRefreshToken(user);

      return {
        accessToken,
        refreshToken: newRefresh,
      };
    } catch (error: any) {
      throw new InvalidCredentialsErrorException(error.message);
    }
  }

  init() {
    this.queryBus.register(refreshTokenQuery.type, this.handler.bind(this));
  }
}

export default RefreshTokenHandler;
