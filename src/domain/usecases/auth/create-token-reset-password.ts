export interface ICreateTokenResetPasswordUseCase {
  execute(email: string): Promise<void>;
}
