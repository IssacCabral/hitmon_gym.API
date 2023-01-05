import { BusinessError } from '@domain/errors/business-error';
import { ICheckAccountVerificationCodeUseCase } from '@domain/usecases/check-account-verification-code';
import { Controller, HttpException, Inject, Param, Post } from '@nestjs/common';
import { CHECK_ACCOUNT_VERIFICATION_CODE_USE_CASE } from '../../user.providers';
import { CheckAccountVerificationCodeDto } from './dtos/check.account.verification.code.dto';

@Controller('users')
export class VerificationCodeController {
  constructor(
    @Inject(CHECK_ACCOUNT_VERIFICATION_CODE_USE_CASE)
    private readonly checkAccountVerificationCodeUseCase: ICheckAccountVerificationCodeUseCase,
  ) {}

  @Post('/:userId/:code')
  async checkAccountVerificationCode(
    @Param() checkAccountVerificationCodeDto: CheckAccountVerificationCodeDto,
  ) {
    try {
      const { userId, code } = checkAccountVerificationCodeDto;
      return await this.checkAccountVerificationCodeUseCase.execute(
        code,
        userId,
      );
    } catch (error) {
      if (error instanceof BusinessError) {
        throw new HttpException(error.message, error.statusCode);
      }
      throw error;
    }
  }
}
