import { Module } from '@nestjs/common';
import { CreateEquipmentCategoryModule } from './controllers/create-equipment-category/create.equipment.category.module';

@Module({
  imports: [CreateEquipmentCategoryModule],
  exports: [EquipmentCategoryModule],
})
export class EquipmentCategoryModule {}
