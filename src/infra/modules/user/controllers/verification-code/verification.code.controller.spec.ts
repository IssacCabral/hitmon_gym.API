import { Test, TestingModule } from '@nestjs/testing';
import { VerificationCodeController } from './verification-code.controller';

describe('VerificationCodeController', () => {
  let controller: VerificationCodeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VerificationCodeController],
    }).compile();

    controller = module.get<VerificationCodeController>(
      VerificationCodeController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
