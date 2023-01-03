import { Module } from '@nestjs/common';
import { CodeTemporary } from './code-temporary/code-temporary';
import { BcryptHashAdapter } from './hash/bcrypt.hash.adapter';
import { NodeMailerAdapter } from './mail/mail';

@Module({
  providers: [BcryptHashAdapter, NodeMailerAdapter, CodeTemporary],
  exports: [BcryptHashAdapter, NodeMailerAdapter, CodeTemporary],
})
export class ProtocolsModule {}
