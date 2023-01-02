import {
  CreateUserParams,
  CreateUserReturns,
} from 'src/domain/types/user-params';
import { ICreateUserUseCase } from 'src/domain/usecases/create-user';
import { ICodeTemporary } from '../protocols/code-temporary';
import { IHash } from '../protocols/hash';
import { IMail } from '../protocols/mail';
import { IUserRepository } from '../repositories/user-repository';

export class DbCreateUserUseCase implements ICreateUserUseCase {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly hashService: IHash,
    private readonly mailService: IMail,
    private readonly codeTemporaryService: ICodeTemporary,
  ) {}

  execute(params: CreateUserParams): Promise<CreateUserReturns> {
    throw new Error('Method not implemented.');
  }
}
