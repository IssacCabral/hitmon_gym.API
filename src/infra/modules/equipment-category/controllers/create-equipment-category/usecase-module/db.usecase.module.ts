import { DatabaseModule } from '@infra/database/database.module';
import { PrismaEquipmentCategoryRepository } from '@infra/database/prisma/repositories/prisma.equipment.category.repository';
import { EQUIPMENT_CATEGORY_REPOSITORY } from '@infra/modules/equipment-category/equipment.category.providers';
import { Module, Provider } from '@nestjs/common';

const providers: Provider[] = [
  {
    provide: EQUIPMENT_CATEGORY_REPOSITORY,
    useClass: PrismaEquipmentCategoryRepository,
  },
];

@Module({
  imports: [DatabaseModule],
  providers: [...providers],
  exports: [...providers],
})
export class DbCreateEquipmentCategoryUseCaseModule {}
