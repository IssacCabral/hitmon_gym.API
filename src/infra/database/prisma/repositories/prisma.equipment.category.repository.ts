import { IEquipmentCategoryRepository } from '@data/repositories/equipment-category-repository';
import { IEquipmentCategory } from '@domain/entities/equipment-category';
import { CreateEquipmentCategoryParams } from '@domain/types/equipment-category-params';
import { Injectable } from '@nestjs/common';
import { EquipmentCategory } from '@prisma/client';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PrismaEquipmentCategoryRepository
  implements IEquipmentCategoryRepository
{
  constructor(private readonly prismaService: PrismaService) {}

  async createEquipmentCategory(
    equipmentCategory: CreateEquipmentCategoryParams,
  ): Promise<IEquipmentCategory> {
    const createdEquipmentCategory =
      await this.prismaService.equipmentCategory.create({
        data: equipmentCategory,
      });

    return createdEquipmentCategory;
  }

  async findEquipmentCategoryByName(name: string): Promise<EquipmentCategory> {
    return await this.prismaService.equipmentCategory.findUnique({
      where: { name },
    });
  }

  async findAllEquipmentCategories(): Promise<IEquipmentCategory[]> {
    return await this.prismaService.equipmentCategory.findMany();
  }

  async findEquipmentCategoryById(id: string): Promise<IEquipmentCategory> {
    return await this.prismaService.equipmentCategory.findUnique({
      where: { id },
    });
  }
}
