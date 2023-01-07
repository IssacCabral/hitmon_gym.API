import { CreateUserParams, CreateUserReturns } from '../types/user-params';

export interface ICreateUserUseCase {
  execute(params: CreateUserParams): Promise<CreateUserReturns>;
}
