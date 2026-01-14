import { UserEntity } from "@/modules/user/domain/user.entity";
import {
  accessTokenSigner,
  refreshTokenSigner,
  verifier,
} from "@/core/utils/jwt.util";

export interface TokenServicePort {
  generateAccessToken(user: UserEntity): Promise<string>;
  generateRefreshToken(user: UserEntity): Promise<string>;
  verify(token: string): Promise<any>;
}

class JwtTokenService implements TokenServicePort {
  async verify(token: string): Promise<any> {
    return await verifier(token);
  }

  async generateAccessToken(user: UserEntity): Promise<string> {
    return await accessTokenSigner({
      sub: user.email,
    });
  }

  async generateRefreshToken(user: UserEntity): Promise<string> {
    return await refreshTokenSigner({
      tokenVersion: user.tokenVersion,
      sub: user.email,
    });
  }
}

export default JwtTokenService;
