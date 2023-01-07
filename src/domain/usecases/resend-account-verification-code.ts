export interface IResendAccountVerificationCodeUseCase {
  execute(email: string): Promise<void>;
}
