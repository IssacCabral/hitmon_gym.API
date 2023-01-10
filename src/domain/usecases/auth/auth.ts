import { AuthParams, AuthResult } from '@domain/types/auth-params';

export interface IAuthUseCase {
  execute(params: AuthParams): Promise<AuthResult>;
}
