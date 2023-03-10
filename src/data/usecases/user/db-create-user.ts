import { BusinessError } from '@domain/errors/business-error';
import { Inject } from '@nestjs/common';
import { CreateUserParams, CreateUserReturns } from '@domain/types/user-params';
import { ICreateUserUseCase } from '@domain/usecases/user/create-user';
import {
  CODE_TEMPORARY_SERVICE,
  HASH_SERVICE,
  MAIL_SERVICE,
  USER_REPOSITORY,
} from '@infra/modules/user/user.providers';
import { ICodeTemporary } from '@data/protocols/code-temporary';
import { IHash } from '@data/protocols/hash';
import { IMail } from '@data/protocols/mail';
import { IUserRepository } from '@data/repositories/user-repository';

export class DbCreateUserUseCase implements ICreateUserUseCase {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: IUserRepository,
    @Inject(HASH_SERVICE)
    private readonly hashService: IHash,
    @Inject(MAIL_SERVICE)
    private readonly mailService: IMail,
    @Inject(CODE_TEMPORARY_SERVICE)
    private readonly codeTemporaryService: ICodeTemporary,
  ) {}

  async execute(params: CreateUserParams): Promise<CreateUserReturns> {
    const emailAlreadyExists = await this.userRepository.findUserByEmail(
      params.email,
    );

    if (emailAlreadyExists) {
      throw new BusinessError('Email already exists');
    }

    const usernameAlreadyExists = await this.userRepository.findUserByUserName(
      params.username,
    );

    if (usernameAlreadyExists) {
      throw new BusinessError('Username already exists');
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

    const userWithoutPassword = Object.assign({}, user, {
      password: undefined,
    });

    await this.mailService.sendEmail({
      to: params.email,
      subject: 'Confirm your account',
      body: {
        template: 'confirm-account',
        code: user.accountVerificationCode,
      },
    });

    return {
      user: userWithoutPassword,
    };
  }
}
