import { IJwt } from '@data/protocols/jwt';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtAdapter implements IJwt {
  constructor(private readonly jwtService: JwtService) {}

  async sign(payload: any): Promise<string> {
    const token = await this.jwtToken(payload);
    return token;
  }

  async verify(payload: string): Promise<any> {}

  private async jwtToken(myPayload: any): Promise<string> {
    const payload = {
      sub: myPayload.id,
      email: myPayload.email,
    };
    return await this.jwtService.signAsync(payload);
  }
}
