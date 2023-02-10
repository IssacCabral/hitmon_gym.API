import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { PrismaEquipmentCategoryRepository } from './prisma/repositories/prisma.equipment.category.repository';
import { PrismaEquipmentRepository } from './prisma/repositories/prisma.equipment.repository';
import { PrismaUserRepository } from './prisma/repositories/prisma.user.repository';

@Module({
  providers: [
    PrismaService,
    PrismaUserRepository,
    PrismaEquipmentCategoryRepository,
    PrismaEquipmentRepository,
  ],
  exports: [
    PrismaService,
    PrismaUserRepository,
    PrismaEquipmentCategoryRepository,
    PrismaEquipmentRepository,
  ],
})
export class DatabaseModule {}
