import { Test, TestingModule } from '@nestjs/testing';
import { ResendVerificationCodeController } from './resend-verification-code.controller';

describe('ResendVerificationCodeController', () => {
  let controller: ResendVerificationCodeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ResendVerificationCodeController],
    }).compile();

    controller = module.get<ResendVerificationCodeController>(ResendVerificationCodeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
