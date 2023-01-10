import { IHash } from '@data/protocols/hash';
import { IJwt } from '@data/protocols/jwt';
import { IUserRepository } from '@data/repositories/user-repository';
import { BusinessError } from '@domain/errors/business-error';
import { AuthParams, AuthResult } from '@domain/types/auth-params';
import { IAuthUseCase } from '@domain/usecases/auth/auth';
import { JWT_SERVICE } from '@infra/modules/auth/auth.providers';
import {
  HASH_SERVICE,
  USER_REPOSITORY,
} from '@infra/modules/user/user.providers';
import { Inject } from '@nestjs/common';

export class DbAuthUseCase implements IAuthUseCase {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: IUserRepository,
    @Inject(HASH_SERVICE)
    private readonly hashService: IHash,
    @Inject(JWT_SERVICE)
    private readonly jwtService: IJwt,
  ) {}

  async execute(params: AuthParams): Promise<AuthResult> {
    const user = await this.userRepository.findUserByEmail(params.email);

    if (!user) {
      throw new BusinessError('Invalid credentials', 401);
    }

    const isValidPassword = await this.hashService.compareHash(
      params.password,
      user.password,
    );

    if (!isValidPassword) {
      throw new BusinessError('Invalid credentials', 401);
    }

    const token = await this.jwtService.sign({ id: user.id });

    return {
      token,
      user: {
        email: user.email,
      },
    };
  }
}
