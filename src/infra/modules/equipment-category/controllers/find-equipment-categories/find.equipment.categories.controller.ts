import { IFindEquipmentCategoriesUseCase } from '@domain/usecases/equipment-category/find-equipment-categories';
import { JwtAuthGuard } from '@infra/modules/auth/controllers/authentication/guards/jwt-auth.guard';
import { Roles } from '@infra/modules/auth/role/decorator/roles.decorator';
import { Role } from '@infra/modules/auth/role/enums/role.enum';
import { RolesGuard } from '@infra/modules/auth/role/guards/roles.guard';
import {
  BadRequestException,
  Controller,
  Get,
  Inject,
  UseGuards,
} from '@nestjs/common';
import { FIND_EQUIPMENT_CATEGORIES_USE_CASE } from '../../equipment.category.providers';

@Controller('equipment-categories')
export class FindEquipmentCategoriesController {
  constructor(
    @Inject(FIND_EQUIPMENT_CATEGORIES_USE_CASE)
    private readonly findEquipmentCategoriesUseCase: IFindEquipmentCategoriesUseCase,
  ) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Get()
  async handle() {
    try {
      const equipmentCategories =
        await this.findEquipmentCategoriesUseCase.execute();
      return equipmentCategories;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
