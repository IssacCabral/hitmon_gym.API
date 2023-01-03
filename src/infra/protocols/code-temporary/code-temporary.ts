import { ICodeTemporary } from '@data/protocols/code-temporary';
import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';

@Injectable()
export class CodeTemporary implements ICodeTemporary {
  generateCode(length = 6): string | Promise<string> {
    return crypto
      .randomBytes(length)
      .toString('hex')
      .toLocaleUpperCase()
      .slice(0, 6);
  }
}
