export enum RoleTypes {
  ADMIN = 'ADMIN',
  INSTRUCTOR = 'INSTRUCTOR',
  STUDENT = 'STUDENT',
}

export interface IRole {
  id: string;
  type: RoleTypes;
  description: string;
}
