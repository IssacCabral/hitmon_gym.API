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
import { RoleTypes } from '@domain/entities/role';
import { BusinessError } from '@domain/errors/business-error';

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
  it('Should throw a BusinessError if email already exists', async () => {
    const { usecase, repository } = makeSut();
    const user = userMock;
    jest.spyOn(repository, 'findUserByEmail').mockResolvedValueOnce(user);

    const promise = usecase.execute(createUserMockParams);
    await expect(promise).rejects.toThrowError(
      new BusinessError('Email already exists'),
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

  it('Should throw a BusinessError if userName already exists', async () => {
    const { usecase, repository } = makeSut();
    const user = userMock;
    jest.spyOn(repository, 'findUserByUserName').mockResolvedValueOnce(user);

    const promise = usecase.execute(createUserMockParams);
    await expect(promise).rejects.toThrowError(
      new BusinessError('Username already exists'),
    );
  });

  it('Should throw if findUserByUserName throws', async () => {
    const { usecase, repository } = makeSut();

    jest.spyOn(repository, 'findUserByUserName').mockImplementationOnce(() => {
      throw new Error();
    });

    const promise = usecase.execute(createUserMockParams);
    await expect(promise).rejects.toThrow();
  });

  it('Should call findUserByUserName with correct userName', async () => {
    const { usecase, repository } = makeSut();
    const findByUserNameSpy = jest.spyOn(repository, 'findUserByUserName');
    await usecase.execute(createUserMockParams);
    expect(findByUserNameSpy).toHaveBeenCalledWith('Issac');
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

  it('Should throw if createUser throws', async () => {
    const { usecase, repository } = makeSut();

    jest.spyOn(repository, 'createUser').mockImplementationOnce(() => {
      throw new Error();
    });

    const promise = usecase.execute(createUserMockParams);
    await expect(promise).rejects.toThrow();
  });

  it('Should call createUser with correct values', async () => {
    const { usecase, repository } = makeSut();
    const createUserRepoSpy = jest.spyOn(repository, 'createUser');

    jest.useFakeTimers().setSystemTime(new Date('2020-12-22T13:30:18.781Z'));

    await usecase.execute(createUserMockParams);

    expect(createUserRepoSpy).toHaveBeenCalledWith({
      email: 'issac@email.com',
      password: 'hashed_value',
      userName: 'Issac',
      accountVerificationCode: '12345678',
      accountVerificationCodeExpiresAt: new Date('2020-12-22T13:33:18.781Z'),
    });
  });

  it('Should create new user with role STUDENT and RegistrationStep PENDING', async () => {
    const { usecase } = makeSut();

    const result = await usecase.execute(createUserMockParams);
    expect(result.user).toHaveProperty('registrationStep', 'PENDING');
    expect(result.user).toHaveProperty('roles', [
      {
        id: '1',
        type: RoleTypes.STUDENT,
        description: 'any_description',
      },
    ]);
  });

  it('Should throw if mailService throws', async () => {
    const { usecase, mailService } = makeSut();

    jest.spyOn(mailService, 'sendEmail').mockImplementationOnce(() => {
      throw new Error();
    });

    const promise = usecase.execute(createUserMockParams);
    await expect(promise).rejects.toThrow();
  });

  it('Should call mailService with correct values', async () => {
    const { usecase, mailService } = makeSut();
    const mailServiceSpy = jest.spyOn(mailService, 'sendEmail');

    await usecase.execute(createUserMockParams);

    expect(mailServiceSpy).toHaveBeenCalledWith({
      to: 'issac@email.com',
      subject: 'Confirm your account',
      body: {
        template: 'confirm-account',
      },
    });
  });
});
