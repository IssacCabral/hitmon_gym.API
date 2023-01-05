import { IHash } from '@data/protocols/hash';

export const makeHashService = (): IHash => {
  class HashServiceStub implements IHash {
    generateHash(value: string): Promise<string> {
      return Promise.resolve('hashed_value');
    }
  }
  return new HashServiceStub();
};
