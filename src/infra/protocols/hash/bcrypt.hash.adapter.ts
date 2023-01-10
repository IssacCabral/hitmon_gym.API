import { IHash } from '@data/protocols/hash';
import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class BcryptHashAdapter implements IHash {
  compareHash(value: string, hashedValue: string): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
  async generateHash(value: string): Promise<string> {
    return await bcrypt.hash(value, 12);
  }
}
