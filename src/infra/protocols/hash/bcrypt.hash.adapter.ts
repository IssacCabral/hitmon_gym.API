import { IHash } from '@data/protocols/hash';
import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class BcryptHashAdapter implements IHash {
  async generateHash(value: string): Promise<string> {
    return await bcrypt.hash(value, 12);
  }
  async compareHash(value: string, hashedValue: string): Promise<boolean> {
    return bcrypt.compare(value, hashedValue);
  }
}
