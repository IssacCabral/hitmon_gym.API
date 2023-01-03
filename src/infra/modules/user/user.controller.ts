import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Inject,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { ICreateUserUseCase } from '@domain/usecases/create-user';
import { CREATE_USER_USE_CASE } from './user.providers';
//import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UserController {
  constructor(
    @Inject(CREATE_USER_USE_CASE)
    private readonly createUserUseCase: ICreateUserUseCase,
  ) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const user = await this.createUserUseCase.execute(createUserDto);
    return user;
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
