import { JwtAuthGuard } from '@infra/modules/auth/controllers/authentication/guards/jwt-auth.guard';
import { Controller, Get, UseGuards } from '@nestjs/common';

@Controller('users')
export class FindUsersController {
  constructor() {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async handle() {
    const users = [
      {
        id: '1',
        name: 'maria',
      },
      {
        id: '2',
        name: 'joão',
      },
    ];
    return users;
  }
}
