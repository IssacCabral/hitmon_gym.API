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

  it('Should call findEquipmentByName with correct name', async () => {
    const { usecase, equipmentRepository } = makeSut();

    jest
      .spyOn(equipmentRepository, 'findEquipmentByName')
      .mockResolvedValueOnce(null);

    const spy = jest.spyOn(equipmentRepository, 'findEquipmentByName');

    await usecase.execute(createEquipmentMockParams);

    expect(spy).toHaveBeenCalledWith('Leg Press');
  });

  it('Should throw a BusinessError if equipment category is not found by id', async () => {
    const { usecase, equipmentRepository, equipmentCategoryRepository } =
      makeSut();

    jest
      .spyOn(equipmentRepository, 'findEquipmentByName')
      .mockResolvedValueOnce(null);

    jest
      .spyOn(equipmentCategoryRepository, 'findEquipmentCategoryById')
      .mockResolvedValueOnce(null);

    const promise = usecase.execute(createEquipmentMockParams);
    await expect(promise).rejects.toThrowError(
      new BusinessError('EquipmentCategory is not found', 404),
    );
  });

  it('Should throw if findEquipmentCategoryById throws', async () => {
    const { usecase, equipmentRepository, equipmentCategoryRepository } =
      makeSut();

    jest
      .spyOn(equipmentRepository, 'findEquipmentByName')
      .mockResolvedValueOnce(null);

    jest
      .spyOn(equipmentCategoryRepository, 'findEquipmentCategoryById')
      .mockImplementationOnce(() => {
        throw new Error();
      });

    const promise = usecase.execute(createEquipmentMockParams);
    await expect(promise).rejects.toThrow();
  });

  it('Should call findEquipmentCategoryById with correct id', async () => {
    const { usecase, equipmentRepository, equipmentCategoryRepository } =
      makeSut();

    jest
      .spyOn(equipmentRepository, 'findEquipmentByName')
      .mockResolvedValueOnce(null);

    const spy = jest.spyOn(
      equipmentCategoryRepository,
      'findEquipmentCategoryById',
    );

    await usecase.execute(createEquipmentMockParams);

    expect(spy).toHaveBeenCalledWith('1');
  });

  it('Should throw if createEquipment throws', async () => {
    const { usecase, equipmentRepository } = makeSut();

    jest
      .spyOn(equipmentRepository, 'findEquipmentByName')
      .mockResolvedValueOnce(null);

    jest
      .spyOn(equipmentRepository, 'createEquipment')
      .mockImplementationOnce(() => {
        throw new Error();
      });

    const promise = usecase.execute(createEquipmentMockParams);
    await expect(promise).rejects.toThrow();
  });

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
