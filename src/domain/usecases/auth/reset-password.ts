import { ResetPasswordParams } from '@domain/types/reset-password-params';

export interface IResetPasswordUseCase {
  execute(params: ResetPasswordParams): Promise<void>;
}
