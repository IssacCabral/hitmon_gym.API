import { BusinessError } from '@domain/errors/business-error';
import { IResetPasswordUseCase } from '@domain/usecases/auth/reset-password';
import {
  BadRequestException,
  Body,
  Controller,
  HttpException,
  Inject,
  Patch,
} from '@nestjs/common';
import { RESET_PASSWORD_USE_CASE } from '../../auth.providers';
import { ResetPasswordDto } from './dto/reset.password.dto';

@Controller('auth')
export class ResetPasswordController {
  constructor(
    @Inject(RESET_PASSWORD_USE_CASE)
    private readonly resetPasswordUseCase: IResetPasswordUseCase,
  ) {}

  @Patch('/reset-password/confirm')
  async handle(@Body() resetPasswordDto: ResetPasswordDto) {
    try {
      await this.resetPasswordUseCase.execute(resetPasswordDto);
    } catch (error) {
      if (error instanceof BusinessError) {
        throw new HttpException(error.message, error.statusCode);
      }
      throw new BadRequestException(error);
    }
  }
}
