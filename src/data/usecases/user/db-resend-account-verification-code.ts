import { ICodeTemporary } from '@data/protocols/code-temporary';
import { IMail } from '@data/protocols/mail';
import { IUserRepository } from '@data/repositories/user-repository';
import { RegistrationStep } from '@domain/entities/user';
import { BusinessError } from '@domain/errors/business-error';
import { IResendAccountVerificationCodeUseCase } from '@domain/usecases/user/resend-account-verification-code';

export class DbResendAccountVerificationCodeUseCase
  implements IResendAccountVerificationCodeUseCase
{
  constructor(
    private readonly mailService: IMail,
    private readonly userRepository: IUserRepository,
    private readonly codeTemporaryService: ICodeTemporary,
  ) {}

  async execute(email: string): Promise<void> {
    const user = await this.userRepository.findUserByEmail(email);

    if (!user) {
      throw new BusinessError('User is not found', 404);
    }

    if (user.registrationStep == RegistrationStep.VERIFIED) {
      throw new BusinessError('User is already verified');
    }

    const accountVerificationCode =
      await this.codeTemporaryService.generateCode();
    const accountVerificationCodeExpiresAt = new Date();

    accountVerificationCodeExpiresAt.setMinutes(
      accountVerificationCodeExpiresAt.getMinutes() + 3,
    );

    await this.userRepository.updateUser(user.id, {
      accountVerificationCode,
      accountVerificationCodeExpiresAt,
    });

    await this.mailService.sendEmail({
      to: user.email,
      subject: 'Confirm your account',
      body: {
        template: 'confirm-account',
        code: accountVerificationCode,
      },
    });
  }
}
