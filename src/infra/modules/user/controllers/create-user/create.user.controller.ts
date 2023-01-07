import {
  Controller,
  Post,
  Body,
  Inject,
  BadRequestException,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { ICreateUserUseCase } from '@domain/usecases/create-user';
import { CREATE_USER_USE_CASE } from '../../user.providers';
import { BusinessError } from '@domain/errors/business-error';

@Controller('users')
export class CreateUserController {
  constructor(
    @Inject(CREATE_USER_USE_CASE)
    private readonly createUserUseCase: ICreateUserUseCase,
  ) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    try {
      const user = await this.createUserUseCase.execute(createUserDto);
      return user;
    } catch (error) {
      if (error instanceof BusinessError) {
        throw new BadRequestException(error.message, {
          cause: error,
          description: error.name,
        });
      }
      throw new BadRequestException(error);
    }
  }
}
