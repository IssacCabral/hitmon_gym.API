import {
  createUserMockParams,
  userMock,
} from '@tests/mocks/entities/user-mock';
import { makeUserRepository } from '@tests/mocks/repository/user-mock-repository';
import { makeCodeTemporaryService } from '@tests/mocks/usecase/protocols/code-temporary-mock';
import { makeHashService } from '@tests/mocks/usecase/protocols/hash-mock';
import { makeMailService } from '@tests/mocks/usecase/protocols/mail-mock';
import { ICodeTemporary } from '@data/protocols/code-temporary';
import { IHash } from '@data/protocols/hash';
import { IMail } from '@data/protocols/mail';
import { IUserRepository } from '@data/repositories/user-repository';
import { DbCreateUserUseCase } from '@data/usecases/db-create-user';

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

describe('# UseCase - create user', () => {
  it('Should throw an error if email already exists', async () => {
    const { usecase, repository } = makeSut();
    const user = userMock;
    jest.spyOn(repository, 'findUserByEmail').mockResolvedValueOnce(user);

    const promise = usecase.execute(createUserMockParams);
    await expect(promise).rejects.toThrowError(
      new Error('Email already exists'),
    );
  });

  it('Should throw if findUserByEmail throws', async () => {
    const { usecase, repository } = makeSut();

    jest.spyOn(repository, 'findUserByEmail').mockImplementationOnce(() => {
      throw new Error();
    });

    const promise = usecase.execute(createUserMockParams);
    await expect(promise).rejects.toThrow();
  });

  it('Should call findUserByEmail with correct email', async () => {
    const { usecase, repository } = makeSut();
    const findByEmailSpy = jest.spyOn(repository, 'findUserByEmail');
    await usecase.execute(createUserMockParams);
    expect(findByEmailSpy).toHaveBeenCalledWith('issac@email.com');
  });

  it('Should throw if hashService throws', async () => {
    const { usecase, hashService } = makeSut();

    jest.spyOn(hashService, 'generateHash').mockImplementationOnce(() => {
      throw new Error();
    });

    const promise = usecase.execute(createUserMockParams);
    await expect(promise).rejects.toThrow();
  });

  it('Should call hashService with correct password', async () => {
    const { usecase, hashService } = makeSut();
    const hashSpy = jest.spyOn(hashService, 'generateHash');
    await usecase.execute(createUserMockParams);
    expect(hashSpy).toHaveBeenCalledWith('password');
  });

  it('Should throw if codeTemporaryService throws', async () => {
    const { usecase, codeTemporaryService } = makeSut();

    jest
      .spyOn(codeTemporaryService, 'generateCode')
      .mockImplementationOnce(() => {
        throw new Error();
      });

    const promise = usecase.execute(createUserMockParams);
    await expect(promise).rejects.toThrow();
  });

  it('Should codeTemporaryService to have been called', async () => {
    const { usecase, codeTemporaryService } = makeSut();
    const codeTemporaryServiceSpy = jest.spyOn(
      codeTemporaryService,
      'generateCode',
    );
    await usecase.execute(createUserMockParams);
    expect(codeTemporaryServiceSpy).toHaveBeenCalled();
  });
});
