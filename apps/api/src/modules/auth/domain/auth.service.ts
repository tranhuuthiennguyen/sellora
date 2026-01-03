import { UserRepositoryPort } from "@/modules/user/database/user.repository.port";
import { PasswordServicePort } from "../infrastructure/password.service";
import { TokenServicePort } from "../infrastructure/jwt.token.service";

class AuthService {
  private readonly userRepository: UserRepositoryPort;
  private readonly passwordService: PasswordServicePort;
  private readonly jwtTokenServive: TokenServicePort;

  constructor({ userRepository, passwordService, jwtTokenService }) {
    this.userRepository = userRepository;
    this.passwordService = passwordService;
    this.jwtTokenServive = jwtTokenService;
  }

  async register() {}

  async login() {}
}

export default AuthService;
