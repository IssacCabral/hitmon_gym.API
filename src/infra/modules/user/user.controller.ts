import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Inject,
  HttpException,
  BadRequestException,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { ICreateUserUseCase } from '@domain/usecases/create-user';
import {
  CHECK_ACCOUNT_VERIFICATION_CODE_USE_CASE,
  CREATE_USER_USE_CASE,
} from './user.providers';
import { BusinessError } from '@domain/errors/business-error';
import { ICheckAccountVerificationCodeUseCase } from '@domain/usecases/check-account-verification-code';
import { CheckAccountVerificationCodeDto } from './dtos/check.account.verification.code';

@Controller('users')
export class UserController {
  constructor(
    @Inject(CREATE_USER_USE_CASE)
    private readonly createUserUseCase: ICreateUserUseCase,
    @Inject(CHECK_ACCOUNT_VERIFICATION_CODE_USE_CASE)
    private readonly checkAccountVerificationCodeUseCase: ICheckAccountVerificationCodeUseCase,
  ) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    try {
      const user = await this.createUserUseCase.execute(createUserDto);
      return user;
    } catch (error) {
      if (error instanceof BusinessError) {
        //throw new HttpException(error.message, error.statusCode);
        throw new BadRequestException(error.message, {
          cause: error,
          description: error.name,
        });
      }
      throw new BadRequestException(error);
    }
  }

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

  // @Get()
  // findAll() {
  //   return this.userService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.userService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
  //   return this.userService.update(+id, updateUserDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.userService.remove(+id);
  // }
}
