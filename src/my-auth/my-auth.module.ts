import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { MyUserModule } from 'src/my-user/my-user.module';
import { jwtConstants } from './constants';
import { LocalStrategy } from './strategies/local.strategy';
import { MyAuthService } from './my-auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    MyUserModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  providers: [MyAuthService, LocalStrategy, JwtStrategy],
  exports: [MyAuthService],
})
export class MyAuthModule {}
