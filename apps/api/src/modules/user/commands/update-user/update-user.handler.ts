import { ICommandBus } from "@/core/cqrs/bus.types";
import { userActionCreator } from "../..";
import { updateUserRequestDto } from "./update-user.schema";
import { UserRepositoryPort } from "../../database/user.repository.port";
import { UserNotFoundError } from "../../domain/user.error";

export type UpdateUserCommandResult = Promise<boolean>;
export const updateUserCommand = userActionCreator.actionCreator<
  { userId: string } & updateUserRequestDto
>("update-user");

class UpdateUserHandler {
  private readonly commandBus: ICommandBus;
  private readonly userRepository: UserRepositoryPort;

  constructor({ commandBus, userRepository }) {
    this.commandBus = commandBus;
    this.userRepository = userRepository;
  }

  async handler({ payload }: ReturnType<typeof updateUserCommand>) {
    const { userId, ...updates } = payload;
    const user = await this.userRepository.findOneById(userId);
    if (!user) {
      throw new UserNotFoundError();
    }
    await this.userRepository.updateOneById(userId, updates);
  }

  init() {
    this.commandBus.register(updateUserCommand.type, this.handler.bind(this));
  }
}

export default UpdateUserHandler;
