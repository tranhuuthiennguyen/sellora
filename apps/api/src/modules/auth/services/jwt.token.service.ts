import { UserEntity } from "@/modules/user/domain/user.entity";
import {
  accessTokenSigner,
  refreshTokenSigner,
  verifier,
} from "@/core/utils/jwt.util";
import { v4 as uuidv4 } from "uuid";

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
      jti: uuidv4(),
      sub: user.id,
      email: user.email,
    });
  }

  async generateRefreshToken(user: UserEntity): Promise<string> {
    return await refreshTokenSigner({
      jti: uuidv4(),
      sub: user.id,
      email: user.email,
      tokenVersion: user.tokenVersion,
    });
  }
}

export default JwtTokenService;
