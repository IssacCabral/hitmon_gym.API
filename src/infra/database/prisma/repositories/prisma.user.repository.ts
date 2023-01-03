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

  createUser(user: createUserRepositoryParams): Promise<IUser> {
    throw new Error('Method not implemented.');
  }

  findUserByEmail(email: string): Promise<IUser> {
    throw new Error('Method not implemented.');
  }
}
