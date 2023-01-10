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

  it('Should throw if hashService throws', async () => {
    const { usecase, hashService, repository } = makeSut();

    jest.spyOn(repository, 'findUserByEmail').mockResolvedValueOnce(userMock);
    jest.spyOn(hashService, 'compareHash').mockImplementationOnce(() => {
      throw new Error();
    });
    const promise = usecase.execute(request);
    await expect(promise).rejects.toThrow();
  });

  it('Should call hashService with correct values', async () => {
    const { usecase, hashService, repository } = makeSut();

    jest.spyOn(repository, 'findUserByEmail').mockResolvedValueOnce(userMock);
    const hashServiceSpy = jest.spyOn(hashService, 'compareHash');

    await usecase.execute(request);

    expect(hashServiceSpy).toHaveBeenCalledWith('password', 'hashedpassword');
  });

  it('Should throw if jwtService throws', async () => {
    const { usecase, jwtService, repository } = makeSut();

    jest.spyOn(repository, 'findUserByEmail').mockResolvedValueOnce(userMock);
    jest.spyOn(jwtService, 'sign').mockImplementationOnce(() => {
      throw new Error();
    });
    const promise = usecase.execute(request);
    await expect(promise).rejects.toThrow();
  });

  it('Should call jwtService with correct values', async () => {
    const { usecase, jwtService, repository } = makeSut();

    jest.spyOn(repository, 'findUserByEmail').mockResolvedValueOnce(userMock);
    const jwtServiceSpy = jest.spyOn(jwtService, 'sign');

    await usecase.execute(request);

    expect(jwtServiceSpy).toHaveBeenCalledWith({ id: '1' });
  });

  it('Should return token and user on success', async () => {
    const { usecase, repository } = makeSut();

    jest.spyOn(repository, 'findUserByEmail').mockResolvedValueOnce(userMock);

    const result = await usecase.execute(request);

    expect(result).toEqual({
      token: 'access_token',
      user: {
        email: 'issac@email.com',
        id: userMock.id,
        roles: userMock.roles,
        registrationStep: userMock.registrationStep,
      },
    });
  });
});
