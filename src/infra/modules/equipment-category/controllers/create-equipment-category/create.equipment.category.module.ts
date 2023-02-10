import { DbCreateEquipmentCategoryUseCase } from '@data/usecases/equipment-category/db-create-equipment-category';
import { Module } from '@nestjs/common';
import { CREATE_EQUIPMENT_CATEGORY_USE_CASE } from '../../equipment.category.providers';
import { CreateEquipmentCategoryController } from './create.equipment.category.controller';
import { DbCreateEquipmentCategoryUseCaseModule } from './usecase-module/db.usecase.module';

@Module({
  imports: [DbCreateEquipmentCategoryUseCaseModule],
  controllers: [CreateEquipmentCategoryController],
  providers: [
    {
      provide: CREATE_EQUIPMENT_CATEGORY_USE_CASE,
      useClass: DbCreateEquipmentCategoryUseCase,
    },
  ],
})
export class CreateEquipmentCategoryModule {}
