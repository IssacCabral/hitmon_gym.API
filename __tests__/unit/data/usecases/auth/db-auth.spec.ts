import { IHash } from '@data/protocols/hash';
import { IJwt } from '@data/protocols/jwt';
import { IUserRepository } from '@data/repositories/user-repository';
import { DbAuthUseCase } from '@data/usecases/auth/db-auth';
import { BusinessError } from '@domain/errors/business-error';
import { userMock } from '@tests/mocks/entities/user-mock';
import { makeUserRepository } from '@tests/mocks/repository/user-mock-repository';
import { makeHashService } from '@tests/mocks/usecase/protocols/hash-mock';
import { makeJwtService } from '@tests/mocks/usecase/protocols/jwt-mock';

interface SutTypes {
  usecase: DbAuthUseCase;
  repository: IUserRepository;
  hashService: IHash;
  jwtService: IJwt;
}

const makeSut = (): SutTypes => {
  const repository = makeUserRepository();
  const hashService = makeHashService();
  const jwtService = makeJwtService();
  const usecase = new DbAuthUseCase(repository, hashService, jwtService);
  return {
    usecase,
    repository,
    hashService,
    jwtService,
  };
};

const request = {
  email: 'any_email@mail.com',
  password: 'password',
};

describe('# UseCase - authentication', () => {
  it('Should throw a BusinessError if user is not found', async () => {
    const { usecase, repository } = makeSut();
    jest.spyOn(repository, 'findUserByEmail').mockResolvedValueOnce(null);
    const promise = usecase.execute(request);

    await expect(promise).rejects.toThrowError(
      new BusinessError('Invalid credentials', 401),
    );
  });

  it('Should throw if findUserByEmail throws', async () => {
    const { usecase, repository } = makeSut();
    jest.spyOn(repository, 'findUserByEmail').mockImplementationOnce(() => {
      throw new Error();
    });
    const promise = usecase.execute(request);

    await expect(promise).rejects.toThrow();
  });

  it('Should call findUserByEmail with correct email', async () => {
    const { usecase, repository } = makeSut();
    const findByEmailSpy = jest
      .spyOn(repository, 'findUserByEmail')
      .mockResolvedValueOnce(userMock);

    await usecase.execute(request);

    expect(findByEmailSpy).toHaveBeenCalledWith('any_email@mail.com');
  });

  it('Should throw a BusinessError if password if invalid', async () => {
    const { usecase, repository, hashService } = makeSut();

    jest.spyOn(repository, 'findUserByEmail').mockResolvedValueOnce(userMock);
    jest.spyOn(hashService, 'compareHash').mockResolvedValueOnce(false);

    const promise = usecase.execute(request);
    await expect(promise).rejects.toThrowError(
      new BusinessError('Invalid credentials', 401),
    );
  });

  // it('Should throw if hashService throws', async () => {
  //   const { usecase, hashService } = makeSut();

  //   jest.spyOn(hashService, 'generateHash').mockImplementationOnce(() => {
  //     throw new Error();
  //   });
  //   const promise = usecase.execute(request);
  //   await expect(promise).rejects.toThrow();
  // });

  // it('Should call hashService with correct password', async () => {
  //   const { usecase, hashService } = makeSut();

  //   const hashServiceSpy = jest.spyOn(hashService, 'generateHash');

  //   await usecase.execute(request);

  //   expect(hashServiceSpy).toHaveBeenCalledWith('new_pass');
  // });

  // it('Should codeTemporaryService to have been called', async () => {
  //   const { usecase, codeTemporaryService, repository } = makeSut();
  //   const codeTemporaryServiceSpy = jest.spyOn(
  //     codeTemporaryService,
  //     'generateCode',
  //   );

  //   jest.spyOn(repository, 'findUserByEmail').mockResolvedValueOnce(userMock);

  //   await usecase.execute('any_email');
  //   expect(codeTemporaryServiceSpy).toHaveBeenCalled();
  // });

  // it('Should throw if codeTemporaryService throws', async () => {
  //   const { usecase, codeTemporaryService, repository } = makeSut();

  //   jest.spyOn(repository, 'findUserByEmail').mockResolvedValueOnce(userMock);

  //   jest
  //     .spyOn(codeTemporaryService, 'generateCode')
  //     .mockImplementationOnce(() => {
  //       throw new Error();
  //     });

  //   const promise = usecase.execute('any_email');
  //   await expect(promise).rejects.toThrow();
  // });

  // it('Should updateUser to have been called', async () => {
  //   const { usecase, repository } = makeSut();

  //   jest.spyOn(repository, 'findUserByEmail').mockResolvedValueOnce(userMock);

  //   const updateUserSpy = jest.spyOn(repository, 'updateUser');

  //   await usecase.execute('any_email');

  //   expect(updateUserSpy).toHaveBeenCalled();
  // });

  // it('Should updateUser to have been called with correct values', async () => {
  //   const { usecase, repository } = makeSut();

  //   jest.spyOn(repository, 'findUserByEmail').mockResolvedValueOnce(userMock);
  //   jest.useFakeTimers().setSystemTime(new Date('2020-12-22T13:30:18.781Z'));
  //   const updateUserSpy = jest.spyOn(repository, 'updateUser');

  //   await usecase.execute('any_email');

  //   expect(updateUserSpy).toHaveBeenCalledWith('1', {
  //     passwordResetCode: '12345678',
  //     passwordResetCodeExpiresAt: new Date('2020-12-22T13:33:18.781Z'),
  //   });
  // });

  // it('Should throw if mailService throws', async () => {
  //   const { usecase, mailService, repository } = makeSut();

  //   jest.spyOn(repository, 'findUserByEmail').mockResolvedValueOnce(userMock);

  //   jest.spyOn(mailService, 'sendEmail').mockImplementationOnce(() => {
  //     throw new Error();
  //   });

  //   const promise = usecase.execute('any_email');
  //   await expect(promise).rejects.toThrow();
  // });

  // it('Should call mailService with correct values', async () => {
  //   const { usecase, mailService, repository } = makeSut();
  //   const mailServiceSpy = jest.spyOn(mailService, 'sendEmail');

  //   jest.spyOn(repository, 'findUserByEmail').mockResolvedValueOnce({
  //     ...userMock,
  //     accountVerificationCode: '12345678',
  //   });

  //   await usecase.execute('any_email');

  //   expect(mailServiceSpy).toHaveBeenCalledWith({
  //     to: 'issac@email.com',
  //     subject: 'Reset your password',
  //     body: {
  //       template: 'forgot-password',
  //       code: '12345678',
  //     },
  //   });
  // });
});
