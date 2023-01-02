import { makeUserRepository } from '__tests__/mocks/repository/user-mock-repository';
import { makeCodeTemporaryService } from '__tests__/mocks/usecase/protocols/code-temporary-mock';
import { makeHashService } from '__tests__/mocks/usecase/protocols/hash-mock';
import { makeMailService } from '__tests__/mocks/usecase/protocols/mail-mock';
import { ICodeTemporary } from '../../../../../src/data/protocols/code-temporary';
import { IHash } from '../../../../../src/data/protocols/hash';
import { IMail } from '../../../../../src/data/protocols/mail';
import { IUserRepository } from '../../../../../src/data/repositories/user-repository';
import { DbCreateUserUseCase } from '../../../../../src/data/usecases/db-create-user';

interface SutTypes {
  usecase: DbCreateUserUseCase;
  repository: IUserRepository;
  hashService: IHash;
  mailService: IMail;
  codeTemporaryService: ICodeTemporary;
}

const makeSut = (): SutTypes => {
  const repository = makeUserRepository();
  const hashService = makeHashService();
  const mailService = makeMailService();
  const codeTemporaryService = makeCodeTemporaryService();
  const usecase = new DbCreateUserUseCase(
    repository,
    hashService,
    mailService,
    codeTemporaryService,
  );
  return {
    usecase,
    repository,
    hashService,
    mailService,
    codeTemporaryService,
  };
};
