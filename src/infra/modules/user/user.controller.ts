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
import { CREATE_USER_USE_CASE } from './user.providers';
import { BusinessError } from '@domain/errors/business-error';
//import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UserController {
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
        //throw new HttpException(error.message, error.statusCode);
        throw new BadRequestException(error.message, {
          cause: error,
          description: error.name,
        });
      }
      throw new BadRequestException(error);
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
