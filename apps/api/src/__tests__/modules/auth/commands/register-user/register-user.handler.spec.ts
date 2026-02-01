import RegisterUserHandler, {
  registerUserCommand,
} from "@/modules/auth/commands/register-user/register-user.handler";
import { UserRepositoryPort } from "@/modules/user/database/user.repository.port";
import { PasswordServicePort } from "@/modules/auth/services/password.service";
import UsernameService from "@/modules/auth/services/username.service";
import { ICommandBus } from "@/core/cqrs/bus.types";
import { UserEntity } from "@/modules/user/domain/user.entity";
import { UserAlreadyExistsError } from "@/modules/user/domain/user.error";
import { ConflictException } from "@/core/exceptions";

describe("RegisterUserHandler", () => {
  let userRepository: jest.Mocked<UserRepositoryPort>;
  let passwordService: jest.Mocked<PasswordServicePort>;
  let usernameService: jest.Mocked<UsernameService>;
  let commandBus: jest.Mocked<ICommandBus>;
  let handler: RegisterUserHandler;

  beforeEach(() => {
    userRepository = {
      insert: jest.fn(),
    } as unknown as jest.Mocked<UserRepositoryPort>;

    passwordService = {
      hash: jest.fn(),
    } as unknown as jest.Mocked<PasswordServicePort>;

    usernameService = {
      generateUniqueUsername: jest.fn(),
    } as unknown as jest.Mocked<UsernameService>;

    commandBus = {
      register: jest.fn(),
    } as unknown as jest.Mocked<ICommandBus>;

    handler = new RegisterUserHandler({
      userRepository,
      passwordService,
      usernameService,
      commandBus,
    });
  });

  it("should register a new user successfully", async () => {
    const email = "test@example.com";
    const password = "password123";
    const hashedPassword = "hashedPassword123";
    const username = "testuser";
    const userId = "user-id";

    passwordService.hash.mockResolvedValue(hashedPassword);
    usernameService.generateUniqueUsername.mockResolvedValue(username);
    userRepository.insert.mockImplementation(async (user) => {
      (user as UserEntity).id = userId;
    });

    const payload = { email, password };
    const command = registerUserCommand(payload);

    const result = await handler.handler(command);

    expect(passwordService.hash).toHaveBeenCalledWith(password);
    expect(usernameService.generateUniqueUsername).toHaveBeenCalledWith(email);
    expect(userRepository.insert).toHaveBeenCalledWith(
      expect.objectContaining({
        email,
        passwordHash: hashedPassword,
        username,
      }),
    );
    expect(result).toBe(userId);
  });

  it("should throw UserAlreadyExistsError if user already exists", async () => {
    const email = "test@example.com";
    const password = "password123";
    const hashedPassword = "hashedPassword123";
    const username = "testuser";

    passwordService.hash.mockResolvedValue(hashedPassword);
    usernameService.generateUniqueUsername.mockResolvedValue(username);
    userRepository.insert.mockRejectedValue(
      new ConflictException("User already exist"),
    );

    const payload = { email, password };
    const command = registerUserCommand(payload);

    await expect(handler.handler(command)).rejects.toThrow(
      UserAlreadyExistsError,
    );

    expect(passwordService.hash).toHaveBeenCalledWith(password);
    expect(usernameService.generateUniqueUsername).toHaveBeenCalledWith(email);
    expect(userRepository.insert).toHaveBeenCalled();
  });

  it("should throw an error if an unexpected exception occurs", async () => {
    const email = "test@example.com";
    const password = "password123";
    const hashedPassword = "hashedPassword123";
    const username = "testuser";

    passwordService.hash.mockResolvedValue(hashedPassword);
    usernameService.generateUniqueUsername.mockResolvedValue(username);
    userRepository.insert.mockRejectedValue(new Error("Unexpected error"));

    const payload = { email, password };
    const command = registerUserCommand(payload);

    await expect(handler.handler(command)).rejects.toThrow("Unexpected error");

    expect(passwordService.hash).toHaveBeenCalledWith(password);
    expect(usernameService.generateUniqueUsername).toHaveBeenCalledWith(email);
    expect(userRepository.insert).toHaveBeenCalled();
  });

  it("should register the handler with the command bus", () => {
    handler.init();
    expect(commandBus.register).toHaveBeenCalledWith(
      registerUserCommand.type,
      expect.any(Function),
    );
  });

  it("should hash the password using the password service", async () => {
    const password = "password123";
    const hashedPassword = "hashedPassword123";

    passwordService.hash.mockResolvedValue(hashedPassword);

    const result = await passwordService.hash(password);

    expect(passwordService.hash).toHaveBeenCalledWith(password);
    expect(result).toBe(hashedPassword);
  });

  it("should generate a unique username using the username service", async () => {
    const email = "test@example.com";
    const username = "testuser";

    usernameService.generateUniqueUsername.mockResolvedValue(username);

    const result = await usernameService.generateUniqueUsername(email);

    expect(usernameService.generateUniqueUsername).toHaveBeenCalledWith(email);
    expect(result).toBe(username);
  });
});
