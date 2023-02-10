import { IEquipmentRepository } from '@data/repositories/equipment-repository';
import { IEquipment } from '@domain/entities/equipment';
import { CreateEquipmentParams } from '@domain/types/equipment-params';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PrismaEquipmentRepository implements IEquipmentRepository {
  constructor(private prismaService: PrismaService) {}

  async createEquipment(equipment: CreateEquipmentParams): Promise<IEquipment> {
    const createdEquipment = await this.prismaService.equipment.create({
      data: {
        name: equipment.name,
        equipmentCategoryId: equipment.equipmentCategoryId,
      },
    });
    return createdEquipment;
  }

  async findEquipmentByName(name: string): Promise<IEquipment> {
    return await this.prismaService.equipment.findUnique({ where: { name } });
  }
}
