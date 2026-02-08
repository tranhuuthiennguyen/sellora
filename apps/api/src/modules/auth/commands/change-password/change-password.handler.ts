import { ICommandBus } from "@/core/cqrs/bus.types";
import { authActionCreator } from "../..";
import { changePasswordRequestDto } from "./change-password.schema";
import { UserNotFoundError } from "@/modules/user/domain/user.error";
import { UserRepositoryPort } from "@/modules/user/database/user.repository.port";
import { InvalidCredentialsErrorException } from "@/core/exceptions";

export type ChangePasswordCommandResult = Promise<boolean>;
export const changePasswordCommand =
  authActionCreator.actionCreator<changePasswordRequestDto>("change-password");

class ChangePasswordHandler {
  private readonly commandBus: ICommandBus;
  private readonly userRepository: UserRepositoryPort;

  constructor({ commandBus, userRepository }) {
    this.commandBus = commandBus;
    this.userRepository = userRepository;
  }

  async handler({ payload }: ReturnType<typeof changePasswordCommand>) {
    const { email, oldPassword, newPassword } = payload;
    const user = await this.userRepository.findOneByEmail(email);
    if (!user) {
      throw new UserNotFoundError();
    }

    const verified = await user.comparePassword(oldPassword);
    if (!verified) {
      throw new InvalidCredentialsErrorException("Password incorrect");
    }
    await user.changePassword(newPassword);
    return await this.userRepository.updateOne(user);
  }

  init() {
    this.commandBus.register(
      changePasswordCommand.type,
      this.handler.bind(this),
    );
  }
}

export default ChangePasswordHandler;
