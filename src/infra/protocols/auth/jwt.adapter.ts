import { IJwt } from '@data/protocols/jwt';
import { env } from 'process';
import * as jwt from 'jsonwebtoken';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtAdapter implements IJwt {
  async sign(payload: any): Promise<string> {
    const token = jwt.sign(payload, env.JWT_SECRET_KEY, {
      expiresIn: '1h',
    });
    return token;
  }
  async verify(payload: string): Promise<any> {}
}
