import { UserRepositoryPort } from "@/modules/user/database/user.repository.port";
import { PasswordServicePort } from "../services/password.service";
import { TokenServicePort } from "../services/jwt.token.service";

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
