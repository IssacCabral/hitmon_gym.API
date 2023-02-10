import { Module } from '@nestjs/common';
import { CreateEquipmentCategoryModule } from './controllers/create-equipment-category/create.equipment.category.module';
import { FindEquipmentCategoriesModule } from './controllers/find-equipment-categories/find.equipment.categories.module';

@Module({
  imports: [CreateEquipmentCategoryModule, FindEquipmentCategoriesModule],
  exports: [EquipmentCategoryModule],
})
export class EquipmentCategoryModule {}
