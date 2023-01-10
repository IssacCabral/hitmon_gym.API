import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { MyUserService } from 'src/my-user/my-user.service';

@Injectable()
export class MyAuthService {
  constructor(
    private usersService: MyUserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
