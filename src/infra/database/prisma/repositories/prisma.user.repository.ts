import {
  createUserRepositoryParams,
  IUserRepository,
} from '@data/repositories/user-repository';
import { IUser } from '@domain/entities/user';
import { UpdateUserParams } from '@domain/types/user-params';
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

  async findUserById(id: string): Promise<IUser> {
    return (await this.prismaService.user.findUnique({
      where: {
        id,
      },
    })) as IUser;
  }

  async findUserByEmail(email: string): Promise<IUser> {
    return (await this.prismaService.user.findFirst({
      where: {
        email,
      },
    })) as IUser;
  }

  async findUserByUserName(username: string): Promise<IUser> {
    return (await this.prismaService.user.findFirst({
      where: {
        username,
      },
    })) as IUser;
  }

  async updateUser(id: string, params: UpdateUserParams): Promise<IUser> {
    const updatedUser = await this.prismaService.user.update({
      where: {
        id,
      },
      data: {
        ...params,
      },
      include: {
        roles: true,
      },
    });

    return updatedUser as IUser;
  }

  async findUserByPasswordResetCode(
    code: string,
    email: string,
  ): Promise<IUser> {
    return (await this.prismaService.user.findFirst({
      where: {
        email,
        passwordResetCode: code,
      },
    })) as IUser;
  }
}
