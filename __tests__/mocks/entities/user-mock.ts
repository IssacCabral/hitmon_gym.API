import { IUser, RegistrationStep } from '@domain/entities/user';
import { CreateUserParams } from '@domain/types/user-params';
import { roleMock } from './role-mock';

export const userMock: IUser = {
  id: '1',
  username: 'Issac',
  email: 'issac@email.com',
  password: 'hashedpassword',
  registrationStep: RegistrationStep.PENDING,
  roles: [roleMock],
  createdAt: new Date(),
  updatedAt: new Date(),
};

export const createUserMockParams: CreateUserParams = {
  email: 'issac@email.com',
  password: 'password',
  username: 'Issac',
};
