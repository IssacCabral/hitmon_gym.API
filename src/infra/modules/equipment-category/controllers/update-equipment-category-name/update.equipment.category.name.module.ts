import { DbUpdateEquipmentCategoryNameUseCase } from '@data/usecases/equipment-category/db-update-equipment-category';
import { Module } from '@nestjs/common';
import { UPDATE_EQUIPMENT_CATEGORY_NAME_USE_CASE } from '../../equipment.category.providers';
import { UpdateEquipmentCategoryNameController } from './update.equipment.category.name.controller';
import { DbUpdateEquipmentCategoryNameUseCaseModule } from './usecase-module/db.usecase.module';

@Module({
  imports: [DbUpdateEquipmentCategoryNameUseCaseModule],
  controllers: [UpdateEquipmentCategoryNameController],
  providers: [
    {
      provide: UPDATE_EQUIPMENT_CATEGORY_NAME_USE_CASE,
      useClass: DbUpdateEquipmentCategoryNameUseCase,
    },
  ],
})
export class UpdateEquipmentCategoryNameModule {}
