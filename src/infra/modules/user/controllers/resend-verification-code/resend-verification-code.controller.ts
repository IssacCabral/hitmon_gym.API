import { BusinessError } from '@domain/errors/business-error';
import { IResendAccountVerificationCodeUseCase } from '@domain/usecases/user/resend-account-verification-code';
import {
  BadRequestException,
  Body,
  Controller,
  HttpException,
  Inject,
  Patch,
} from '@nestjs/common';
import { RESEND_ACCOUNT_VERIFICATION_CODE_USE_CASE } from '../../user.providers';
import { ResendVerificationCodeDto } from './dtos/resend.verification.code.dto';

@Controller('users')
export class ResendVerificationCodeController {
  constructor(
    @Inject(RESEND_ACCOUNT_VERIFICATION_CODE_USE_CASE)
    private readonly resendAccountVerificationCodeUseCase: IResendAccountVerificationCodeUseCase,
  ) {}

  @Patch('/resend-code')
  async handle(@Body() resendVerificationCodeDto: ResendVerificationCodeDto) {
    try {
      await this.resendAccountVerificationCodeUseCase.execute(
        resendVerificationCodeDto.email,
      );
    } catch (error) {
      if (error instanceof BusinessError) {
        throw new HttpException(error.message, error.statusCode);
      }
      throw new BadRequestException(error);
    }
  }
}
