import { Module } from '@nestjs/common';
import { CreateEquipmentCategoryModule } from './controllers/create-equipment-category/create.equipment.category.module';
import { FindEquipmentCategoriesModule } from './controllers/find-equipment-categories/find.equipment.categories.module';
import { UpdateEquipmentCategoryNameModule } from './controllers/update-equipment-category-name/update.equipment.category.name.module';

@Module({
  imports: [
    CreateEquipmentCategoryModule,
    FindEquipmentCategoriesModule,
    UpdateEquipmentCategoryNameModule,
  ],
  exports: [EquipmentCategoryModule],
})
export class EquipmentCategoryModule {}
