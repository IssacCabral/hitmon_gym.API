import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/my-auth/guards/jwt-auth.guard';

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
