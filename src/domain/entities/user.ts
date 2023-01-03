import { IBaseEntity } from './base-entity';
import { IRole } from './role';

export enum RegistrationStep {
  PENDING = 'PENDING',
  VERIFIED = 'VERIFIED',
}

export interface IUser extends IBaseEntity {
  email: string;
  password: string;
  userName: string;
  roles?: IRole[];
  registrationStep: RegistrationStep;
  accountVerificationCode?: string;
  accountVerificationCodeExpiresAt?: Date;
}
