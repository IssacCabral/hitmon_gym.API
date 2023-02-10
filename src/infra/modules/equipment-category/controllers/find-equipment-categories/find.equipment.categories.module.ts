import { DbFindEquipmentCategoriesUseCase } from '@data/usecases/equipment-category/db-find-equipment-categories';
import { Module } from '@nestjs/common';
import { FIND_EQUIPMENT_CATEGORIES_USE_CASE } from '../../equipment.category.providers';
import { FindEquipmentCategoriesController } from './find.equipment.categories.controller';
import { DbFindEquipmentCategoriesUseCaseModule } from './usecase-module/db.usecase.module';

@Module({
  imports: [DbFindEquipmentCategoriesUseCaseModule],
  controllers: [FindEquipmentCategoriesController],
  providers: [
    {
      provide: FIND_EQUIPMENT_CATEGORIES_USE_CASE,
      useClass: DbFindEquipmentCategoriesUseCase,
    },
  ],
})
export class FindEquipmentCategoriesModule {}
