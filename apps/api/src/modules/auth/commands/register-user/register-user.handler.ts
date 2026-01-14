import { ICommandBus } from "@/core/cqrs/bus.types";
import { authActionCreator } from "../..";
import { registerUserRequestDto } from "./register-user.schema";
import { UserRepositoryPort } from "@/modules/user/database/user.repository.port";
import { ConflictException } from "@/core/exceptions";
import { PasswordServicePort } from "../../services/password.service";
import UsernameService from "../../services/username.service";
import { UserEntity } from "@/modules/user/domain/user.entity";
import { UserAlreadyExistsError } from "@/modules/user/domain/user.error";

export type RegisterUserCommandResult = Promise<string>;
export const registerUserCommand =
  authActionCreator.actionCreator<registerUserRequestDto>("register");

class RegisterUserHandler {
  private readonly userRepository: UserRepositoryPort;
  private readonly passwordService: PasswordServicePort;
  private readonly usernameService: UsernameService;
  private readonly commandBus: ICommandBus;

  constructor({
    userRepository,
    commandBus,
    usernameService,
    passwordService,
  }) {
    this.userRepository = userRepository;
    this.passwordService = passwordService;
    this.usernameService = usernameService;
    this.commandBus = commandBus;
  }

  async handler({ payload }: ReturnType<typeof registerUserCommand>) {
    const { email, password } = payload;
    const passwordHashed = await this.passwordService.hash(password);
    const username = await this.usernameService.generateUniqueUsername(email);
    const newUser = UserEntity.createNew({
      email,
      passwordHash: passwordHashed,
      username,
    });
    try {
      await this.userRepository.insert(newUser);
      return newUser.id;
    } catch (error: any) {
      if (error instanceof ConflictException) {
        throw new UserAlreadyExistsError(error);
      }
      throw error;
    }
  }

  init() {
    this.commandBus.register(registerUserCommand.type, this.handler.bind(this));
  }
}

export default RegisterUserHandler;
