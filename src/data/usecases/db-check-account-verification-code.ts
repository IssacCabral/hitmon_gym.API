import { IDate } from '@data/protocols/date';
import { IUserRepository } from '@data/repositories/user-repository';
import { IUser, RegistrationStep } from '@domain/entities/user';
import { BusinessError } from '@domain/errors/business-error';
import { ICheckAccountVerificationCodeUseCase } from '@domain/usecases/check-account-verification-code';
import { Inject } from '@nestjs/common';
import {
  DATE_SERVICE,
  USER_REPOSITORY,
} from '@infra/modules/user/user.providers';

export class DbCheckAccountVerificationCodeUseCase
  implements ICheckAccountVerificationCodeUseCase
{
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: IUserRepository,
    @Inject(DATE_SERVICE)
    private readonly dateService: IDate,
  ) {}

  async execute(code: string, userId: string): Promise<Partial<IUser>> {
    const user = await this.userRepository.findUserById(userId);

    if (!user) {
      throw new BusinessError('User is not found', 404);
    }

    if (user.registrationStep === RegistrationStep.VERIFIED) {
      throw new BusinessError('User is already verified');
    }

    if (user.accountVerificationCode !== code) {
      throw new BusinessError('Invalid code', 401);
    }

    const isNotExpired = this.isNotExpired(
      user.accountVerificationCodeExpiresAt,
    );

    if (!isNotExpired) {
      throw new BusinessError('Expired code', 401);
    }

    await this.userRepository.updateUser(user.id, {
      accountVerificationCode: null,
      accountVerificationCodeExpiresAt: null,
      registrationStep: RegistrationStep.VERIFIED,
    });

    return {
      id: user.id,
      registrationStep: RegistrationStep.VERIFIED,
    };
  }

  private isNotExpired(date: Date): boolean {
    const nowPlus3Minutes = this.dateService.subtractMinutes(new Date(), 3);
    return this.dateService.checkIfAfter(date, nowPlus3Minutes);
  }
}
