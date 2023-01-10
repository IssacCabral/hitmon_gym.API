import { Controller, Request, Post, UseGuards, Get } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from 'src/my-auth/guards/jwt-auth.guard';
import { LocalAuthGuard } from 'src/my-auth/guards/local-auth.guard';
import { MyAuthService } from 'src/my-auth/my-auth.service';
import { MyUserService } from 'src/my-user/my-user.service';

@Controller()
export class AppController {
  constructor(
    private authService: MyAuthService,
    private userService: MyUserService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    return await this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/find-all-users')
  async findAllUsers() {
    return await this.userService.findAll();
  }
}
