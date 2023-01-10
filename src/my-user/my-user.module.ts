import { Module } from '@nestjs/common';
import { MyUserService } from './my-user.service';

@Module({
  providers: [MyUserService],
  exports: [MyUserService],
})
export class MyUserModule {}
