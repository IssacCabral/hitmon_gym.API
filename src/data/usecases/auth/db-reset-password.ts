import { IDate } from '@data/protocols/date';
import { IHash } from '@data/protocols/hash';
import { IUserRepository } from '@data/repositories/user-repository';
import { BusinessError } from '@domain/errors/business-error';
import { ResetPasswordParams } from '@domain/types/reset-password-params';
import { IResetPasswordUseCase } from '@domain/usecases/auth/reset-password';

export class DbResetPasswordUseCase implements IResetPasswordUseCase {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly hashService: IHash,
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
