import { ICodeTemporary } from '@data/protocols/code-temporary';
import { IMail } from '@data/protocols/mail';
import { IUserRepository } from '@data/repositories/user-repository';
import { BusinessError } from '@domain/errors/business-error';
import { ICreateTokenResetPasswordUseCase } from '@domain/usecases/auth/create-token-reset-password';
import {
  CODE_TEMPORARY_SERVICE,
  MAIL_SERVICE,
  USER_REPOSITORY,
} from '@infra/modules/user/user.providers';
import { Inject } from '@nestjs/common';

export class DbCreateTokenResetPasswordUseCase
  implements ICreateTokenResetPasswordUseCase
{
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: IUserRepository,
    @Inject(CODE_TEMPORARY_SERVICE)
    private readonly codeTemporary: ICodeTemporary,
    @Inject(MAIL_SERVICE)
    private readonly mailService: IMail,
  ) {}

  async execute(email: string): Promise<void> {
    const user = await this.userRepository.findUserByEmail(email);

    if (!user) {
      throw new BusinessError('User is not found', 404);
    }

    const passwordResetCode = await this.codeTemporary.generateCode();
    const passwordResetCodeExpiresAt = new Date();

    passwordResetCodeExpiresAt.setMinutes(
      passwordResetCodeExpiresAt.getMinutes() + 3,
    );

    await this.userRepository.updateUser(user.id, {
      passwordResetCode,
      passwordResetCodeExpiresAt,
    });

    await this.mailService.sendEmail({
      to: user.email,
      subject: 'Reset your password',
      body: {
        template: 'forgot-password',
        code: passwordResetCode,
      },
    });
  }
}
