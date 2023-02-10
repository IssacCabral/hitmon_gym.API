import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { EquipmentCategoryModule } from './modules/equipment-category/equipment.category.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [UserModule, AuthModule, EquipmentCategoryModule],
})
export class AppModule {}
