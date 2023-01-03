import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { PrismaUserRepository } from './prisma/repositories/prisma.user.repository';

@Module({
  providers: [PrismaService, PrismaUserRepository],
  exports: [PrismaService, PrismaUserRepository],
})
export class DatabaseModule {}
