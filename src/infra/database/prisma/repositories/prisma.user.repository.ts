import {
  createUserRepositoryParams,
  IUserRepository,
} from '@data/repositories/user-repository';
import { IUser } from '@domain/entities/user';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PrismaUserRepository implements IUserRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async createUser(user: createUserRepositoryParams): Promise<IUser> {
    const studentRole = await this.prismaService.role.findFirst({
      where: {
        type: 'STUDENT',
      },
    });

    const createdUser = await this.prismaService.user.create({
      data: {
        ...user,
        roles: {
          connect: {
            id: studentRole.id,
          },
        },
      },
      include: {
        roles: true,
      },
    });

    return createdUser as IUser;
  }

  async findUserByEmail(email: string): Promise<IUser> {
    return (await this.prismaService.user.findFirst({
      where: {
        email,
      },
    })) as IUser;
  }

  async findUserByUserName(userName: string): Promise<IUser> {
    return (await this.prismaService.user.findFirst({
      where: {
        userName,
      },
    })) as IUser;
  }
}
