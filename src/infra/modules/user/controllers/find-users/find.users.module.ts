import { Module } from '@nestjs/common';
import { FindUsersController } from './find.users.controller';

@Module({
  controllers: [FindUsersController],
})
export class FindUsersModule {}
