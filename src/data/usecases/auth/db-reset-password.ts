import { IDate } from '@data/protocols/date';
import { IHash } from '@data/protocols/hash';
import { IUserRepository } from '@data/repositories/user-repository';
import { BusinessError } from '@domain/errors/business-error';
import { ResetPasswordParams } from '@domain/types/reset-password-params';
import { IResetPasswordUseCase } from '@domain/usecases/auth/reset-password';
import {
  DATE_SERVICE,
  HASH_SERVICE,
  USER_REPOSITORY,
} from '@infra/modules/user/user.providers';
import { Inject } from '@nestjs/common';

export class DbResetPasswordUseCase implements IResetPasswordUseCase {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: IUserRepository,
    @Inject(HASH_SERVICE)
    private readonly hashService: IHash,
    @Inject(DATE_SERVICE)
    private readonly dateService: IDate,
  ) {}

  async execute(params: ResetPasswordParams): Promise<void> {
    const user = await this.userRepository.findUserByPasswordResetCode(
      params.code,
      params.email,
    );

    if (!user) {
      throw new BusinessError('User is not found', 404);
    }

    const isNotExpired = this.isNotExpired(user.passwordResetCodeExpiresAt);

    if (!isNotExpired) {
      throw new BusinessError('Expired code', 401);
    }

    const hashedPassword = await this.hashService.generateHash(
      params.newPassword,
    );

    await this.userRepository.updateUser(user.id, {
      password: hashedPassword,
      passwordResetCode: null,
      passwordResetCodeExpiresAt: null,
    });
  }

  private isNotExpired(date: Date): boolean {
    const nowPlus3Minutes = this.dateService.subtractMinutes(new Date(), 3);
    return this.dateService.checkIfAfter(date, nowPlus3Minutes);
  }
}
