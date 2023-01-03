import { IRole, RoleTypes } from '@domain/entities/role';

export const roleMock: IRole = {
  id: '1',
  type: RoleTypes.STUDENT,
  description: 'any_description',
};
