import { Module } from '@nestjs/common';
import { MyAuthModule } from 'src/my-auth/my-auth.module';
import { MyUserModule } from 'src/my-user/my-user.module';
import { AppController } from './app.controller';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';

// @Module({
//   imports: [UserModule, AuthModule, MyAuthModule, MyUserModule],
//   controllers: [AppController],
// })
// export class AppModule {}

@Module({
  imports: [UserModule, AuthModule],
})
export class AppModule {}
