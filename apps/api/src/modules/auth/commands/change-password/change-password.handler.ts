import { ICommandBus } from "@/core/cqrs/bus.types";
import { authActionCreator } from "../..";
import { changePasswordRequestDto } from "./change-password.schema";
import BcryptPasswordService from "../../services/password.service";
import { IncorrectPasswordError } from "../../domain/auth.error";
import { UserNotFoundError } from "@/modules/user/domain/user.error";
import { UserRepositoryPort } from "@/modules/user/database/user.repository.port";

export type ChangePasswordCommandResult = Promise<boolean>;
export const changePasswordCommand =
  authActionCreator.actionCreator<changePasswordRequestDto>("change-password");

class ChangePasswordHandler {
  private readonly commandBus: ICommandBus;
  private readonly passwordService: BcryptPasswordService;
  private readonly userRepository: UserRepositoryPort;

  constructor({ commandBus, passwordService, userRepository }) {
    this.commandBus = commandBus;
    this.passwordService = passwordService;
    this.userRepository = userRepository;
  }

  async handler({ payload }: ReturnType<typeof changePasswordCommand>) {
    const { email, oldPassword, newPassword } = payload;
    const user = await this.userRepository.findOneByEmail(email);
    if (!user) {
      throw new UserNotFoundError();
    }

    const verified = await this.passwordService.compare(
      oldPassword,
      user.passwordHash,
    );
    if (!verified) {
      throw new IncorrectPasswordError();
    } else {
      const res = await this.passwordService.update(email, newPassword);
      return res;
    }
  }

  init() {
    this.commandBus.register(
      changePasswordCommand.type,
      this.handler.bind(this),
    );
  }
}

export default ChangePasswordHandler;
