import { BusinessError } from '@domain/errors/business-error';
import { ICreateTokenResetPasswordUseCase } from '@domain/usecases/auth/create-token-reset-password';
import {
  BadRequestException,
  Body,
  Controller,
  HttpException,
  Inject,
  Patch,
} from '@nestjs/common';
import { CREATE_TOKEN_RESET_PASSWORD_USE_CASE } from '../../auth.providers';
import { CreateTokenResetPasswordDto } from './dtos/create.token.reset.password.dto';

@Controller('auth')
export class CreateTokenResetPasswordController {
  constructor(
    @Inject(CREATE_TOKEN_RESET_PASSWORD_USE_CASE)
    private readonly createTokenResetPasswordUseCase: ICreateTokenResetPasswordUseCase,
  ) {}

  @Patch('/reset-password')
  async handle(@Body() resetPasswordDto: CreateTokenResetPasswordDto) {
    try {
      await this.createTokenResetPasswordUseCase.execute(
        resetPasswordDto.email,
      );
    } catch (error) {
      if (error instanceof BusinessError) {
        throw new HttpException(error.message, error.statusCode);
      }
      throw new BadRequestException(error);
    }
  }
}
