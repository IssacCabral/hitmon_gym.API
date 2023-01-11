import { BusinessError } from '@domain/errors/business-error';
import { IAuthUseCase } from '@domain/usecases/auth/auth';
import {
  Body,
  Controller,
  HttpException,
  Inject,
  Post,
  UnauthorizedException,
} from '@nestjs/common';
import { AUTH_USE_CASE } from '../../auth.providers';
import { AuthDto } from './dtos/auth.dto';

@Controller('auth')
export class AuthenticationController {
  constructor(
    @Inject(AUTH_USE_CASE)
    private readonly authUseCase: IAuthUseCase,
  ) {}

  @Post('/login')
  async handle(@Body() authDto: AuthDto) {
    try {
      return await this.authUseCase.execute(authDto);
    } catch (error) {
      if (error instanceof BusinessError) {
        throw new HttpException(error.message, error.statusCode);
      }
      throw new UnauthorizedException(error);
    }
  }
}
