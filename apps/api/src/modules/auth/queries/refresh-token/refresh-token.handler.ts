import { UserRepositoryPort } from "@/modules/user/database/user.repository.port";
import { authActionCreator } from "../..";
import { TokenServicePort } from "../../services/jwt.token.service";
import { UserNotFoundError } from "@/modules/user/domain/user.error";
import { InvalidCredentialsErrorException } from "@/core/exceptions";
import { CacheServicePort } from "@/core/cache/cache-service.port";
import UserMapper from "@/modules/user/user.mapper";

export type RefreshTokenQueryResult = Promise<{
  accessToken: string;
  refreshToken: string;
}>;
export const refreshTokenQuery = authActionCreator.actionCreator<{
  refreshToken: string;
}>("refresh-token");

class RefreshTokenHandler {
  private readonly _queryBus: any;
  private readonly _jwtTokenService: TokenServicePort;
  private readonly _userRepository: UserRepositoryPort;
  private readonly _logger: Dependencies["logger"];
  private readonly _cacheService: CacheServicePort;
  private readonly _userMapper: UserMapper;

  constructor({
    queryBus,
    jwtTokenService,
    userRepository,
    logger,
    cacheService,
    userMapper,
  }) {
    this._queryBus = queryBus;
    this._jwtTokenService = jwtTokenService;
    this._userRepository = userRepository;
    this._logger = logger;
    this._cacheService = cacheService;
    this._userMapper = userMapper;
  }

  async handler({
    payload,
  }: ReturnType<typeof refreshTokenQuery>): RefreshTokenQueryResult {
    try {
      const decoded = await this._jwtTokenService.verify(payload.refreshToken);

      this._logger.info(
        `Refresh token request ${JSON.stringify({
          userId: decoded.userId,
          tokenVersion: decoded.tokenVersion,
        })}`,
      );

      const user = await this._userRepository.findOneById(decoded.userId);

      if (!user || user.isDeleted) {
        this._logger.warn(`Refresh token - user not found ${decoded.userId}`);
        throw new UserNotFoundError();
      }

      if (!user.isEnabled) {
        this._logger.warn(`Refresh token - account disabled ${user.id}`);
        throw new InvalidCredentialsErrorException("Account is disabled");
      }

      if (decoded.tokenVersion !== user.tokenVersion) {
        this._logger.warn(
          `Refresh token - version mismatch ${JSON.stringify({
            userId: user.id,
            tokenVersion: decoded.tokenVersion,
            currentVersion: user.tokenVersion,
          })}`,
        );
        throw new InvalidCredentialsErrorException(
          "Token has been invalidated",
        );
      }

      await this._jwtTokenService.revokeToken(payload.refreshToken);

      const accessToken = await this._jwtTokenService.generateAccessToken(user);
      const refreshToken =
        await this._jwtTokenService.generateRefreshToken(user);

      // update cache
      await this._cacheService.set(
        `user:${user.id}`,
        this._userMapper.toPersistence(user),
        900,
      );

      this._logger.info(`Tokens refreshed successfully ${user.id}`);

      return {
        accessToken,
        refreshToken,
      };
    } catch (error: any) {
      throw new InvalidCredentialsErrorException(error.message);
    }
  }

  init() {
    this._queryBus.register(refreshTokenQuery.type, this.handler.bind(this));
  }
}

export default RefreshTokenHandler;
