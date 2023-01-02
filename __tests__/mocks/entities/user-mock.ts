import { IUser, RegistrationStep } from 'src/domain/entities/user';
import { roleMock } from './role-mock';

export const userMock: IUser = {
  id: '1',
  userName: 'Issac',
  email: 'issac@email.com',
  password: 'hashedpassword',
  cpf: '000.000.000-00',
  registrationStep: RegistrationStep.PENDING,
  roles: [roleMock],
  createdAt: new Date(),
  updatedAt: new Date(),
};
