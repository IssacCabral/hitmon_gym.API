import { IFindUsersUseCase } from '@domain/usecases/user/find-users';
import { JwtAuthGuard } from '@infra/modules/auth/controllers/authentication/guards/jwt-auth.guard';
import {
  BadRequestException,
  Controller,
  Get,
  Inject,
  Query,
  UseGuards,
} from '@nestjs/common';
import { FIND_USERS_USE_CASE } from '../../user.providers';
import { FindUsersOptionsDto } from './dtos/find.users.options.dto';

@Controller('users')
export class FindUsersController {
  constructor(
    @Inject(FIND_USERS_USE_CASE)
    private readonly findUsersUseCase: IFindUsersUseCase,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async handle(@Query() findUsersOptions: FindUsersOptionsDto) {
    try {
      const { page, limit } = findUsersOptions;

      const users = await this.findUsersUseCase.execute({
        page: Number(page),
        limit: Number(limit),
      });
      return users;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
