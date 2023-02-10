import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { PrismaEquipmentCategoryRepository } from './prisma/repositories/prisma.equipment.category.repository';
import { PrismaUserRepository } from './prisma/repositories/prisma.user.repository';

@Module({
  providers: [
    PrismaService,
    PrismaUserRepository,
    PrismaEquipmentCategoryRepository,
  ],
  exports: [
    PrismaService,
    PrismaUserRepository,
    PrismaEquipmentCategoryRepository,
  ],
})
export class DatabaseModule {}
