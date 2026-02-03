import { UserEntity } from "@/modules/user/domain/user.entity";
import {
  accessTokenSigner,
  refreshTokenSigner,
  verifier,
} from "@/core/utils/jwt.util";
import { v4 as uuidv4 } from "uuid";
import { CacheServicePort } from "@/core/cache/cache-service.port";

export interface JwtPayload {
  jti: string;
  sub: string;
  email: string;
  userId: string;
  tokenVersion: number;
  isEnabled: boolean;
  isDeleted: boolean;
  iat: number;
  exp: number;
  iss: string;
  aud: string;
}

export interface TokenServicePort {
  generateAccessToken(user: UserEntity): Promise<string>;
  generateRefreshToken(user: UserEntity): Promise<string>;
  verify(token: string): Promise<JwtPayload>;
  decode(token: string): JwtPayload;
  revokeToken(token: string): Promise<void>;
  revokeAllUserTokens(userId: string): Promise<void>;
  isRevoked(jti: string): Promise<boolean>;
}

class JwtTokenService implements TokenServicePort {
  private readonly _cacheService: CacheServicePort;

  constructor({ cacheService }) {
    this._cacheService = cacheService;
  }

  decode(token: string): JwtPayload {
    try {
      const decoded = verifier(token) as JwtPayload;
      return decoded;
    } catch (error) {
      throw new Error("Invalid token format");
    }
  }

  async verify(token: string): Promise<JwtPayload> {
    try {
      const payload = (await verifier(token)) as JwtPayload;

      if (this._cacheService) {
        const isBlacklisted = await this._cacheService.get(
          `blacklist:token:${payload.jti}`,
        );

        if (isBlacklisted) {
          throw new Error("Token has been revoked");
        }

        const currentVersion =
          (await this._cacheService.get(
            `user:${payload.userId}:token_version`,
          )) || 1;

        if (payload.tokenVersion !== currentVersion) {
          throw new Error("Token has been invalidated");
        }
      }

      return payload;
    } catch (error: any) {
      if (error.code === "FAST_JWT_EXPIRED") {
        throw new Error("Token expired");
      }
      if (error.code === "FAST_JWT_INVALID_SIGNATURE") {
        throw new Error("Invalid token signature");
      }
      if (error.code === "FAST_JWT_MALFORMED") {
        throw new Error("Malformed token");
      }
      throw error;
    }
  }

  async generateAccessToken(user: UserEntity): Promise<string> {
    const payload = {
      jti: uuidv4(),
      sub: user.id,
      email: user.email,
      userId: user.id,
      tokenVersion: user.tokenVersion,
      isEnabled: user.isEnabled,
      isDeleted: user.isDeleted,
    };

    return await accessTokenSigner(payload);
  }

  async generateRefreshToken(user: UserEntity): Promise<string> {
    return await refreshTokenSigner({
      jti: uuidv4(),
      sub: user.id,
      email: user.email,
      userId: user.id,
      tokenVersion: user.tokenVersion,
    });
  }

  async revokeToken(token: string): Promise<void> {
    try {
      const payload = this.decode(token);

      const now = Math.floor(Date.now() / 1000);
      const ttl = payload.exp - now;

      if (ttl > 0) {
        await this._cacheService.set(
          `blacklist:token:${payload.jti}`,
          "revoked",
          ttl,
        );
      }
    } catch (error) {
      // Token already invalid no need to blacklist
    }
  }

  async revokeAllUserTokens(userId: string): Promise<void> {
    await this._cacheService.increment(`user:${userId}:token_version`);
    await this._cacheService.del(`user:${userId}`);
  }

  async isRevoked(jti: string): Promise<boolean> {
    const revoked = await this._cacheService.get(`blacklist:token:${jti}`);
    return !!revoked;
  }
}

export default JwtTokenService;
