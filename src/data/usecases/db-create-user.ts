import {
  CreateUserParams,
  CreateUserReturns,
} from 'src/domain/types/user-params';
import { ICreateUserUseCase } from 'src/domain/usecases/create-user';
import { ICodeTemporary } from '../protocols/code-temporary';
import { IHash } from '../protocols/hash';
import { IMail } from '../protocols/mail';
import { IUserRepository } from '../repositories/user-repository';

export class DbCreateUserUseCase implements ICreateUserUseCase {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly hashService: IHash,
    private readonly mailService: IMail,
    private readonly codeTemporaryService: ICodeTemporary,
  ) {}

  async execute(params: CreateUserParams): Promise<CreateUserReturns> {
    const emailAlreadyExists = await this.userRepository.findUserByEmail(
      params.email,
    );

    if (emailAlreadyExists) {
      throw new Error('Email already exists');
    }

    const hashedPassword = await this.hashService.generateHash(params.password);

    const accountVerificationCode =
      await this.codeTemporaryService.generateCode();
    const accountVerificationCodeExpiresAt = new Date();

    accountVerificationCodeExpiresAt.setMinutes(
      accountVerificationCodeExpiresAt.getMinutes() + 3,
    );

    const user = await this.userRepository.createUser({
      ...params,
      password: hashedPassword,
      accountVerificationCode,
      accountVerificationCodeExpiresAt,
    });

    await this.mailService.sendEmail({
      to: params.userName,
      subject: 'Confirm your account',
      body: {
        template: 'confirm-account',
      },
    });

    return {
      user,
    };
  }
}
