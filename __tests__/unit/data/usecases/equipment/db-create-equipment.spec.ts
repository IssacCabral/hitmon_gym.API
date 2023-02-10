import { IEquipmentCategoryRepository } from '@data/repositories/equipment-category-repository';
import { IEquipmentRepository } from '@data/repositories/equipment-repository';
import { DbCreateEquipmentUseCase } from '@data/usecases/equipment/db-create-equipment';
import { BusinessError } from '@domain/errors/business-error';
import { createEquipmentMockParams } from '@tests/mocks/entities/equipment-mock';
import { makeEquipmentCategoryRepository } from '@tests/mocks/repository/equipment-category-repository';
import { makeEquipmentRepository } from '@tests/mocks/repository/equipment-repository';

interface SutTypes {
  usecase: DbCreateEquipmentUseCase;
  equipmentRepository: IEquipmentRepository;
  equipmentCategoryRepository: IEquipmentCategoryRepository;
}

const makeSut = (): SutTypes => {
  const equipmentRepository = makeEquipmentRepository();
  const equipmentCategoryRepository = makeEquipmentCategoryRepository();
  const usecase = new DbCreateEquipmentUseCase(
    equipmentRepository,
    equipmentCategoryRepository,
  );
  return {
    usecase,
    equipmentRepository,
    equipmentCategoryRepository,
  };
};

describe('# UseCase - create equipment', () => {
  it('Should throw a BusinessError if name already exists', async () => {
    const { usecase } = makeSut();

    const promise = usecase.execute(createEquipmentMockParams);
    await expect(promise).rejects.toThrowError(
      new BusinessError('Name already exists'),
    );
  });

  it('Should throw if findEquipmentByName throws', async () => {
    const { usecase, equipmentRepository } = makeSut();

    jest
      .spyOn(equipmentRepository, 'findEquipmentByName')
      .mockImplementationOnce(() => {
        throw new Error();
      });

    const promise = usecase.execute(createEquipmentMockParams);
    await expect(promise).rejects.toThrow();
  });

  // it('Should call findUserByEmail with correct email', async () => {
  //   const { usecase, repository } = makeSut();
  //   const findByEmailSpy = jest.spyOn(repository, 'findUserByEmail');
  //   await usecase.execute(createUserMockParams);
  //   expect(findByEmailSpy).toHaveBeenCalledWith('issac@email.com');
  // });

  // it('Should throw a BusinessError if username already exists', async () => {
  //   const { usecase, repository } = makeSut();
  //   const user = userMock;
  //   jest.spyOn(repository, 'findUserByUserName').mockResolvedValueOnce(user);

  //   const promise = usecase.execute(createUserMockParams);
  //   await expect(promise).rejects.toThrowError(
  //     new BusinessError('Username already exists'),
  //   );
  // });

  // it('Should throw if findUserByUserName throws', async () => {
  //   const { usecase, repository } = makeSut();

  //   jest.spyOn(repository, 'findUserByUserName').mockImplementationOnce(() => {
  //     throw new Error();
  //   });

  //   const promise = usecase.execute(createUserMockParams);
  //   await expect(promise).rejects.toThrow();
  // });

  // it('Should call findUserByUserName with correct username', async () => {
  //   const { usecase, repository } = makeSut();
  //   const findByUserNameSpy = jest.spyOn(repository, 'findUserByUserName');
  //   await usecase.execute(createUserMockParams);
  //   expect(findByUserNameSpy).toHaveBeenCalledWith('Issac');
  // });

  // it('Should throw if hashService throws', async () => {
  //   const { usecase, hashService } = makeSut();

  //   jest.spyOn(hashService, 'generateHash').mockImplementationOnce(() => {
  //     throw new Error();
  //   });

  //   const promise = usecase.execute(createUserMockParams);
  //   await expect(promise).rejects.toThrow();
  // });

  // it('Should call hashService with correct password', async () => {
  //   const { usecase, hashService } = makeSut();
  //   const hashSpy = jest.spyOn(hashService, 'generateHash');
  //   await usecase.execute(createUserMockParams);
  //   expect(hashSpy).toHaveBeenCalledWith('password');
  // });

  // it('Should throw if codeTemporaryService throws', async () => {
  //   const { usecase, codeTemporaryService } = makeSut();

  //   jest
  //     .spyOn(codeTemporaryService, 'generateCode')
  //     .mockImplementationOnce(() => {
  //       throw new Error();
  //     });

  //   const promise = usecase.execute(createUserMockParams);
  //   await expect(promise).rejects.toThrow();
  // });

  // it('Should codeTemporaryService to have been called', async () => {
  //   const { usecase, codeTemporaryService } = makeSut();
  //   const codeTemporaryServiceSpy = jest.spyOn(
  //     codeTemporaryService,
  //     'generateCode',
  //   );
  //   await usecase.execute(createUserMockParams);
  //   expect(codeTemporaryServiceSpy).toHaveBeenCalled();
  // });

  // it('Should throw if createUser throws', async () => {
  //   const { usecase, repository } = makeSut();

  //   jest.spyOn(repository, 'createUser').mockImplementationOnce(() => {
  //     throw new Error();
  //   });

  //   const promise = usecase.execute(createUserMockParams);
  //   await expect(promise).rejects.toThrow();
  // });

  // it('Should call createUser with correct values', async () => {
  //   const { usecase, repository } = makeSut();
  //   const createUserRepoSpy = jest.spyOn(repository, 'createUser');

  //   jest.useFakeTimers().setSystemTime(new Date('2020-12-22T13:30:18.781Z'));

  //   await usecase.execute(createUserMockParams);

  //   expect(createUserRepoSpy).toHaveBeenCalledWith({
  //     email: 'issac@email.com',
  //     password: 'hashed_value',
  //     username: 'Issac',
  //     accountVerificationCode: '12345678',
  //     accountVerificationCodeExpiresAt: new Date('2020-12-22T13:33:18.781Z'),
  //   });
  // });

  // it('Should create new user with role STUDENT and RegistrationStep PENDING', async () => {
  //   const { usecase } = makeSut();

  //   const result = await usecase.execute(createUserMockParams);
  //   expect(result.user).toHaveProperty('registrationStep', 'PENDING');
  //   expect(result.user).toHaveProperty('roles', [
  //     {
  //       id: '1',
  //       type: RoleTypes.STUDENT,
  //       description: 'any_description',
  //     },
  //   ]);
  // });

  // it('Should throw if mailService throws', async () => {
  //   const { usecase, mailService } = makeSut();

  //   jest.spyOn(mailService, 'sendEmail').mockImplementationOnce(() => {
  //     throw new Error();
  //   });

  //   const promise = usecase.execute(createUserMockParams);
  //   await expect(promise).rejects.toThrow();
  // });

  // it('Should call mailService with correct values', async () => {
  //   const { usecase, mailService } = makeSut();
  //   const mailServiceSpy = jest.spyOn(mailService, 'sendEmail');

  //   await usecase.execute(createUserMockParams);

  //   expect(mailServiceSpy).toHaveBeenCalledWith({
  //     to: 'issac@email.com',
  //     subject: 'Confirm your account',
  //     body: {
  //       template: 'confirm-account',
  //     },
  //   });
  // });
});
