import { IUser } from '@domain/entities/user';

export interface ICheckAccountVerificationCodeUseCase {
  execute(code: string, userId: string): Promise<Partial<IUser>>;
}
